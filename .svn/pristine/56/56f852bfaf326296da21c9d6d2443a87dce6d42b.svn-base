import {Component, Inject, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JwtHelper} from 'angular2-jwt';
import {isNullOrUndefined} from 'util';

import {PANValidator} from '../validators/validator';
import {ExistingPANValidator} from '../validators/asyncValidator';
import {HttpService} from '../core/services/http-service.service';
import {OTPService} from './otp-service';

import {Logger} from '../core/logger/logger';
import {KYCGroup} from '../constants/KYCGroup';
import {APP_CONFIG, IAppConfig} from '../../environments/environment';
import {SnackBarService} from '../core/services/snack-bar.service';
import {ConfirmationDialogComponent} from '../shared/confirmation-dialog.component';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {TitleService} from '../core/services/title.service';
import {CamsErrorCodes} from '../constants/CAMS-errorcodes';
import {HeaderService} from '../core/services/header.service';

@Component({
    selector: 'kyc-status',
    templateUrl: './kyc-status.component.html',
    styleUrls: ['./kyc-status.component.scss']
})

export class CheckKYCComponent implements OnInit, OnDestroy {

    className: string;

    routeSubscription: Subscription;
    getUserDataSub: Subscription;
    onSendOTPSub: Subscription;
    getOTPDeliveryStatusSub: Subscription;
    checkPANSub: Subscription;
    panUpdateSub: Subscription;
    regMobileSub: Subscription;
    otpValidateSub: Subscription;
    otptimer: Subscription;

    KYCStatusForm: FormGroup;
    PhoneValidationForm: FormGroup;
    OTPValidationForm: FormGroup;

    kycStatusCode: string;
    kycCompliant: boolean;
    kycNonCompliant: boolean;
    kycMissing: boolean = false;
    panGiven: boolean = false;
    pan: string;

    countryCode: string = '+91';
    mobLength: number = 10;
    PANLength: number = PANValidator.maxLength;
    otpLength: number = 6;

    userData: any;
    ticks: number;
    otpNextGapDuration: number = 15000;
    OTPResloading: boolean = false;

    otpErrorMessage: string;
    otpInvalid: boolean = false;
    otpVerified: boolean = false;
    otpSent: boolean = false;
    resendBtnState: boolean = false;
    panResloading: boolean = false;
    registredMobileData: any = {};
    registeredPanData: any = {};
    encodedekycRes: string;
    mob: any;
    resolved: boolean = false;
    messageStatus: string;

    phoneFormSubmitted: boolean;
    panFormSubmitted: boolean;

    constructor(public router: Router, public http: HttpService, public route: ActivatedRoute, @Inject(APP_CONFIG) private config: IAppConfig,
                private _fb: FormBuilder, private otpService: OTPService, private jwtHelper: JwtHelper, private  logger: Logger,
                public viewContainerRef: ViewContainerRef, public snackBarService: SnackBarService, public dialog: MdDialog, public titleService: TitleService, private headerService: HeaderService) {

        this.className = 'CheckKYCComponent';
        this.messageStatus = '';

        this.routeSubscription = this.route.params.subscribe((params: Params) => {
            this.logger.debug(this.className, params);
            if (!isNullOrUndefined(params['encodedId'])) {
                this.encodedekycRes = params['encodedId'];
                this.logger.debug(this.className, this.encodedekycRes);
                let responseObject = this.jwtHelper.decodeToken(this.encodedekycRes);
                this.logger.debug(this.className, responseObject);

                if (!isNullOrUndefined(responseObject) && !isNullOrUndefined(responseObject.success)) {
                    let eKYCStatus: boolean = responseObject.success;
                    if (eKYCStatus) {
                        this.router.navigate(['/registration']);
                    }
                }
            }
        });
    }

    ngOnInit() {
        this.titleService.setTitle("kyc");
        this.titleService.setMetaTags("kyc");
        this.getUserData();
        this.headerService.onDemandProgressBar();

        this.PhoneValidationForm = this._fb.group({
            mob: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]{10}$')])]
        });
        this.KYCStatusForm = this._fb.group({
            pan: ['', Validators.compose([Validators.required, Validators.minLength(10), PANValidator.isValidPANFormat]),
                Validators.composeAsync([ExistingPANValidator.validatePANExistance(this.http)])]
        });
        this.OTPValidationForm = this._fb.group({
            otp: ['', Validators.compose([Validators.required])]
        });
    }

    getUserData() {
        this.getUserDataSub = this.otpService.getUserData()
            .subscribe(
                res => {
                    let mob = res.mob || "";
                    let pan = res.pan || "";
                    this.resolved = true;
                    this.logger.debug(this.className, res);
                    this.registredMobileData.mob = mob;
                    this.registeredPanData.pan = pan;
                    if (this.registeredPanData.pan) {
                        this.checkPANbasedKYC(this.registeredPanData.pan);
                    }
                    if (pan.length > 0 && mob.length > 0) {
                        this.router.navigate([this.config.userBasicGuard.navigate])
                    }
                },
                err => {
                    this.logger.debug(this.className, 'error fetching user details')
                }
            )
    }

    goTo(link) {
        this.router.navigate([link]);
    }

    validatePhoneForm(isValid) {
        this.phoneFormSubmitted = true;
        return isValid;
    }

    onSendOTP() {
        this.openMobileConfirmationDialog(this.PhoneValidationForm.controls['mob'].value).subscribe(value => {
            if (value) {
                this.OTPResloading = true;
                this.userData = this.PhoneValidationForm.value;
                let phone = this.countryCode + this.userData.mob;
                let body = "Your OTP for Fincash verification is valid for 30 minutes, please don't share. OTP: ******";
                this.onSendOTPSub = this.otpService.sendOTP(phone, body).subscribe(
                    res => {
                        this.logger.debug(this.className, res);
                        if (!isNullOrUndefined(res) && !isNullOrUndefined(res.messageId))
                            this.otpSent = true;
                        this.OTPResloading = false;
                        this.getOTPDeliveryStatusSub = Observable.interval(3000).take(10).flatMap((t) => {
                            if ((t + 1) == 10) {
                                this.resendBtnState = true;
                            }
                            return this.otpService.otpDeliveryStatus(res.messageId);
                        }).subscribe(responseVal => {
                            this.logger.debug(this.className, responseVal);
                            if (!isNullOrUndefined(responseVal) && !isNullOrUndefined(responseVal.status)) {
                                this.messageStatus = responseVal.status;
                                if (this.getOTPDeliveryStatusSub && responseVal.status == 'delivered') {
                                    this.getOTPDeliveryStatusSub.unsubscribe();
                                    this.resendBtnState = true;
                                    if (this.otptimer) {
                                        this.otptimer.unsubscribe();
                                    }
                                    this.ticks = 0;
                                }
                            }
                        });
                    },
                    err => {
                        this.logger.debug(this.className, 'an error occured');
                        this.resendOTP();
                    }
                )
            } else {
                this.otpSent = false;
            }
        });
    }

    resendOTP() {
        this.messageStatus = '';
        this.otptimer = Observable.timer(0, 1000).subscribe(t => {
            this.ticks = this.otpNextGapDuration / 1000 - t;
            if (this.ticks <= 0) {
                this.otptimer.unsubscribe();
            }
        });
        this.onSendOTP();
        this.resendBtnState = false;
        let timer = Observable.timer(this.otpNextGapDuration);
        timer.subscribe(t => this.resendBtnState = true);
    }

    onValidateOTP() {
        this.userData = this.OTPValidationForm.value;
        this.mob = this.PhoneValidationForm.controls['mob'].value;
        let otp = this.userData.otp;
        this.otpValidateSub = this.otpService.validateOTP(otp).subscribe(
            res => {
                if (!isNullOrUndefined(res)) {
                    let otpValidity = res;
                    this.logger.debug(this.className, 'otp validity' + otpValidity + 'mob num' + this.mob);
                    if (otpValidity) {
                        //this.registerMobile(this.mob);
                        this.otpVerified = true;
                    } else {
                        this.otpInvalid = true;
                        this.otpErrorMessage = "Invalid OTP!"
                    }
                } else {
                    this.otpInvalid = true;
                    this.otpErrorMessage = "Invalid OTP!"
                }
            },
            err => {
                this.logger.debug(this.className, 'OTP Validation error');
            }
        )
    }

    validatePANKYC(isValid) {
        this.panFormSubmitted = true;
        return isValid;
    }

    checkPanObservable(pan: string) {
        let panObj = {};
        panObj["pan"] = pan;
        return this.http.securePost('/user/panUpdate', panObj).map(res => {
            if (res['success'] && res['success'] === true) {
                return {"isValid": true};
            }
            return {"isValid": false};
        })
    }

    checkPAN(event) {
        this.openPANConfirmationDialog(this.KYCStatusForm.controls['pan'].value).subscribe(value => {
            if (value) {
                this.userData = this.KYCStatusForm.value;
                let pan = this.userData.pan.trim() || "";
                pan = pan.toUpperCase();
                this.panResloading = true;
                this.checkPANbasedKYC(pan);
            }
        })
    }

    checkPANbasedKYC(pan) {
        this.checkPANSub = this.http.securePost('/user/checkKYC', {"pan": pan}, 60000, 1).subscribe(response => {
                this.registeredPanData.pan = pan;
                this.panResloading = false;
                this.logger.debug(this.className, response);
                this.kycStatusCode = response['statusCode'].toLowerCase();
                this.panGiven = true;
                if (this.kycStatusCode == "KS100".toLowerCase()) {
                    this.kycCompliant = true;
                    this.http.securePost('/user/updateKycStatus', {
                        "kycStatus": KYCGroup.KYC_Done,
                        "kycType": KYCGroup.KYCTYPE_PAN
                    }).subscribe(res => {
                            this.logger.debug(this.className, "KYC status updated" + res);
                        },
                        error => {
                            this.logger.debug(this.className, "KYC status update failed" + error.error);
                        }
                    );
                    this.panUpdateSub = this.checkPanObservable(pan).subscribe(
                        success => {
                            if (success['isValid']) {
                                this.logger.debug(this.className, "pan updated with these details", success);

                            }
                            else {
                                this.KYCStatusForm.controls['pan'].setValue("")
                            }
                        },
                        err => {
                            this.logger.debug(this.className, "Error occurred in pan update" + err.error);
                            this.KYCStatusForm.controls['pan'].setValue("")
                        });
                }
                else if (this.kycStatusCode == "KS102".toLowerCase()) {
                    this.snackBarService.showSnackBar(CamsErrorCodes.KS102, "Okay", this.viewContainerRef)
                    this.http.securePost('/user/updateKycStatus', {
                        "kycStatus": KYCGroup.KYC_UNDERPROCESS,
                        "kycType": KYCGroup.KYCTYPE_PAN
                    }).subscribe(res => {
                            this.logger.debug(this.className, "KYC status updated" + res)
                        },
                        error => {
                            this.logger.debug(this.className, "KYC status update failed" + error.error);
                        }
                    );
                    this.panUpdateSub = this.checkPanObservable(pan).subscribe(
                        success => {
                            if (success['isValid']) {
                                this.logger.debug(this.className, "pan updated with these details", success);

                            }
                            else {
                                this.KYCStatusForm.controls['pan'].setValue("")
                            }
                        },
                        err => {
                            this.logger.debug(this.className, "Error occurred in pan update" + err.error);
                            this.KYCStatusForm.controls['pan'].setValue("")
                        });
                }
                else if (this.kycStatusCode == "KS999".toLowerCase()) {
                    this.handleCamsHttpError(pan)
                }
                else if (this.kycStatusCode == "KS101".toLowerCase()) {
                    this.kycNonCompliant = true;
                    this.panUpdateSub = this.checkPanObservable(pan).subscribe(
                        success => {
                            if (success['isValid']) {
                                this.logger.debug(this.className, "pan updated with these details", success);

                            }
                            else {
                                this.KYCStatusForm.controls['pan'].setValue("")
                            }
                        },
                        err => {
                            this.logger.debug(this.className, "Error occurred in pan update" + err.error);
                            this.KYCStatusForm.controls['pan'].setValue("")
                        });
                }
                else {
                    this.snackBarService.showIndefiniteSnackBar("Unknown error, please try after some time", "Okay", this.viewContainerRef)
                }
            },
            error => {
                this.panResloading = false;
                this.handleCamsHttpError(pan);
                this.logger.debug(this.className, "Error occurred in KYC status checking " + error.error);
            }
        )
    }

    handleCamsHttpError(pan: string) {
        this.http.securePost('/user/kycStatusError', {"pan": pan}).subscribe(result => {
            this.logger.debug(result);
            this.panUpdateSub = this.checkPanObservable(pan).subscribe(res => {
                if (res['isValid']) {
                    this.logger.debug(this.className, "pan updated with these details", res);
                    this.kycMissing = true;
                }
                else {
                    this.KYCStatusForm.controls['pan'].setValue("")
                }
            })
        })
    }

    proceed() {
        this.router.navigateByUrl('registration');
    }

    updateKycAndProceed() {
        this.http.securePost('/user/updateKycStatus', {
            "kycStatus": KYCGroup.KYC_Done,
            "kycType": KYCGroup.KYCTYPE_PAN
        }).subscribe(res => {
            this.proceed();
        })
    }

    goForAdhaarKyc() {
        this.kycMissing = false;
        this.kycNonCompliant = true;
    }

    openPANConfirmationDialog(pan: string) {
        return this.openDialog("Confirm PAN", "Are you sure '" + pan.toUpperCase() + "' is your correct PAN? PAN once submitted cannot be changed!", [['Y', 'Yes', 'hollow-cta-36'], ['N', 'No', 'hollow-cta-36']], true)
    }

    openMobileConfirmationDialog(mob: string) {
        return this.openDialog("Confirm Mobile Number", "Are you sure the given mobile number '" + mob + "' is correct? OTP will be sent to this number", [['Y', 'Yes', 'hollow-cta-36'], ['N', 'No', 'hollow-cta-36']], true)
    }

    openDialog(title?: string, message?: string, confirmActions?: string[][], closable?: boolean) {
        let config = new MdDialogConfig();
        let device = this.headerService.deviceType();
        if (device === 'xs' || device === 'sm') {
            config.width = '100%';
        } else {
            config.width = '30vw';
        }
        config.disableClose = closable;
        config.viewContainerRef = this.viewContainerRef;

        let confirmationConfig = {
            confirmationTitle: title,
            confirmationText: message,
            confirmationActions: confirmActions
        };
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
        dialogRef.componentInstance.config = confirmationConfig;
        return dialogRef.afterClosed().map((result) => {
            if (result[0] === 'Y') {
                return true;
            } else {
                return false;
            }
        });

    }

    ngOnDestroy() {

        this.routeSubscription.unsubscribe();

        if (this.otptimer) {
            this.otptimer.unsubscribe();
        }
        if (this.getUserDataSub) {
            this.getUserDataSub.unsubscribe();
        }
        if (this.onSendOTPSub) {
            this.onSendOTPSub.unsubscribe();
        }
        if (this.getOTPDeliveryStatusSub) {
            this.getOTPDeliveryStatusSub.unsubscribe();
        }
        if (this.checkPANSub) {
            this.checkPANSub.unsubscribe();
        }
        if (this.panUpdateSub) {
            this.panUpdateSub.unsubscribe();
        }
        if (this.regMobileSub) {
            this.regMobileSub.unsubscribe();
        }
        if (this.otpValidateSub) {
            this.otpValidateSub.unsubscribe();
        }
    }
}
