/**
 * Created by Fincash on 10-02-2017.
 */
import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/timer";
import {Subscription} from "rxjs/Subscription";
import {OTPService} from "../otp-service";

import {APP_CONFIG, IAppConfig} from "../../../environments/environment";

import {AadharValidator, EmailValidator, PANValidator} from "../../validators/validator";
import {LoginService} from "../../core/services/login.service";

import {ValidationMessages} from "../constants/validation-message";
import {Logger} from "../../core/logger/logger";
import {JwtHelper} from "angular2-jwt";
import {isNullOrUndefined} from "util";
import {UserLogin} from "../../models/userLogin";
import {TitleService} from "../../core/services/title.service";

@Component({
    selector: 'aadhar-kyc',
    templateUrl: './aadhar-kyc.component.html',
    styleUrls: ['./aadhar-kyc.component.scss']
})

export class AadharKYCComponent implements OnInit,OnDestroy {

    @ViewChild('finalform') finalform: ElementRef;
    aadharResloading: boolean;
    panExist:boolean;
    shake:boolean;
    userData: any;
    className: any;
    getUserDataSub: Subscription;
    shakeSub:Subscription;
    responseCode: string;
    errorMessage: string;

    validationMessages = ValidationMessages;

    AadharKYCStatusForm: FormGroup;
    userDetails: any;
    aadharLength: number = AadharValidator.maxLength;
    panLength: number = PANValidator.maxLength;
    mobLength: number = 10;

    eKYCUrl: string;
    kycReturnBaseUrl: string;
    eKYCAuthToken: string;

    ekyc_data: string;
    aadhaar: any;
    ekycReturnUrl: string;
    submitted: boolean;
    userObject : UserLogin;
    userObjectSub : Subscription;

    tktUpdateSub: Subscription;

    constructor(private route: ActivatedRoute, public router: Router, private _fb: FormBuilder, public logger: Logger,
                private otpService: OTPService, @Inject(APP_CONFIG) private config: IAppConfig, private loginservice: LoginService,
                public jwtHelper: JwtHelper, private loginService:LoginService, private titleService: TitleService) {
        this.className = "AadharKYCComponent";
        this.aadharResloading = false;
        this.panExist = false;
        this.userObject = this.loginService.getUserObject();
        this.shake = false;
    }

    formErrors = {
        'aadhar': '',
        'mob': '',
        'email': '',
        'pan': ''
    };

    ngOnInit() {
        this.titleService.setTitle('aadhaar_ekyc');
        this.titleService.setMetaTags('aadhaar_ekyc');

       this.userObjectSub =  this.loginService.userObservable.subscribe(userObject =>{
            this.userObject;
        });

        /*this.route.params.subscribe((params: Params) => {
            if (params.length>0){
                let aadharResponse = this.jwtHelper.decodeToken(JSON.stringify(params));
                this.responseCode = aadharResponse['responseCode'];
                this.errorMessage = CamsErrorCodes[this.responseCode];
            }
        });*/

        this.otpService.getUserData()
            .subscribe(
                res => {
                    this.logger.debug(this.className, res);
                    let mob = res['mob'] || "";
                    let pan = res['pan'] || "";
                    let email = res['email'] || "";
                    this.userDetails = this.userData;
                    this.AadharKYCStatusForm.controls['pan'].setValue(pan);
                    this.AadharKYCStatusForm.controls['mob'].setValue(mob);
                    this.AadharKYCStatusForm.controls['email'].setValue(email);
                    if(!isNullOrUndefined(pan) && pan.length>0){
                        this.panExist = true;
                    }
                },
                err => {
                    this.logger.debug(this.className, 'error fetching user details')
                }
            );
        this.buildForm();
        this.eKYCUrl = this.config.eKYCUrl;
        this.kycReturnBaseUrl = this.config.kycReturnBaseUrl;
        this.eKYCAuthToken = this.config.eKYCAuthToken + this.config.eKYCAMCS[Math.floor(Math.random()*this.config.eKYCAMCS.length)] + this.config.eKYCAuthTokenCode;
        this.logger.debug(this.className, this.eKYCAuthToken)
    }

    buildForm() : void{
        this.AadharKYCStatusForm = this._fb.group({
            aadhar: ['', Validators.compose([Validators.required, AadharValidator.isValidAadhaarFormat])],
            mob: [/*result.mob || */'', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
            email: [/*result.email || */'', Validators.compose([Validators.required, EmailValidator.isValidMailFormat])],
            pan: [/*result.pan || */'', Validators.compose([Validators.required, Validators.minLength(10), PANValidator.isValidPANFormat])],
        });
        this.AadharKYCStatusForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: any, nullSubmit: boolean = false) {
        if (!nullSubmit) {
            if (!this.AadharKYCStatusForm || this.AadharKYCStatusForm.pristine || !this.AadharKYCStatusForm.dirty) {
                return;
            }
        }
        const form = this.AadharKYCStatusForm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if ((control) && (control.touched || nullSubmit) && (!control.valid)) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] = messages[key] + ' ';
                }
            }
        }
    }

    validateKYC(isValid) {
        if (!isValid) {
            this.onValueChanged("", true);
        }
        this.shake = isValid?false:true;
        this.freezeShake();
        return isValid;
    }

    checkKYC() {
        this.submitted = true;
        this.aadharResloading = true;
        let userData = this.AadharKYCStatusForm.value;
        this.aadhaar = userData.aadhar;
        this.ekycReturnUrl = this.kycReturnBaseUrl + '/';
        this.ekyc_data = userData.pan.toUpperCase() + '|' + userData.email + '|' + userData.mob + '|' + this.eKYCAuthToken;
        this.ekycReturnUrl = this.ekycReturnUrl + this.userObject.userid + '/registration/kyc/response';
        this.tktUpdateSub = this.otpService.updateUserStageinTicket().subscribe(
                (res) => {
                    this.logger.debug(this.className + "- user stage headed-ekyc update status - >" + res['success'] );
                    Observable.timer(2000).subscribe( (t) => {
                        this.finalform.nativeElement.submit();
                    });
            },
                err => {
                    this.logger.debug(this.className, 'error updating user stage to ekyc-head state');
                }
            );
    }
    freezeShake() {
       this.shakeSub = Observable.timer(1000).subscribe( (tv) => {
            this.shake = false;
        });
    }
    ngOnDestroy() {
        this.userObjectSub.unsubscribe();
        if (this.getUserDataSub) {
            this.getUserDataSub.unsubscribe();
        }
        if ( this.shakeSub) {
            this.shakeSub.unsubscribe();
        }
        if (this.tktUpdateSub) {
            this.tktUpdateSub.unsubscribe();
        }
    }

}

