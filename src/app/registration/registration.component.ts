import {Component, Inject, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {User} from "../models/user";
import {HttpService} from "../core/services/http-service.service";
import {UserService} from "./userdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Logger} from "../core/logger/logger";
import {TitleService} from "../core/services/title.service";
import {SnackBarService} from "../core/services/snack-bar.service";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";
import { MdDialog, MdDialogConfig } from '@angular/material';
import {LoadingDialogComponent} from "../shared/loading-dialog.component";
import {KYCGroup} from "../constants/KYCGroup";
import {KycStatusService} from "../core/services/kycstatus.service";
import {HeaderService} from "../core/services/header.service";
import {PlatformLocation} from "@angular/common";
import {OTPService} from "../kyc-status/otp-service";
import {UtilityService} from "../core/services/utility.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.styles.scss'],
    providers: [UserService]
})
export class RegistrationComponent implements OnInit, OnDestroy {

    // resultsubscription: Subscription
    addressCollapsed: boolean = true;
    addressState: String = 'hide';
    bankCollapsed: boolean = true;
    bankState: String = 'hide';
    otherCollapsed: boolean = true;
    otherState: String = 'hide';
    nomineeCollapsed: boolean = true;
    nomineeState: String = 'hide';
    makeKycVisible() : void {
        this.addressCollapsed = false;
        this.addressState = 'show';
    }
    makeBankVisible(): void {
        this.bankCollapsed = false;
        this.bankState = 'show'
    }
    makeOtherVisible(): void {
        this.otherCollapsed = false;
        this.otherState = 'show'
    }
    makeNomineeVisible(): void {
        this.nomineeCollapsed = false;
        this.nomineeState = 'show'
    }
    user: User;
    path: any;
    baseUrl: string;
    tcUrl: string;
    privacyPolicyUrl:string;
    kycStatus: string;
    pageLoadSubscription: Subscription;
    loadingDialogRef: any;
    agreementSelected: boolean;
    className: string;
    error: string;

    constructor(public http: HttpService, public userService: UserService, public router: Router,
                public route: ActivatedRoute, public logger: Logger, public titleService: TitleService, public viewContainerRef: ViewContainerRef,
                public snackBarService: SnackBarService, @Inject(APP_CONFIG) private config: IAppConfig, public dialog: MdDialog,
                public kycStatusService: KycStatusService, private utilityService: UtilityService, private headerService: HeaderService, private location: PlatformLocation,
                private otpService: OTPService) {
        this.className = "RegistrationComponent";
        this.baseUrl = this.location['location'].origin;
        this.tcUrl = "/static/terms-conditions";
        this.privacyPolicyUrl = "/static/privacy-policy";
        this.agreementSelected = false;
    }

    ngOnInit() {
        let dialogObservable =  this.showLoadingDialog();
        this.titleService.setTitle("registration");
        this.logger.debug(this.className,"DATE " + Date.now());
        this.userService.currentUser.subscribe(user => {
            this.user = user;
            // let timerSub = Observable.timer(3000).subscribe(_t => {
                this.error = "";
                if (this.user.userBasic.pan.length<=0 || this.user.userBasic.dob.length<=0 || this.user.userBasic.gender.length<=0
                    || this.user.userBasic.panName.length<=0 || this.user.userBasic.contact.mob.length<=0){
                    this.error = this.error + "Personal Details, "
                }
                if (this.user.userBank.buaid.length<=0) {
                    this.error = this.error + "Bank, "
                }
                if (this.user.userFatca.futid.length<=0 || this.user.userFatca.birthCity.length<=0) {
                    this.error = this.error + "FATCA, "
                }
                if (this.user.userAddress.permanentAddress.amtid.length<=0) {
                    this.error = this.error + "Address "
                }
                // timerSub.unsubscribe();
            // });
        });
        /*this.logger.debug(this.className,result);
        this.user = result;*/

        this.otpService.getUserData().subscribe(data => {
            if (data.pan == "" || data.mob == ""){
                let diaSubscription  = dialogObservable.subscribe((result) =>{
                    diaSubscription.unsubscribe();
                    this.router.navigate([this.config.defaultAfterSignup]);
                });
                this.closeLoadingDialog();
            }
        },
        error => {
            this.snackBarService.showSnackBar("Error Occurred, please refresh", "Okay", this.viewContainerRef);
            this.closeLoadingDialog();
        });

        //UNCOMMENTING THIS WILL GO IN INFINETE REDIRECTION
       /* if (this.user.userBasic.pan.length == 0 || this.user.userBasic.contact.mob.length == 0){
            let diaSubscription  = dialogObservable.subscribe((result) =>{
                diaSubscription.unsubscribe();
                this.router.navigate([this.config.defaultAfterSignup]);
            });
            this.closeLoadingDialog();
        }
        else {
            this.otpService.getUserData().subscribe(data => {
                this.logger.debug(this.className, "USERDATADFDSFSDFSDFDVSDVADKHJSALSDFLSJFLSDFLSDFLSDFLSDJFLSDFLSDFLSDFLSDFLSDFLSJDFLSDFL>>> ",  data);
                if (data.pan == "" || data.mob == ""){
                    let diaSubscription  = dialogObservable.subscribe((result) =>{
                        diaSubscription.unsubscribe();
                        this.router.navigate([this.config.defaultAfterSignup]);
                    });
                    this.closeLoadingDialog();
                }
            })
        }*/

        this.kycStatusService.checkKycStatus().subscribe(response => {
            if (response['kycstatus']){
                let kycStatus = response['kycstatus'];
                this.kycStatusService.checkUserStatus().subscribe(isVarified => {
                    if ((kycStatus == KYCGroup.KYC_Done || kycStatus == KYCGroup.KYC_EXTERNALLYDONE) && isVarified){
                        let diaSubscription  = dialogObservable.subscribe((result) =>{
                            diaSubscription.unsubscribe();
                            this.router.navigate([this.config.defaultAfterLogin]);
                        });
                        this.closeLoadingDialog();
                    }
                })
            }
        }, error => {
            this.snackBarService.showSnackBar("Error Occurred, please refresh", "Okay", this.viewContainerRef);
            this.closeLoadingDialog();
        });

        this.pageLoadSubscription = this.userService.pageLoadedObservable.subscribe(value => {
            if (value){
                let diaSubscription  = dialogObservable.subscribe((result) =>{
                    diaSubscription.unsubscribe();
                });
                this.closeLoadingDialog();
            }
        });
    }

    goTo(link) {
        this.utilityService.openByWindow(link);
    }

    toToUpload(){
        let pan = this.user.userBasic.pan;
        let address = this.user.userAddress.permanentAddress;
        let addressString = address.address1 + " " + address.address2 + " " + address.city + " " + address.district + " " + address.pin;
        let bank = this.user.userBank;
        let bankString = bank.accountNumber + " - " + bank.bank.IFSC;
        let userData = {"pan": pan, "address": addressString, "bank": bankString};
        let errorString = "";

        if (this.user.userBank.buaid.length>0 && this.user.userFatca.futid.length>0 && this.user.userFatca.birthCity.length>0 && this.user.userAddress.permanentAddress.amtid.length>0
            && this.user.userBasic.pan.length>0 && this.user.userBasic.dob.length>0 && this.user.userBasic.gender.length>0 && this.user.userBasic.panName.length>0
            && this.user.userBasic.contact.mob.length>0){
            this.router.navigate(['/registration/upload', userData]);

            this.kycStatusService.checkKycStatus()
                .subscribe(status => {
                    if (status['kycstatus'] &&  (status['kycstatus'] != KYCGroup.KYC_Done && status['kycstatus'] != KYCGroup.KYC_EXTERNALLYDONE)){
                        this.http.securePost('/user/updateKycStatus', {"kycStatus": KYCGroup.KYC_UNDERPROCESS, "kycType": KYCGroup.KYCTYPE_PAN})
                            .subscribe(res => {
                                    this.logger.debug(this.className, "KYC status updated" + res)
                                },
                                error => {
                                    this.logger.debug(this.className, "KYC status update failed" + error.error);
                                }
                            );
                    }
                }, error => {
                    this.snackBarService.showSnackBar("Error Occurred, please refresh", "Okay", this.viewContainerRef);
                });
            /*this.http.secureGet('/bse/bseRegistration')
                .subscribe(data => {
                    this.logger.debug(this.className, data);
                    /!*if (data['success']){
                        this.http.get('/bse/bseRegisterFatca')
                            .subscribe(fatcaData => {
                                this.logger.debug(this.className, fatcaData);
                            })
                    }*!/
                })*/
        }
        else {
            if (this.user.userBasic.pan.length<=0 || this.user.userBasic.dob.length<=0 || this.user.userBasic.gender.length<=0
                || this.user.userBasic.panName.length<=0 || this.user.userBasic.contact.mob.length<=0){
                errorString = errorString + "Personal Details, "
            }
            if (this.user.userBank.buaid.length<=0) {
                errorString = errorString + "Bank, "
            }
            if (this.user.userFatca.futid.length<=0 || this.user.userFatca.birthCity.length<=0) {
                errorString = errorString + "FATCA, "
            }
            if (this.user.userAddress.permanentAddress.amtid.length<=0) {
                errorString = errorString + "Address "
            }
            this.snackBarService.showSnackBar("Form Incomplete: " + errorString, "Okay", this.viewContainerRef);
        }
    }

    showLoadingDialog() {
        let config = new MdDialogConfig();
        let device = this.headerService.deviceType();
        if (device === 'xs' || device === 'sm') {
            config.width = '80%';
        }else {
            config.width = '25vw';
        }
        config.disableClose = true;
        config.viewContainerRef = this.viewContainerRef;
        let loadingConfig = {
            text: "Loading..."
        };
        this.loadingDialogRef = this.dialog.open(LoadingDialogComponent, config);
        this.loadingDialogRef.componentInstance.config = loadingConfig;
        return this.loadingDialogRef.afterClosed();
    }

    closeLoadingDialog(){
        if(this.loadingDialogRef){
            this.loadingDialogRef.close();
        }
    }

    ngOnDestroy() {
        this.pageLoadSubscription.unsubscribe();

        if (this.loadingDialogRef) {
            this.loadingDialogRef.close();
        }
    }
}
