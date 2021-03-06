import {Component, Inject, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Logger} from "../core/logger/logger";
import {TitleService} from "../core/services/title.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Redemption} from "./models/redemption";
import {RedemptionFund} from "./models/redemption-fund";
import {RedemptionService} from "../core/services/redemption.service";
import {Subscription} from "rxjs/Subscription";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NumberValidator} from "../validators/validator";
import {RedemptionValidationMessages} from "./redemption-validations";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";
import {SnackBarService} from "../core/services/snack-bar.service";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";
import {OrderTypes, SchemeCodes} from "../constants/SchemeCodes";
import {isNullOrUndefined} from "util";
import {DataStorageService} from "../core/services/data-storage.service";

@Component({
    selector: 'instant-redemption',
    templateUrl: './instant-redemption.component.html',
    styleUrls: ['./redemption.styles.scss']
})

export class InstantRedemptionComponent implements OnInit, OnDestroy {
    className: string;
    instaFunds: RedemptionFund[];
    redData: Redemption;
    redemptionDataSubscription: Subscription;
    instaFormGroup: FormGroup;
    instaFormErrors: any;
    selectedBirlaFormGroupArray: FormArray;
    selectedRelianceFormGroupArray: FormArray;
    //These needs to be unaltered after initialization
    birlaInstaFunds: RedemptionFund[];
    relianceInstaFunds: RedemptionFund[];
    //These can be changed
    selectedBirlaFunds: RedemptionFund[];
    selectedRelianceFunds: RedemptionFund[];

    totalBirlaAmt: number;
    totalRelAmt: number;
    maxRelInsta: number;
    maxBirlaInsta: number;

    constructor(private logger: Logger, private titleService: TitleService, private route: ActivatedRoute, private redemptionService: RedemptionService,
                private fb: FormBuilder, private urlAccessGuard: URLAccessGuard, private router: Router, private snackBarService: SnackBarService,
                private viewContainerRef: ViewContainerRef, private dataStorageService: DataStorageService, @Inject(APP_CONFIG) private config: IAppConfig) {
        this.className = "InstantRedemptionComponent";
        this.relianceInstaFunds = [];
        this.birlaInstaFunds = [];
        this.selectedBirlaFunds = [];
        this.selectedRelianceFunds = [];
        this.totalBirlaAmt = 0;
        this.totalRelAmt = 0;
        this.maxRelInsta = 0;
        this.maxBirlaInsta = 0;
    }

    ngOnInit() {
        this.titleService.setTitle("instant");

        this.route.data.forEach((data: { redemptionFunds: [RedemptionFund] }) => {
            this.instaFunds = data.redemptionFunds;
            this.logger.debug("InstaFunds >> ", this.instaFunds);
        });

        this.redData = this.redemptionService.redemptionData.getValue();
        this.setFieldDefaults();
        this.redeemFormInitialisation();

        /*this.redemptionDataSubscription = this.redemptionService.redemptionObservable.subscribe(data => {
         this.redData = data;
         // this.redData.fundsData = this.instaFunds;
         this.logger.debug(this.className, "RedData >> ", this.redData);

         });*/
    }

    onProceed() {
        this.logger.debug("WE ARE PROCEEDING...");
        this.logger.debug(this.className, "BirlaFund >> ", this.selectedBirlaFunds);
        this.logger.debug(this.className, "RelFund >> ", this.selectedRelianceFunds);
        this.instaFunds = this.selectedBirlaFunds.concat(this.selectedRelianceFunds);
        this.logger.debug(this.className, "InstaFunds >> ", this.instaFunds);

        if (this.instaFormGroup.valid && this.instaFunds.length > 0) {
            this.urlAccessGuard.allow = true;
            this.instaFunds.forEach((fundData, index) => {
                fundData.selectedRedemptionMode = OrderTypes.InstantFlag
            });
            this.redData.fundsData = this.instaFunds;
            this.redemptionService.redemptionData.next(this.redData);
            this.logger.debug(this.className, "RedemptionoData >> ", this.redData);
            this.dataStorageService.set(this.config.isRedemptionInsta, true);
            this.router.navigate(['summary'], {relativeTo: this.route.parent});
        }
        else {
            this.logger.debug(this.className, "Errors >> ", this.instaFormGroup.errors);
            this.snackBarService.showSnackBar("Please provide valid inputs", "Okay", this.viewContainerRef);
        }
    }

    updateModelValues() {
        let birlaFundsArray = this.instaFormGroup.get('birlaFunds') as FormArray;
        let relianceFundsArray = this.instaFormGroup.get('relianceFunds') as FormArray;

        /*this.selectedBirlaFunds.forEach(fund => {
         this.totalBirlaAmt = this.totalBirlaAmt + fund.amount;
         });
         this.selectedRelianceFunds.forEach(fund => {
         this.totalRelAmt = this.totalRelAmt + fund.amount;
         });*/
        this.totalBirlaAmt = 0;
        this.totalRelAmt = 0;

        birlaFundsArray.controls.forEach((fund, index) => {
            if (fund.get('selected').value) {
                if (this.selectedBirlaFunds.indexOf(this.birlaInstaFunds[index]) < 0) {
                    this.selectedBirlaFunds.push(this.birlaInstaFunds[index]);
                }
                this.totalBirlaAmt = this.totalBirlaAmt + fund.get('redemptionAmount').value;
            }
            else {
                this.selectedBirlaFunds = this.selectedBirlaFunds.filter(x => !(x.fundId == this.birlaInstaFunds[index].fundId && x.folioNo == this.birlaInstaFunds[index].folioNo))
            }
            //finally
            this.birlaInstaFunds[index].amount = fund.get('redemptionAmount').value;
        });
        relianceFundsArray.controls.forEach((fund, index) => {
            if (fund.get('selected').value) {
                if (this.selectedRelianceFunds.indexOf(this.relianceInstaFunds[index]) < 0) {
                    this.selectedRelianceFunds.push(this.relianceInstaFunds[index]);
                }
                this.totalRelAmt = this.totalRelAmt + fund.get('redemptionAmount').value;
            }
            else {
                this.selectedRelianceFunds = this.selectedRelianceFunds.filter(x => !(x.fundId == this.relianceInstaFunds[index].fundId && x.folioNo == this.relianceInstaFunds[index].folioNo))
            }
            //finally
            this.relianceInstaFunds[index].amount = fund.get('redemptionAmount').value;
        });
        this.logger.debug(this.className, "Total Birla >> ", this.totalBirlaAmt);
        this.logger.debug(this.className, "Total Rel >> ", this.totalRelAmt);
        this.logger.debug(this.className, "RelFund >> ", this.selectedRelianceFunds);

        birlaFundsArray.controls.forEach((fund, index) => {
            let minAmt = this.birlaInstaFunds[index].minAmount;
            let amtMultiple = this.birlaInstaFunds[index].amountMultiple;
            fund.get('redemptionAmount').clearValidators();
            if (this.maxBirlaInsta == 0) {this.maxBirlaInsta = 50000}

            if (fund.get('selected').value) {
                let maxAmt = Math.min((89.98/100) * this.birlaInstaFunds[index].redeemableUnits * this.birlaInstaFunds[index].currNav, this.maxBirlaInsta - this.totalBirlaAmt + this.birlaInstaFunds[index].amount);
                if (!fund.get('redemptionAmount').enabled) {
                    fund.get('redemptionAmount').enable();
                }
                fund.get('redemptionAmount').setValidators([Validators.required, NumberValidator.minValue(minAmt), NumberValidator.maxValue(maxAmt), NumberValidator.isMultipleOf(amtMultiple)]);
            }
            else {
                if (!fund.get('redemptionAmount').disabled) {
                    fund.get('redemptionAmount').disable();
                }
            }
        });
        relianceFundsArray.controls.forEach((fund, index) => {
            let minAmt = this.relianceInstaFunds[index].minAmount;
            let amtMultiple = this.relianceInstaFunds[index].amountMultiple;
            let maxInsta = this.relianceInstaFunds[index].option.minAddLumpSum;
            fund.get('redemptionAmount').clearValidators();
            if (this.maxRelInsta == 0) {this.maxRelInsta = 50000}

            if (fund.get('selected').value) {
                let maxAmt = Math.min((89.98/100) * this.relianceInstaFunds[index].redeemableUnits * this.relianceInstaFunds[index].currNav, this.maxRelInsta - this.totalRelAmt + this.relianceInstaFunds[index].amount);
                if (!fund.get('redemptionAmount').enabled) {
                    fund.get('redemptionAmount').enable();
                }
                fund.get('redemptionAmount').setValidators([Validators.required, NumberValidator.minValue(minAmt), NumberValidator.maxValue(maxAmt), NumberValidator.isMultipleOf(amtMultiple)]);
            }
            else {
                if (!fund.get('redemptionAmount').disabled) {
                    fund.get('redemptionAmount').disable();
                }
            }
        });
    }

    redeemFormInitialisation() {
        let birlaFormGroupArray = this.fb.array([]);
        let relianceFormGroupArray = this.fb.array([]);
        let birlaFormErrorsArray = [];
        let relianceFormErrorsArray = [];
        let selectedBank = this.redemptionService.getRedemptionStateSubject()['selectedBank'];
        let selectedNominee = this.redemptionService.getRedemptionStateSubject()['selectedNominee'];

        this.instaFunds.forEach((fundData, index) => {
            let redeemable = fundData.redeemableUnits * fundData.currNav;
            let amount = fundData.amount;
            if (fundData.fundId == SchemeCodes.SMT_BIRLA_CASH_PLUS) {
                this.logger.debug("INDEX >> ", index, " >> ", fundData.fundId);
                if (fundData.folioNo.length>0){
                    this.redemptionService.getBirlaInstaAmtForDay(fundData.folioNo, fundData.option.soptRfnum, fundData.fundId).subscribe(_value => {
                        if (!isNullOrUndefined(_value['instaAmount']) && _value['instaAmount'].length>0){
                            this.logger.debug(this.className, "InstaUnitsNotnull >>", parseFloat(_value['instaAmount']));
                            // minAddLumpSum is used to Store Max Insta Limit from Reliance API
                            // fundData.option.minAddLumpSum = +_value['instaAmount'];
                            if (+_value['instaAmount'] > this.maxBirlaInsta){
                                this.maxBirlaInsta = +_value['instaAmount'];
                            }
                        }
                    });
                }
                this.birlaInstaFunds.push(fundData);

                birlaFormGroupArray.push(this.fb.group({
                    redemptionAmount: [''],
                    selected: [false]
                }));
                birlaFormErrorsArray.push({
                    redemptionAmount: '',
                    selected: ''
                });
            }
            if (fundData.fundId == SchemeCodes.SMT_RELIANCE_TREASURY) {
                this.logger.debug("INDEX >> ", index, " >> ", fundData.fundId);
                if (fundData.folioNo.length>0){
                    this.redemptionService.getRelianceInstaAmtForDay(fundData.folioNo, fundData.option.soptRfnum, fundData.fundId).subscribe(_value => {
                        if (!isNullOrUndefined(_value['instaAmount']) && _value['instaAmount'].length>0){
                            this.logger.debug(this.className, "InstaUnitsNotnull >>", parseFloat(_value['instaAmount']));
                            // minAddLumpSum is used to Store Max Insta Limit from Reliance API
                            // fundData.option.minAddLumpSum = +_value['instaAmount'];
                            if (+_value['instaAmount'] > this.maxRelInsta){
                                this.maxRelInsta = +_value['instaAmount'];
                            }
                        }
                    });
                }

                this.relianceInstaFunds.push(fundData);

                relianceFormGroupArray.push(this.fb.group({
                    redemptionAmount: [''],
                    selected: [false]
                }));
                relianceFormErrorsArray.push({
                    redemptionAmount: '',
                    selected: ''
                });
            }
        });

        this.logger.debug("AllArray >> ", this.instaFunds);
        this.logger.debug("BirlaArray >> ", birlaFormGroupArray);
        this.logger.debug("RelianceArray >> ", relianceFormGroupArray);
        this.logger.debug(this.className, "instaFormGroup before >> ", this.instaFormGroup);
        this.instaFormGroup = this.fb.group({
            birlaFunds: birlaFormGroupArray,
            relianceFunds: relianceFormGroupArray
        });
        this.instaFormErrors = {
            birlaFunds: birlaFormErrorsArray,
            relianceFunds: relianceFormErrorsArray
        };

        this.logger.debug(this.className, "instaFormGroup >> ", this.instaFormGroup);

        this.instaFormGroup.valueChanges.subscribe(data => {
            if (!this.instaFormGroup) {
                return;
            }
            else {
                this.updateModelValues();
                this.updateErrorMessages();
            }
        })
    }

    updateErrorMessages() {
        const form = this.instaFormGroup;
        let birlaFundsArray = this.instaFormGroup.get('birlaFunds') as FormArray;
        let relianceFundsArray = this.instaFormGroup.get('relianceFunds') as FormArray;

        this.instaFormErrors['birlaFunds'].forEach((fund, index) => {
            fund.redemptionAmount = '';
            let redemptionAmountControl = birlaFundsArray.at(index).get('redemptionAmount');

            if (redemptionAmountControl && redemptionAmountControl.dirty) {
                const messages = RedemptionValidationMessages.redemptionAmount;
                this.logger.debug(this.className, redemptionAmountControl.errors);

                for (const key in redemptionAmountControl.errors) {
                    switch (key) {
                        case "minValue":
                            fund.redemptionAmount += messages[key] + redemptionAmountControl.errors[key].requiredValue + ', ';
                            break;
                        case "maxValue":
                            fund.redemptionAmount += messages[key] + redemptionAmountControl.errors[key].requiredValue + ', '; //this.redData.fundsData[index].currValue;
                            // messages[key] + redemptionAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "isMultiple":
                            fund.redemptionAmount += messages[key] + redemptionAmountControl.errors[key].multipleVal + ' ';
                            break;
                        default:
                            fund.redemptionAmount += messages[key] + ' ';
                            break;
                    }
                }
            }
        });
        this.instaFormErrors['relianceFunds'].forEach((fund, index) => {
            fund.redemptionAmount = '';
            let redemptionAmountControl = relianceFundsArray.at(index).get('redemptionAmount');

            if (redemptionAmountControl && redemptionAmountControl.dirty) {
                const messages = RedemptionValidationMessages.redemptionAmount;
                this.logger.debug(this.className, redemptionAmountControl.errors);

                for (const key in redemptionAmountControl.errors) {
                    switch (key) {
                        case "minValue":
                            fund.redemptionAmount += messages[key] + redemptionAmountControl.errors[key].requiredValue + ', ';
                            break;
                        case "maxValue":
                            fund.redemptionAmount += messages[key] + redemptionAmountControl.errors[key].requiredValue + ', '; //this.redData.fundsData[index].currValue;
                            // messages[key] + redemptionAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "isMultiple":
                            fund.redemptionAmount += messages[key] + redemptionAmountControl.errors[key].multipleVal + ' ';
                            break;
                        default:
                            fund.redemptionAmount += messages[key] + ' ';
                            break;
                    }
                }
            }
        })
    }

    changeBirlaComposition(checked: boolean, fundGroup: FormGroup, redemptionFund: RedemptionFund) {
        if (checked) {
            if (fundGroup.get('redemptionAmount').valid) {
                fundGroup.get('redemptionAmount').updateValueAndValidity();
            }
        }
        else {
            // this.selectedBirlaFunds = this.selectedBirlaFunds.filter(x => !(x.fundId==redemptionFund.fundId && x.folioNo==redemptionFund.folioNo))
        }
        // this.logger.debug(this.className, "SelectedBirla >> ", this.selectedBirlaFunds);
    }

    changeRelComposition(checked: boolean, fundGroup: FormGroup, redemptionFund: RedemptionFund) {
        if (checked) {
            if (fundGroup.get('redemptionAmount').valid) {
                fundGroup.get('redemptionAmount').updateValueAndValidity();
            }
        }
        else {
            // this.selectedRelianceFunds = this.selectedRelianceFunds.filter(x => !(x.fundId==redemptionFund.fundId && x.folioNo==redemptionFund.folioNo))
        }
        // this.logger.debug(this.className, "SelectedRel >> ", this.selectedRelianceFunds);
    }

    setFieldDefaults() {
        if (!this.redData.selectedBank) {
            this.redData.selectedBank = this.redData.bankList[0];
        }

        if (!this.redData.selectedNominee) {
            this.redData.selectedNominee = this.redData.nomineeList[0];
        }
    }

    ngOnDestroy() {
        if (this.redemptionDataSubscription) {
            this.redemptionDataSubscription.unsubscribe();
        }
    }
}
