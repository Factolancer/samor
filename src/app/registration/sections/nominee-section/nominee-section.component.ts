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
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../../models/user";
import {UserService} from "../../userdata.service";
import {ValidationMessages} from "../../constants/validationmessages";
import {Heading} from "../../constants/headings";
import {ActivatedRoute} from "@angular/router";
import {Logger} from "../../../core/logger/logger";
import {LookUpService} from "../../../core/services/lookup.service";
import {KYCConstants} from "../../../constants/KYCGroup";
import {DateValidator} from "../../../validators/validator";

@Component({
    selector: 'nominee-section',
    templateUrl: './nominee-section.component.html',
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

export class NomineeSection implements OnInit {

    nomineeForm: FormGroup;
    user: User;
    usersubscription: Subscription;
    countries : any;
    states: any;
    addtypes: any;
    relations : any;
    nomineesaved = false;
    addresssaved = false;
    @Input() nomineecollapsed: boolean = true;
    @Output() makeVisible: EventEmitter<boolean>= new EventEmitter();
    @Input() state: string = 'show';
    nomineeInProcess: boolean = false;
    public heading = Heading;

    validationMessages = ValidationMessages;
    className : string;
    constructor(private fb: FormBuilder, public userService: UserService, public route: ActivatedRoute, private logger: Logger,
                public lookupService: LookUpService) {
        this.className = "NomineeSection";
    }

    ngOnInit() {
        this.lookupService.getByGroup("COUNTRY").subscribe(response => {
            this.countries = response
        });
        this.lookupService.getByGroup("STATE").subscribe(response => {
            this.states = response
        });
        this.lookupService.getByGroup("ADDRESSTYPE").subscribe(response => {
            this.addtypes = response
        });
        this.lookupService.getByGroup("RELATIONSHIP").subscribe(response => {
            this.relations = response
        });
        this.userService.getUserNomineeData();
        this.usersubscription =  this.userService.currentUser.subscribe(
            result => {
                this.logger.debug(this.className,result);
                this.user = result;
                this.buildform(this.user);
                this.nomineesaved = this.user.userNominee.ndtid.length > 0;
                if (this.nomineesaved){
                    this.nomineecollapsed = this.nomineesaved;
                    this.state = this.nomineecollapsed ? 'hide' : 'show'
                }
                this.addresssaved = this.user.userAddress.permanentAddress.amtid.length >0;
            }
        );
        this.buildform(this.user);
    }

    buildform(result): void{
        this.nomineeForm = this.fb.group({
            ndtid: [result.userNominee.ndtid || ''],
            nomineeName: [result.userNominee.nomineeName || '', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z .\\-\\/]+$')])],
            nomineeRelation: [result.userNominee.nomineeRelation || '', Validators.required],
            nomineeDob: [result.userNominee.nomineeDob || '', Validators.compose([Validators.required, DateValidator.isNomieeBorn, DateValidator.isInvestorTooOld])],
            nomineeAddress: this.fb.group({
                addressType: [result.userNominee.nomineeAddress.addressType || '', Validators.compose([Validators.required])],
                address1: [result.userNominee.nomineeAddress.address1 || '', Validators.compose([Validators.required, Validators.maxLength(40)])],
                address2: [result.userNominee.nomineeAddress.address2 || '', Validators.compose([Validators.maxLength(70)])],
                pin: [result.userNominee.nomineeAddress.pin || '', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}')])],
                city: [result.userNominee.nomineeAddress.city || '', Validators.compose([Validators.required])],
                district: [result.userNominee.nomineeAddress.district || '', Validators.compose([Validators.required])],
                state: [result.userNominee.nomineeAddress.state || '', Validators.compose([Validators.required])],
                country: [result.userNominee.nomineeAddress.country || KYCConstants.CND_COUNTRY_INDIA],
                landmark: [result.userNominee.nomineeAddress.landmark || ''],
                amtid: [result.userNominee.nomineeAddress.amtid || '']
            })
        });

        this.nomineeForm.statusChanges.subscribe(data => this.onValueChanged(data));
        // this.nomineeForm.controls['nomineeAddress'].valueChanges.subscribe(data => this.onAddressValueChanged(data));
        // this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.nomineeForm) {
            return;
        }
        const nomineeform = this.nomineeForm;
        const contactform = this.nomineeForm.controls['nomineeAddress']
        if (nomineeform.pristine) {
            return;
        }
        if (!nomineeform.dirty) {
            return;
        }
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = nomineeform.controls[field];
            this.logger.debug(this.className,control + typeof control);
            if (!control.valid && control.touched) {
                this.logger.debug(this.className,control.errors);
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }

        for (const field in this.formErrorsAddress) {
            // clear previous error message (if any)
            this.formErrorsAddress[field] = '';
            const control = contactform.get(field);
            if (!control.valid && control.touched) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrorsAddress[field] += messages[key] + ' ';
                }
            }
        }
    }

    onAddressValueChanged(data?: any) {
        if (!this.nomineeForm.controls['nomineeAddress']) {
            return;
        }
        const nomineeform = this.nomineeForm;
        if (nomineeform.pristine) {
            return;
        }
        if (!nomineeform.dirty) {
            return;
        }
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = nomineeform.controls[field];
            this.logger.debug(this.className,control + typeof control);
            if (!control.valid && control.touched) {
                this.logger.debug(this.className,control.errors);
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'nomineeName': '',
        'nomineeRelation': '',
        'nomineeDob': ''
    };
    formErrorsAddress = {
        'address1': '',
        'address2': '',
        'pin': '',
        'city': '',
        'district': '',
        'state': '',
        'country': '',
        'landmark': ''
    };

    copyAddress(checked: boolean) {
        this.userService.addressObservable.subscribe(address => {
            if (checked && address.amtid.length > 0){
                this.logger.debug(this.className, "OBS ", address);
                this.nomineeForm.controls['nomineeAddress'].get('addressType').setValue(address.addressType);
                this.nomineeForm.controls['nomineeAddress'].get('address1').setValue(address.address1);
                this.nomineeForm.controls['nomineeAddress'].get('address2').setValue(address.address2);
                this.nomineeForm.controls['nomineeAddress'].get('pin').setValue(address.pin);
                this.nomineeForm.controls['nomineeAddress'].get('city').setValue(address.city);
                this.nomineeForm.controls['nomineeAddress'].get('district').setValue(address.district);
                this.nomineeForm.controls['nomineeAddress'].get('state').setValue(address.state);
                this.nomineeForm.controls['nomineeAddress'].get('country').setValue(address.country);
                this.nomineeForm.controls['nomineeAddress'].get('landmark').setValue(address.landmark);
            }
        });
        /*if (checked && this.addresssaved){
            this.logger.debug(this.className, "Address is saved");
            this.logger.debug(this.className, this.userService.getAddressSubject());
            this.userService.addressObservable.subscribe(address => {
                this.logger.debug(this.className, "OBS ", address);
                this.nomineeForm.controls['nomineeAddress'].get('addressType').setValue(address.addressType);
                this.nomineeForm.controls['nomineeAddress'].get('address1').setValue(address.address1);
                this.nomineeForm.controls['nomineeAddress'].get('address2').setValue(address.address2);
                this.nomineeForm.controls['nomineeAddress'].get('pin').setValue(address.pin);
                this.nomineeForm.controls['nomineeAddress'].get('city').setValue(address.city);
                this.nomineeForm.controls['nomineeAddress'].get('district').setValue(address.district);
                this.nomineeForm.controls['nomineeAddress'].get('state').setValue(address.state);
                this.nomineeForm.controls['nomineeAddress'].get('country').setValue(address.country);
                this.nomineeForm.controls['nomineeAddress'].get('landmark').setValue(address.landmark);
            });

            // this.nomineeForm.controls['nomineeAddress'].get('amtid').setValue(this.userService.addressSubject.getValue().amtid);
        }*/
    }

    onNomineeSubmit() {
        this.nomineeInProcess = true;
        this.logger.debug(this.className,this.nomineeForm.value);
        this.userService.updateNomineeData(this.nomineeForm.value)
            .map(value => {
                this.nomineeInProcess = false;
                return value
            })
            .subscribe(result => {
                    this.logger.debug(this.className, result);
                    if (!result['ndtid'].isEmpty){
                        this.nomineeForm.controls['ndtid'].setValue(result['ndtid']);
                        this.user.userNominee.ndtid = result['ndtid'];
                        this.nomineesaved = true;
                        this.toggleNominee();
                        this.makeVisible.emit();
                        this.userService.setUserSubject(this.user);
                    }
                },
                err => {
                    this.logger.debug(this.className, err);
                    this.nomineesaved = false;
                }
            )
    }

    toggleNominee() {
        document.body.scrollTop = 0;
        if (this.nomineecollapsed == true) this.nomineecollapsed = false;
        else this.nomineecollapsed = true;

        this.state = (this.state === 'hide' ? 'show' : 'hide')
    }
}
