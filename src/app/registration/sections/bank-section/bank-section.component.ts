import {
    Component,
    OnInit,
    style,
    state,
    animate,
    transition,
    trigger,
    Input,
    Output,
    EventEmitter
} from "@angular/core";
import {FormGroup, Validators, FormBuilder, AbstractControl, FormControl} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {User} from "../../../models/user";
import {UserService} from "../../userdata.service";
import {Bank} from "../../../models/bank";
import {Heading} from "../../constants/headings";
import {ActivatedRoute} from "@angular/router";
import {LookUpService} from "../../../core/services/lookup.service";
import {Logger} from "../../../core/logger/logger";
import {isNullOrUndefined} from "util";
import {ValidationMessages} from "../../constants/validationmessages";
import {BSEService} from "../../../core/services/bse.service";

function accountNumberValidator(c: AbstractControl) {
    return c.get('confirmAccountNumber').value === c.get('accountNumber').value
        ? null : {'mismatch': true};
}


@Component({
    selector: 'bank-section',
    templateUrl: './bank-section.component.html',
    styleUrls: ['../../registration.styles.scss'],
    animations: [
        trigger('ShowHide', [
            state('show', style({opacity: '1', height: '*', display: 'block'})),
            state('hide', style({opacity: '0', height: '0px', display: 'none'})),
            transition('show <=> hide', [
                animate('500ms ease-in-out')
            ])
        ])
    ]
})
export class BankSectionComponent implements OnInit {
    bankForm: FormGroup;
    account: FormGroup;
    bankControl: FormControl;
    acnumber: string;
    public banks: any;
    public bank: Bank;
    public bankList: Bank[];
    user: User;
    accountType: any
    public heading = Heading;

    bankSuggestionSubject: BehaviorSubject<any[]>;
    bankSuggestions: Observable<any[]>;
    private searchTermStream = new Subject<string>();
    queryString: string = "";
    searchInputSubscription: Subscription;

    bankRegistered: boolean;
    bankInProcess: boolean = false;
    @Input() state: string = 'hide';
    banksaved = false;
    @Input() bankcollapsed = true;
    showbanklist = false;
    @Output() makeVisible: EventEmitter<boolean> = new EventEmitter();

    validationMessages = ValidationMessages;
    usersubscription: Subscription;
    resultsubscription: Subscription;

    className: string;

    constructor(private fb: FormBuilder, public userService: UserService, public lookupService: LookUpService,
                private logger: Logger, public bseService: BSEService) {
        this.bankControl = new FormControl(Validators.required);
        this.className = "BankSection";
        this.bankRegistered = false;

        /*this.bankSuggestionSubject = new BehaviorSubject([{
         bmtrfnum: '',
         bmtbankname: '',
         bbtrfnum: '',
         bbtbranchname: '',
         bbtifsccode: ''
         }]);
         this.bankSuggestions = this.bankSuggestionSubject.asObservable();*/
    }

    getAutoSuggestion() {
        this.bankSuggestionSubject.getValue();
    }

    setAutoSuggestion(array: any[]) {
        this.bankSuggestionSubject.next(array);
    }

    ngOnInit() {
        this.lookupService.getByGroup("ACCOUNTTYPE").subscribe(response => {
            this.accountType = response
        });
        this.bankSuggestions = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((term: string) => this.userService.getBankAutoCompleteData(term).map(res => {
                this.logger.debug(this.className, res);
                // this.logger.debug(this.className, this.queryString)
                return res; //this.setAutoSuggestion(res);
            }));
        this.userService.getUserBankData();
        this.usersubscription = this.userService.currentUser.subscribe(
            result => {
                this.logger.debug(this.className, result);
                this.user = result;
                this.buildform(this.user);
                this.banksaved = this.user.userBank.buaid.length > 0;
                if (this.banksaved) {
                    this.bankcollapsed = this.banksaved;
                    this.state = this.bankcollapsed ? 'hide' : 'show'
                }
            });
        // If bank is registered in BSE, disable editing it
        this.bseService.isBseRegDone().subscribe(res => {
            this.bankRegistered = res;
        });
        this.buildform(this.user);
    }

    buildform(result): void {
        this.bankForm = this.fb.group({
            buaid: [result.userBank.buaid || ''],
            holderName: [result.userBank.holderName || '', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z .\\-]+$')])],
            bank: this.fb.group({
                bankName: [result.userBank.bank.bankName || ''/*, Validators.compose([Validators.required])*/],
                IFSC: [result.userBank.bank.IFSC || ''/*, Validators.compose([Validators.required, Validators.pattern('[0-9a-zA-Z]{11}')])*/],
                city: [result.userBank.bank.city || ''],
                branch: [result.userBank.bank.branch || '']
            }),
            accountType: [result.userBank.accountType || '', Validators.compose([Validators.required])],
            account: this.fb.group({
                accountNumber: [result.userBank.accountNumber || '', Validators.compose([Validators.required])],
                confirmAccountNumber: [result.userBank.accountNumber || '', Validators.compose([])]
            }, {validator: Validators.compose([accountNumberValidator])})
        });
        this.bankControl.setValue({
            'bmtbankname': result.userBank.bank.bankName,
            'bbtbranchname': result.userBank.bank.branch,
            'bbtifsccode': result.userBank.bank.IFSC,
            'bmtrfnum': '',
            'bbtrfnum': ''
        });
        // this.bankControl.disable(this.bankRegistered);
        this.logger.debug(this.bankControl.get('bmtbankname'));
        this.bankForm.statusChanges.subscribe(data => this.onValueChanged(data));
        // this.bankControl.valueChanges.subscribe(v => this.logger.debug(this.bankControl.value))
        //this.bankForm.controls['bank'].valueChanges.subscribe(data => this.onBranchValueChanged(data));
        // this.bankForm.controls['account'].valueChanges.subscribe(data => this.onAccountValueChanged(data));
    }

    onValueChanged(data?: any) {
        if (!this.bankForm) {
            return;
        }
        const bankForm = this.bankForm;
        const branchform = this.bankForm.controls['bank'];
        const accountform = this.bankForm.controls['account'];
        if (bankForm.pristine) {
            return;
        }
        if (!bankForm.dirty) {
            return;
        }
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = bankForm.controls[field];
            this.logger.debug(this.className, control + typeof control);
            if (!control.valid && control.touched) {
                this.logger.debug(this.className, control.errors);
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }

        for (const field in this.formErrorsAccount) {
            // clear previous error message (if any)
            this.formErrorsAccount[field] = '';
            const control = accountform.get(field);
            if (!control.valid && control.touched) {
                this.logger.debug(this.className, control.errors);
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrorsAccount[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'holderName': '',
        'accountType': '',
        'account': ''
    };
    formErrorsAccount = {
        'accountNumber': '',
        'confirmAccountNumber': ''
    };

    onBankSubmit() {
        this.bankInProcess = true;
        let accountNumber = this.bankForm.controls['account'].get('accountNumber').value;
        this.bankForm.controls['bank'].get('bankName').setValue(this.bankControl.value.bmtrfnum);
        this.bankForm.controls['bank'].get('IFSC').setValue(this.bankControl.value.bbtifsccode);
        this.bankForm.controls['bank'].get('branch').setValue(this.bankControl.value.bbtrfnum);
        this.logger.debug(this.className, this.bankForm.value);

        this.userService.updateBankData(this.bankForm.value, accountNumber)
            .map(value => {
                this.bankInProcess = false;
                return value
            })
            .subscribe(result => {
                    this.logger.debug(this.className, result);
                    if (!result['buaid'].isEmpty) {
                        this.bankForm.controls['buaid'].setValue(result['buaid']);
                        this.user.userBank.buaid = result['buaid'];
                        this.banksaved = true;
                        this.toggleBank();
                        this.makeVisible.emit();
                        this.userService.setUserSubject(this.user);
                    }
                },
                err => {
                    this.logger.debug(this.className, err);
                    this.banksaved = false;
                }
            );
    }

    toggleBank() {
        if (this.bankcollapsed == true) this.bankcollapsed = false;
        else this.bankcollapsed = true;

        this.state = (this.state === 'hide' ? 'show' : 'hide')
    }

    searchBarInput() {
        /*if (this.queryString.indexOf("-")>0){
         this.logger.debug(this.className, this.queryString)
         let array = this.queryString.split("-")
         this.searchTermStream.next(array[array.length-1].trim());
         }
         else*/
        this.searchTermStream.next(this.queryString);
    }

    selectBank(event: any) {
        this.logger.debug(this.className, event);

        if (event.keyCode == 13 || event.keyCode == 9 || event.type == "click" || event.type == "change") {
            this.logger.debug(this.className, "Bank selected", this.bankForm.controls['bankControl'].value);
            this.logger.debug(this.className, "Bank selected", this.bankForm.controls['bankControl']);
            this.bankForm.controls['bank'].get('bankName').setValue(this.bankForm.controls['bankControl'].value.bmtrfnum);
            this.bankForm.controls['bank'].get('IFSC').setValue(this.bankForm.controls['bankControl'].value.bbtifsccode);
            this.bankForm.controls['bank'].get('branch').setValue(this.bankForm.controls['bankControl'].value.bbtrfnum);
            this.logger.debug(this.bankForm.controls['bankControl'].value.bbtrfnum);
        }
    }

    displayAutoSuggestion(suggestion: any): string {
        if (!isNullOrUndefined(suggestion)) {
            return suggestion.bmtbankname + ' - ' + suggestion.bbtbranchname + ' - ' + suggestion.bbtifsccode;
        } else {
            return '';
        }

    }
}
