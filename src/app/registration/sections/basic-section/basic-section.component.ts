import {
    animate,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    state,
    style,
    transition,
    trigger,
    ViewContainerRef
} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {DateValidator, EmailValidator, PANValidator} from "../../../validators/validator";
import {User} from "../../../models/user";
import {UserService} from "../../userdata.service";
import {ValidationMessages} from "../../constants/validationmessages";
import {Heading} from "../../constants/headings";
import {ActivatedRoute, Router} from "@angular/router";
import {Logger} from "../../../core/logger/logger";
import {SnackBarService} from "../../../core/services/snack-bar.service";
import {DateAdapter, MdDialog} from "@angular/material";


@Component({
    selector: 'basic-section',
    templateUrl: './basic-section.component.html',
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

export class BasicSection implements OnInit, OnDestroy{

    basicForm: FormGroup;
    user: User;
    usersubscription: Subscription;
    loadingDialogRef: any;

    basicInProcess: boolean = false;
    basicsaved = false;
    basiccollapsed = false;
    @Output() makeVisible: EventEmitter<boolean>= new EventEmitter();
    state: string = 'show';
    panExists: boolean = false;
    mobExists: boolean = false;

    public heading = Heading;
    validationMessages = ValidationMessages;
    className : string;
    constructor(private fb: FormBuilder, public userService: UserService, public route: ActivatedRoute, private logger: Logger, public router: Router,
                public snackBarService: SnackBarService, public viewContainerRef: ViewContainerRef, public dialog: MdDialog, private dateAdapter: DateAdapter<Date>) {
        this.className = "BasicSection";
        this.dateAdapter.setLocale('en-IN');
    }

    ngOnInit() {
        this.userService.getUserBasicData();
        this.usersubscription =  this.userService.currentUser.subscribe(
            result => {
                this.logger.debug(this.className,result);
                this.user = result;
                this.logger.debug(this.className, result.userBasic.pan, result.userBasic.contact.mob);
                this.buildform(this.user);
                this.panExists = (this.user.userBasic.pan.length == 10);
                this.mobExists = (this.user.userBasic.contact.mob.length > 0);
                this.basicsaved = this.user.userBasic.panName.length>0 && this.user.userBasic.dob.length>0 &&
                    this.user.userBasic.maritalStatus.length>0 && this.user.userBasic.fatherName.length>0 && this.user.userBasic.motherName.length>0;
                if (this.basicsaved) {
                    this.basiccollapsed = this.basicsaved;
                    this.state = this.basiccollapsed ? 'hide' : 'show'
                }
            }
        );
        this.buildform(this.user);
    }

    buildform(result): void{
        this.basicForm = this.fb.group({
            pan: [result.userBasic.pan || '', Validators.compose([Validators.required, PANValidator.isValidPANFormat])],
            panName: [result.userBasic.panName || '', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z .\\-\\/]+$')])],
            contact: this.fb.group({
                mob: [ result.userBasic.contact.mob || '', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
                email: [result.userBasic.contact.email || '', Validators.compose([Validators.required, EmailValidator.isValidMailFormat])],
                tel: [result.userBasic.contact.tel || '', Validators.compose([Validators.pattern('^[0-9]{10}$')])],
                fax: [result.userBasic.contact.fax || '', Validators.compose([Validators.pattern('^[0-9]{10}$')])]
            }),
            dob: [result.userBasic.dob || '', Validators.compose([Validators.required, DateValidator.isInvestorAdult, DateValidator.isInvestorTooOld])],
            gender: [result.userBasic.gender || '', [Validators.required]],
            maritalStatus: [result.userBasic.maritalStatus || '', Validators.required],
            fatherName: [result.userBasic.fatherName || '', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z .\\-\\/]+$')])],
            motherName: [result.userBasic.motherName || '', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z .\\-\\/]+$')])],
        });

        this.basicForm.statusChanges.subscribe(data => this.onValueChanged(data));

        const basicform = this.basicForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = basicform.controls[field];
            this.logger.debug(this.className,control + typeof control);
            if (!control.valid && control.touched) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
    }

    onValueChanged(data?: any) {
        if (!this.basicForm) {
            return;
        }
        const basicform = this.basicForm;
        const contactform = this.basicForm.controls['contact']
        if (basicform.pristine) {
            return;
        }
        if (!basicform.dirty) {
            return;
        }
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = basicform.controls[field];
            this.logger.debug(this.className,control + typeof control);
            if (!control.valid && control.touched) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }

        for (const field in this.formErrorsContact) {
            // clear previous error message (if any)
            this.formErrorsContact[field] = '';
            const control = contactform.get(field);
            if (!control.valid && control.touched) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrorsContact[field] += messages[key] + ' ';
                }
            }
        }
    }

    // onContactValueChanged(data?: any) {
    //     if (!this.basicForm.controls['contact']) {
    //         return;
    //     }
    //     const basicform = this.basicForm;
    //     if (basicform.pristine) {
    //         return;
    //     }
    //     if (!basicform.dirty) {
    //         return;
    //     }
    //     for (const field in this.formErrors) {
    //         // clear previous error message (if any)
    //         this.formErrors[field] = '';
    //         const control = basicform.controls[field];
    //         console.log(control + typeof control);
    //         if (!control.valid && control.touched) {
    //             console.log(control.errors);
    //             const messages = this.validationMessages[field];
    //             for (const key in control.errors) {
    //                 this.formErrors[field] += messages[key] + ' ';
    //             }
    //         }
    //     }
    // }

    formErrors = {
        'pan': '',
        'panName': '',
        'dob': '',
        'gender': '',
        "maritalStatus": '',
        "fatherName": '',
        "motherName": ''
    };
    formErrorsContact = {
        'email': '',
        'mob': '',
        'tel': '',
        'fax': ''
    };

    onBasicSubmit() {
        this.basicInProcess = true;
        let array = this.basicForm.controls['panName'].value.split(" ");
        let firstName = '';
        let middleName = '';
        let lastName = '';
        for (let indexS in array){
            let index = parseInt(indexS);
            if (index == 0){
                firstName = array[index]
            }
            if (index == 1 && (array.length-1) == index){
                lastName = array[index];
            }else if (index == 1){
                middleName = array[index];
            }
            if (index >= 2){
                lastName += array[index];
                lastName +=' ';
            }
        }
        this.logger.debug(this.className, { first : firstName, mid : middleName , last : lastName});
        this.logger.debug(this.className,this.basicForm.value);
        this.userService.updateBasicData(this.basicForm.value, firstName, middleName, lastName.trim())
            .map(value => {
                this.basicInProcess = false;
                return value
            })
            .subscribe(result => {
                this.logger.debug(this.className, result);
                if (result['success']){
                    this.basicsaved = true;
                    this.toggleBasic();
                    this.makeVisible.emit();
                }
                else {
                    this.snackBarService.showSnackBar(result['message'], "Okay", this.viewContainerRef)
                }
            },
                err => {
                this.logger.debug(this.className, err);
                this.basicsaved = false;
                }
            );
    }

    toggleBasic() {
        if (this.basiccollapsed == true) this.basiccollapsed = false;
        else this.basiccollapsed = true;

        this.state = (this.state === 'hide' ? 'show' : 'hide')
    }

    ngOnDestroy(){
        this.usersubscription.unsubscribe();
    }

}
