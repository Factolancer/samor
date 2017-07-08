import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {OTPService} from "../kyc-status/otp-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {Logger} from "../core/logger/logger";
import {MdDialog, MdDialogRef} from "@angular/material";
import {UtilityService} from "../core/services/utility.service";
import {SnackBarService} from "../core/services/snack-bar.service";

@Component({
    selector: 'app-redemption-confirmation',
    templateUrl: './redemption-confirmation.component.html',
    styleUrls: ['./redemption.styles.scss'],
})
export class RedemptionConfirmationComponent implements OnInit {


    OTPValidationForm: FormGroup;
    otpValidateSub: Subscription;
    otpErrorMessage: string;
    otpInvalid: boolean;
    otpVerified: boolean;
    otpSent: boolean;
    resendBtnState: boolean;
    otpLength: number;
    OTPResloading: boolean;
    getOTPDeliveryStatusSub: Subscription;
    messageStatus: string;
    otptimer: Subscription;
    ticks: number;
    otpNextGapDuration: number = 15000;
    orderId: number;
    otpAlertMessage:string;
    redemptionOtpMessage: string = "****** is your OTP for redemption request of Order Id {orderId}. Your OTP is confidential, kindly do not share it with anyone. It is valid for {minutes} minutes."

    constructor(private otpService: OTPService, private logger: Logger, private snackBarService: SnackBarService, private viewContainerRef: ViewContainerRef,
                private _fb: FormBuilder, private dialog: MdDialog,
                private utilityService:UtilityService) {

        this.otpInvalid = false;
        this.otpVerified = false;
        this.otpSent = false;
        this.resendBtnState = false;
        this.otpLength = 6;
    }

    ngOnInit() {
        let redemptionOtpDetails = this.otpService.redemptionOtpDetailsSubject.getValue();
        let mobNo = redemptionOtpDetails.mobileNo;
        this.otpAlertMessage = this.utilityService.parseString("Enter the OTP received in your Mobile Phone ({mobileNo}) to complete the Transaction.",{mobileNo:mobNo});
        this.onSendOTP();

        this.OTPValidationForm = this._fb.group({
            otp: ['', Validators.compose([Validators.required])]
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
        let otp = this.OTPValidationForm.value.otp;
        this.otpValidateSub = this.otpService.validateOrderOTP(otp, this.orderId).debounceTime(2000).subscribe(
            res => {
                if (!isNullOrUndefined(res)) {
                    let otpValidity = res;
                    if (otpValidity) {
                        this.otpService.setOTPValidated({isValid:true, orderId:this.orderId});
                    } else {
                        this.otpInvalid = true;
                        this.otpErrorMessage = "Invalid OTP!"
                    }
                } else {
                    this.otpInvalid = true;
                    this.otpErrorMessage = "Invalid OTP!"
                }
            },
            error => {
                this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
            }
        )
    }

    onSendOTP() {
        let redemptionOtpDetails = this.otpService.redemptionOtpDetailsSubject.getValue();
        let mobNo = redemptionOtpDetails.mobileNo;
        let orderId = redemptionOtpDetails.orderId;
        let otpRes: any;
        this.orderId = orderId;
        let otpMessage = this.utilityService.parseString(this.redemptionOtpMessage,{orderId : this.orderId, minutes : 30 });
        this.otpService.sendOrderOTP(this.orderId, mobNo, otpMessage).subscribe(otpRes => {
                if (!isNullOrUndefined(otpRes) && !isNullOrUndefined(otpRes.messageId)) {
                    this.otpSent = true;
                }
                this.OTPResloading = false;
                this.getOTPDeliveryStatusSub = Observable.interval(3000).take(10).flatMap((t) => {
                    if ((t + 1) == 10) {
                        this.resendBtnState = true;
                    }
                    return this.otpService.otpDeliveryStatus(otpRes.messageId);
                }).subscribe(responseVal => {
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
            }, error => {
            this.snackBarService.showSnackBar("Please Try Again", "Okay", this.viewContainerRef);
        });
    }

    ngOnDestroy() {
        if (this.otpValidateSub) {
            this.otpValidateSub.unsubscribe();
        }
        if (this.getOTPDeliveryStatusSub) {
            this.getOTPDeliveryStatusSub.unsubscribe();
        }
        if (this.otptimer) {
            this.otptimer.unsubscribe();
        }
    }
}