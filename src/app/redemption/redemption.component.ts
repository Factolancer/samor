import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FundSearchResults} from "../explore-funds/fund-search-results";
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/take";
import {ExploreFundsService} from "../core/services/explore-funds.service";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";
import {Fund} from "../models/fund";
import {Logger} from "../core/logger/logger";
import {SnackBarService} from "../core/services/snack-bar.service";
import {HeaderService} from "../core/services/header.service";
import {Observable} from "rxjs/Observable";
import {RedemptionService} from "../core/services/redemption.service";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Redemption} from "./models/redemption";
import {RedemptionModeEnum} from "../enum/redemption-mode-enum";
import {RedemptionFund} from "./models/redemption-fund";
import {RedemptionValidationMessages} from "./redemption-validations";
import {NumberValidator} from "../validators/validator";
import {OrderTypes} from "../constants/SchemeCodes";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {ClosableConfirmationDialogComponent} from "../shared/closable-confimation-dialog.component";
import {isNullOrUndefined} from "util";
import {InstaConfirmationDialogComponent} from "../shared/insta-confirmation-dialog.component";


@Component({
    selector: 'app-redemption',
    templateUrl: './redemption.component.html',
    styleUrls: ['./redemption.styles.scss']
})

export class RedemptionComponent implements OnInit, OnDestroy {
    searchResults: FundSearchResults;
    showFilterContent: boolean;
    redeemFundList: Fund[];
    showComparisonList: boolean;
    redemptionDataSubscription: Subscription;

    redData: Redemption;
    redemptionFormGroup: FormGroup;
    redemptionFormErrors: any;
    totalRedemptionAmount: number;
    className: string;
    fullRedemption: boolean;
    amountOrUnit: boolean;

    navToolTipText: string;
    shake: boolean;
    shakeSub: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
                private exploreFundsService: ExploreFundsService, private titleService: Title,
                private redemptionService: RedemptionService, private urlAccessGuard: URLAccessGuard,
                private snackBarService: SnackBarService, private viewContainerRef: ViewContainerRef,
                private logger: Logger, private headerService: HeaderService, private dialog: MdDialog) {
        this.className = "RedemptionComponent";
        this.fullRedemption = false;
        this.amountOrUnit = false;
        this.navToolTipText = "If you are placing order before 2pm the NAV of the same day will be applicable. Else the NAV of the       succeeding day will be applicable on your redemption order. In case the market value falls down the entered amount your order will be rejected. It will be a good practice to opt for full redemption of units or amount less than or equal to 90% of the current market value";
    }

    ngOnInit() {
        this.logger.debug(this.className, this.redemptionService.getRedemptionStateSubject());
        this.titleService.setTitle("Redeem Funds");
        Observable.timer(1000).subscribe(() => {
            this.redemptionService.getRedemptionData();
        });

        /*.subscribe(data => {
         // this.redemptionService.redemptionObservable.subscribe(funds => {
         let funds = this.redemptionService.getRedemptionStateSubject()['fundsData'];
         if (funds.length > 0){
         data.fundsData.push(funds);
         }
         // this.redemptionService.redemptionData.next(data);
         this.redData = data; // this.redemptionService.getRedemptionStateSubject();
         this.logger.debug(this.className, this.redData);
         this.setFieldDefaults();
         this.redeemFormInitialisation();
         // })
         })*/
        /*.map(values => {
         this.redData = values
         this.setFieldDefaults();
         this.redeemFormInitialisation();
         });*/
        this.redemptionDataSubscription = this.redemptionService.redemptionObservable.subscribe(data => {
            this.logger.debug(this.className, data);
            this.redData = data;
            this.setFieldDefaults();
            this.redeemFormInitialisation();
        });

        /*this.route.params.switchMap((params: Params) => {
         this.logger.debug(params);
         return this.exploreFundsService.getSearchFundFromRoute(params);
         }).subscribe(searchInput => {
         this.headerService.onDemandProgressBar();
         this.searchInput = searchInput;
         this.logger.debug(this.className, "emitting search Input");
         this.exploreFundsService.setFundSearchInput(searchInput);
         this.titleService.setTitle(this.exploreFundsService.getExploreTitle(searchInput));
         this.logger.debug(this.className, searchInput);
         this.exploreFundsService.search(searchInput).subscribe(results => {
         this.searchResults = results;
         this.checkAgainstRedemptionList();
         this.exploreFundsService.setFundSearchResult(results);
         this.logger.debug(results);
         });
         });*/

    }

    setFieldDefaults() {
        if (!this.redData.selectedBank) {
            this.redData.selectedBank = this.redData.bankList[0];
        }

        if (!this.redData.selectedNominee) {
            this.redData.selectedNominee = this.redData.nomineeList[0];
        }
    }

    redeemFormInitialisation() {
        let fundFormGroupArray = this.fb.array([]);
        let fundFormErrorsArray = [];
        let selectedBank = this.redemptionService.getRedemptionStateSubject()['selectedBank'];
        let selectedNominee = this.redemptionService.getRedemptionStateSubject()['selectedNominee'];
        this.totalRedemptionAmount = 0;

        this.redData.fundsData.forEach(fundData => {
            // let fund = fundData.fund;
            let option = fundData.option;
            let plan = fundData.plan;
            let selectedRedemptionMode = fundData.selectedRedemptionMode;
            let amount = fundData.amount;

            this.totalRedemptionAmount += amount;

            if (selectedRedemptionMode == RedemptionModeEnum[RedemptionModeEnum.SWP]) {
                /*let selectedAWPFrequency = fundData.selectedAWPFrequency;
                 let selectedAWPDate = fundData.selectedAWPDate;
                 let noOfInstallments = fundData.noOfInstallment;*/

                fundFormGroupArray.push(this.fb.group({
                    // redemptionMode: [selectedRedemptionMode || '', Validators.required],
                    selectedAWPFrequency: ['', Validators.required],
                    selectedAWPDate: ['', Validators.required],
                    noOfInstallments: ['', Validators.required],
                    redemptionType: [this.fullRedemption || false, Validators.required],
                    amountUnitFlag: [fundData.amountUnitFlag || false, Validators.required],
                    redemptionAmountOrUnit: [amount || '', Validators.required],
                }));
                fundFormErrorsArray.push({
                    // redemptionMode: '',
                    selectedAWPFrequency: '',
                    selectedAWPDate: '',
                    noOfInstallments: '',
                    redemptionType: '',
                    amountUnitFlag: '',
                    redemptionAmountOrUnit: '',
                });
            }
            else {
                fundFormGroupArray.push(this.fb.group({
                    // redemptionMode: [selectedRedemptionMode || '', Validators.required],
                    redemptionType: [fundData.fullPartialFlag || false, Validators.compose([Validators.required])],
                    amountUnitFlag: [fundData.amountUnitFlag || false, Validators.compose([Validators.required])],
                    redemptionAmountOrUnit: [amount || '', Validators.compose([Validators.required])]
                }));
                fundFormErrorsArray.push({
                    // redemptionMode: '',
                    redemptionType: '',
                    amountUnitFlag: '',
                    redemptionAmountOrUnit: ''
                });
            }
        });

        /*if (this.nomineeExists) {
         this.checkoutFormGroup = this.fb.group({
         selectedNominee: [selectedNominee || '', Validators.required],
         selectedBank: [selectedBank || '', Validators.required],
         fundsData: fundFormGroupArray
         });
         this.logger.debug(this.className, "Form ", this.checkoutFormGroup);

         this.checkoutFormErrors = {
         selectedNominee: '',
         selectedBank: '',
         fundsData: fundFormErrorsArray
         };
         } else {*/
        this.redemptionFormGroup = this.fb.group({
            // selectedBank: [selectedBank || '', Validators.required],
            fundsData: fundFormGroupArray
        });

        this.redemptionFormErrors = {
            // selectedBank: '',
            fundsData: fundFormErrorsArray
        };
        // }

        this.redemptionFormGroup.valueChanges
            .subscribe(data => {
                if (!this.redemptionFormGroup) {
                    return;
                } else {
                    this.updateModelValues();
                    this.updateErrorMessages();
                    // this.redemptionFormGroup.updateValueAndValidity();
                    this.logger.debug(this.className, this.redemptionFormGroup);
                }
            });


        let formFundsArray = this.redemptionFormGroup.get('fundsData') as FormArray;
        formFundsArray.controls.forEach((fundGroup, index) => {
            let maxRedUnits = this.redData.fundsData[index].redeemableUnits;
            let maxRedValue = this.redData.fundsData[index].currValue;
            let minRedUnits = this.redData.fundsData[index].minQuantity;
            let minRedAmount = this.redData.fundsData[index].minAmount;
            let unitMultiple = this.redData.fundsData[index].quantityMultiple;
            let amountMultiple = this.redData.fundsData[index].amountMultiple;
            fundGroup.get('redemptionType').valueChanges.subscribe(data => {
                this.logger.debug("CHANGE DETECTED");
                // fundGroup.get('redemptionType').updateValueAndValidity();
                // fundGroup.get('amountUnitFlag').updateValueAndValidity();
                if (fundGroup.get('redemptionType').value) {
                    if (fundGroup.get('amountUnitFlag').value) {
                        fundGroup.get('amountUnitFlag').setValue(false);
                    }
                    fundGroup.get('redemptionAmountOrUnit').setValue(this.redData.fundsData[index].redeemableUnits);
                    fundGroup.get('redemptionAmountOrUnit').clearValidators();
                }
                this.updateErrorMessages();
            });
            fundGroup.get('amountUnitFlag').valueChanges.subscribe(data => {
                this.logger.debug("CHANGE DETECTED");
                // if (!fundGroup.get('amountUnitFlag').value)
                fundGroup.get('redemptionType').updateValueAndValidity();
                // fundGroup.get('amountUnitFlag').updateValueAndValidity();
                // Partial Flag
                if (!fundGroup.get('redemptionType').value) {
                    fundGroup.get('redemptionAmountOrUnit').clearValidators();
                    // Unit Flag
                    if (!fundGroup.get('amountUnitFlag').value) {
                        fundGroup.get('redemptionAmountOrUnit').setValidators(Validators.compose([Validators.required, NumberValidator.maxUnits(maxRedUnits), NumberValidator.minUnits(minRedUnits), NumberValidator.isMultipleOfUnits(unitMultiple)]));
                        this.logger.debug(this.className, "FORMVALUE Unit ", fundGroup.get('redemptionAmountOrUnit'));
                        // fundGroup.get('redemptionAmountOrUnit')
                    }
                    // Amount Flag
                    else {
                        fundGroup.get('redemptionAmountOrUnit').setValidators(Validators.compose([Validators.required, NumberValidator.maxValue(Math.floor(maxRedValue)), NumberValidator.minValue(Math.floor(minRedAmount)), NumberValidator.isMultipleOf(amountMultiple)]));
                        this.logger.debug(this.className, "FORMVALUE Amount ", fundGroup.get('redemptionAmountOrUnit'));
                        // fundGroup.get('redemptionAmountOrUnit').updateValueAndValidity();
                    }
                }
                fundGroup.get('redemptionAmountOrUnit').updateValueAndValidity();
                this.updateErrorMessages();
            });
            this.redData.fundsData[index].fullPartialFlag = fundGroup.get('redemptionType').value;
            this.redData.fundsData[index].amountUnitFlag = fundGroup.get('amountUnitFlag').value;
            this.redData.fundsData[index].amount = fundGroup.get('redemptionAmountOrUnit').value;
        })
    }


    //checking if the fund is in comparison list then it is updated else it is not marked
    checkAgainstRedemptionList() {
        if (this.redeemFundList.length > 0 && this.searchResults.funds.length > 0) {
            this.searchResults.funds.forEach(fund => {
                let fundExists = false;
                this.redeemFundList.forEach(comparisonFund => {
                    if (comparisonFund.id == fund.id)
                        fundExists = true;
                });
                if (fundExists) {
                    fund.selected = true;
                } else {
                    fund.selected = false;
                }
            })
        } else {
            this.searchResults.funds.forEach(fund => fund.selected = false)
        }
    }

    updateErrorMessages() {
        const form = this.redemptionFormGroup;

        //funds validation
        let formFundsArray = form.get('fundsData') as FormArray;
        this.redemptionFormErrors['fundsData'].forEach((fund, index) => {

            //selected Redemption Amount or Units
            fund.redemptionAmountOrUnit = '';
            let redemptionAmountControl = formFundsArray.at(index).get('redemptionAmountOrUnit');
            if (redemptionAmountControl && redemptionAmountControl.dirty) {
                const messages = RedemptionValidationMessages.redemptionAmountOrUnit;
                this.logger.debug(this.className, redemptionAmountControl.errors);
                /*if (formFundsArray.at(index).get('amountUnitFlag').value && formFundsArray.at(index).get('redemptionAmountOrUnit').value > this.redData.fundsData[index].currValue){
                 formFundsArray.at(index).get('redemptionAmountOrUnit').setValue(this.redData.fundsData[index].currValue);
                 }
                 if (!formFundsArray.at(index).get('amountUnitFlag').value && formFundsArray.at(index).get('redemptionAmountOrUnit').value > this.redData.fundsData[index].redeemableUnits){
                 formFundsArray.at(index).get('redemptionAmountOrUnit').setValue(this.redData.fundsData[index].redeemableUnits);
                 }*/
                for (const key in redemptionAmountControl.errors) {
                    // if (formFundsArray.at(index).get('amountUnitFlag').value){
                    switch (key) {
                        case "minValue":
                            fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "maxValue":
                            fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].requiredValue + ' '; //this.redData.fundsData[index].currValue;
                            // messages[key] + redemptionAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "minUnits":
                            fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "maxUnits":
                            fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "isMultiple":
                            fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].multipleVal + ' ';
                            break;
                        case "isMultipleUnits":
                            fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].multipleVal + ' ';
                            break;
                        default:
                            fund.redemptionAmountOrUnit += messages[key] + ' ';
                            break;
                    }
                    // }
                    /*else {
                     switch (key) {
                     /!*case "minValue":
                     fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].requiredValue + ' ';
                     break;
                     case "maxValue":
                     fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].requiredValue + ''; //this.redData.fundsData[index].currValue;
                     // messages[key] + redemptionAmountControl.errors[key].requiredValue + ' ';
                     break;*!/
                     case "minUnits":
                     fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].requiredValue + '';
                     break;
                     case "maxUnits":
                     fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].requiredValue + '';
                     break;
                     /!*case "isMultiple":
                     fund.redemptionAmountOrUnit += messages[key] + redemptionAmountControl.errors[key].requiredValue + ' ';
                     break;*!/
                     default:
                     fund.redemptionAmountOrUnit += messages[key] + ' ';
                     break;
                     }
                     }*/
                }
            }
        });
    }

    updateModelValues() {
        const form = this.redemptionFormGroup;
        this.totalRedemptionAmount = 0;
        let formFundsArray = form.get('fundsData') as FormArray;

        formFundsArray.controls.forEach((fundGroup, index) => {
            // this.logger.debug(this.className, "formFundsArray: ", formFundsArray.at(index).get('amountUnitFlag').status);
            let maxRedUnits = this.redData.fundsData[index].redeemableUnits;
            let maxRedValue = this.redData.fundsData[index].currValue;
            let minRedUnits = this.redData.fundsData[index].minQuantity;
            let minRedAmount = this.redData.fundsData[index].minAmount;
            let unitMultiple = this.redData.fundsData[index].quantityMultiple;
            let amountMultiple = this.redData.fundsData[index].amountMultiple;

            if (fundGroup.get('redemptionType').value && (fundGroup.get('amountUnitFlag').value)) {
                fundGroup.get('amountUnitFlag').setValue(false);
                fundGroup.get('redemptionAmountOrUnit').setValue(this.redData.fundsData[index].redeemableUnits);
            }
            if (fundGroup.get('amountUnitFlag').value) {

            }

            // Partial Flag
            if (!fundGroup.get('redemptionType').value) {
                // Unit Flag
                if (!fundGroup.get('amountUnitFlag').value) {
                    fundGroup.get('redemptionAmountOrUnit').clearValidators();
                    fundGroup.get('redemptionAmountOrUnit').setValidators(Validators.compose([Validators.required, NumberValidator.maxUnits(maxRedUnits), NumberValidator.minUnits(minRedUnits), NumberValidator.isMultipleOfUnits(unitMultiple)]));
                    this.logger.debug(this.className, "FORMVALUE Unit ", fundGroup.get('redemptionAmountOrUnit'));
                    // fundGroup.get('redemptionAmountOrUnit')
                }
                // Amount Flag
                else {
                    fundGroup.get('redemptionAmountOrUnit').clearValidators();
                    fundGroup.get('redemptionAmountOrUnit').setValidators(Validators.compose([Validators.required, NumberValidator.maxValue(Math.floor(maxRedValue)), NumberValidator.minValue(Math.floor(minRedAmount)), NumberValidator.isMultipleOf(amountMultiple)]));
                    this.logger.debug(this.className, "FORMVALUE Amount ", fundGroup.get('redemptionAmountOrUnit'));
                    // fundGroup.get('redemptionAmountOrUnit').updateValueAndValidity();
                }
            }

            this.redData.fundsData[index].fullPartialFlag = fundGroup.get('redemptionType').value;
            this.redData.fundsData[index].amountUnitFlag = fundGroup.get('amountUnitFlag').value;
            this.redData.fundsData[index].amount = fundGroup.get('redemptionAmountOrUnit').value;

            /* if (formGroup.get('redemptionType') && !formGroup.get('amountUnitFlag')){
             formGroup.get('amountUnitFlag').disable()
             }*/

            /*if (formGroup.get('investmentMode').value == RedemptionModeEnum[RedemptionModeEnum.SWP]) {
             this.logger.debug(this.className, formGroup.get('investmentMode').value);
             this.redemptionService.getRedemptionStateSubject().fundsData[index].selectedAIPFrequency = formGroup.get('selectedAIPFrequency').value;
             this.redemptionService.getRedemptionStateSubject().fundsData[index].selectedDeductionDate = formGroup.get('selectedDeductionDate').value;
             this.redemptionService.getRedemptionStateSubject().fundsData[index].noOfInstallment = formGroup.get('noOfInstallments').value;
             }
             this.checkoutData.fundsData[index].amount = formGroup.get('investmentAmount').value;*/
        });
        /*this.checkoutData.selectedBank = form.get('selectedBank').value;
         if (this.nomineeExists) {
         this.checkoutData.selectedNominee = form.get('selectedNominee').value;
         }*/

        this.logger.debug(this.className, "RedemptionData ", this.redemptionService.redemptionData);
    }

    removeFund(fund: RedemptionFund, index: number) {
        let redemptionData = this.redemptionService.getRedemptionStateSubject();
        redemptionData.fundsData.splice(index, 1);
        this.redemptionService.redemptionData.next(redemptionData);
        this.redemptionService.postRedemptionData().subscribe(data => {
                if (data && data['success']) {
                    this.snackBarService.showSnackBar("Fund removed successfully", "Okay", this.viewContainerRef);
                }
            },
            error => {
                this.snackBarService.showSnackBar("Error Occurred, Please refresh", "Okay", this.viewContainerRef);
            })
    }

    setFullRedemption(fundGroup: AbstractControl, index: number) {
        fundGroup.get('redemptionType').setValue(true); //Set full redemption
        fundGroup.get('amountUnitFlag').setValue(false);
        fundGroup.get('redemptionAmountOrUnit').setValue(this.redData.fundsData[index].redeemableUnits);
        this.redData.fundsData[index].fullPartialFlag = true; //fundGroup.get('redemptionType').value;
        this.redData.fundsData[index].amountUnitFlag = fundGroup.get('amountUnitFlag').value;
        this.redData.fundsData[index].amount = fundGroup.get('redemptionAmountOrUnit').value;
    }

    onRedemptionProceed() {
        let formFundsArray = this.redemptionFormGroup.get('fundsData') as FormArray;
        if (this.redemptionFormGroup.valid) {
            this.urlAccessGuard.allow = true;
            this.updateModelValues();
            // this.redData.
            this.redemptionService.redemptionData.next(this.redData);
            let makeFullCounter = 0;
            this.redData.fundsData.forEach((data, index) => {
                if (!data.fullPartialFlag) {
                    // amount is true, unit is false
                    // If AMOUNT is selected
                    if (data.amountUnitFlag) {
                        let remainingValue = data.currValue - data.amount;
                        if (data.currValue <= 2000 && remainingValue < 100) {
                            makeFullCounter++;
                        }
                        if (data.currValue > 2000 && remainingValue < 0.05 * data.currValue) {
                            makeFullCounter++;
                        }
                    }
                }
            });
            if (makeFullCounter > 0) {
                let FullRedDialogSubscription = this.openFullRedmptionMessageDialog().subscribe(fulIntemation => {
                    FullRedDialogSubscription.unsubscribe();
                    if (fulIntemation) {
                        if (fulIntemation === 'Y') {
                            this.redData.fundsData.forEach((data, index) => {
                                if (!data.fullPartialFlag) {
                                    // amount is true, unit is false
                                    // If AMOUNT is selected
                                    if (data.amountUnitFlag) {
                                        let remainingValue = data.currValue - data.amount;
                                        if (data.currValue <= 2000 && remainingValue < 100) {
                                            this.setFullRedemption(formFundsArray.at(index), index);
                                            makeFullCounter++;
                                        }
                                        if (data.currValue > 2000 && remainingValue < 0.05 * data.currValue) {
                                            this.setFullRedemption(formFundsArray.at(index), index);
                                            makeFullCounter++;
                                        }
                                    }
                                }
                            });
                        }
                        this.redemptionService.checkForInstaSchemes(this.redData.fundsData).subscribe(instaStats => {
                            let validInstaCounter = 0;
                            let popUpArray = [];
                            this.logger.debug(this.className, "INstaStats ", instaStats);
                            this.redData.fundsData.forEach((data, index) => {
                                if (instaStats['instaList'].length > 0 && instaStats['instaList'].indexOf(data.fundId) >= 0) {
                                    if (data.amountUnitFlag && data.amount >= 500) {
                                        validInstaCounter++;
                                        let orderArray = this.calculateSplitOrder(data.amount, data.currValue);
                                        let popupObj = {"fundName": data.fundName, "plan": data.plan, "option": data.option.dividendOption,
                                                        "folioNo": data.folioNo, "instaAmount": orderArray[0], "normalAmount": orderArray[1]};
                                        popUpArray.push(popupObj);
                                    }
                                    /*if (!data.amountUnitFlag && data.amount * data.currNav >= 500) {
                                        validInstaCounter++;
                                    }*/
                                }
                            });
                            this.logger.debug(this.className, "ValidCounter ", validInstaCounter);
                            if (instaStats['instaExists'] && validInstaCounter > 0) {
                                let InstaRedDialogSubscription = this.openSavingsPlusIntemationDialog(popUpArray, "Instant + Normal Order", "Only Normal Redemption").subscribe(value => {
                                    InstaRedDialogSubscription.unsubscribe();
                                    if (value === 'Y') {
                                        this.redData.fundsData.forEach((fundData, index) => {
                                            if (instaStats['instaList'].length > 0 && instaStats['instaList'].indexOf(fundData.fundId) >= 0) {
                                                fundData.selectedRedemptionMode = OrderTypes.InstantFlag
                                            }
                                        });
                                        this.redemptionService.redemptionData.next(this.redData);
                                        this.redemptionService.postRedemptionData().subscribe(data => {
                                            if (data && !data['success']) {
                                                this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                                            }
                                            else {
                                                this.redData.redemptionId = data['redemptionId'];
                                                // let savingsPlusFunds = this.redData.fundsData.filter(x => x.option.soptRfnum === SchemeCodes.SavingsPlus_Reliance);
                                                this.redemptionService.redemptionData.next(this.redData);
                                                this.router.navigate(['summary'], {relativeTo: this.route.parent});
                                            }
                                        }, error => {
                                            this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                                        });
                                    }
                                    if (value === 'N') {
                                        this.redemptionService.postRedemptionData().subscribe(data => {
                                            if (data && !data['success']) {
                                                this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                                            }
                                            else {
                                                this.redData.redemptionId = data['redemptionId'];
                                                this.redemptionService.redemptionData.next(this.redData);
                                                this.router.navigate(['summary'], {relativeTo: this.route.parent});
                                            }
                                        }, error => {
                                            this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                                        });
                                    }
                                })
                            }
                            else {
                                this.redemptionService.postRedemptionData().subscribe(data => {
                                    if (data && !data['success']) {
                                        this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                                    }
                                    else {
                                        this.redData.redemptionId = data['redemptionId'];
                                        this.redemptionService.redemptionData.next(this.redData);
                                        this.logger.debug(this.redData);
                                        this.router.navigate(['summary'], {relativeTo: this.route.parent});
                                    }
                                }, error => {
                                    this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                                });
                            }
                        }, error => {
                            this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                        });

                        /*this.savingsPlusFunds = this.redData.fundsData.filter(x => x.option.soptRfnum === SchemeCodes.SavingsPlus_Reliance);
                         if (savingsPlusFunds.length > 0){
                         this.openSavingsPlusIntemationDialog().subscribe(value => {
                         if (value) {
                         this.redemptionService.postRedemptionData().subscribe(data => {
                         if (data && !data['success']) {
                         this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                         }
                         else {
                         this.redData.redemptionId = data['redemptionId'];
                         this.redemptionService.redemptionData.next(this.redData);
                         this.router.navigate(['summary'], {relativeTo: this.route.parent});
                         }
                         });
                         }
                         })
                         }
                         else {
                         this.redemptionService.postRedemptionData().subscribe(data => {
                         if (data && !data['success']) {
                         this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                         }
                         else {
                         this.redData.redemptionId = data['redemptionId'];
                         this.redemptionService.redemptionData.next(this.redData);
                         this.logger.debug(this.redData);
                         this.router.navigate(['summary'], {relativeTo: this.route.parent});
                         }
                         });
                         }*/
                    }
                });
            }
            else {
                this.redemptionService.checkForInstaSchemes(this.redData.fundsData).subscribe(instaStats => {
                    let validInstaCounter = 0;
                    let popUpArray = [];
                    this.logger.debug(this.className, "INstaStats ", instaStats);
                    this.redData.fundsData.forEach((data, index) => {
                        if (instaStats['instaList'].length > 0 && instaStats['instaList'].indexOf(data.fundId) >= 0) {
                            if (data.amountUnitFlag && data.amount >= 500) {
                                validInstaCounter++;
                                let orderArray = this.calculateSplitOrder(data.amount, data.currValue);
                                let popupObj = {"fundName": data.fundName, "plan": data.plan, "option": data.option.dividendOption,
                                    "folioNo": data.folioNo, "instaAmount": orderArray[0], "normalAmount": orderArray[1]};
                                popUpArray.push(popupObj);
                            }
                            /*if (!data.amountUnitFlag && data.amount * data.currNav >= 500) {
                                validInstaCounter++;
                            }*/
                        }
                    });
                    this.logger.debug(this.className, "ValidCounter ", validInstaCounter);
                    if (instaStats['instaExists'] && validInstaCounter > 0) {
                        let InstaRedDialogSubscription = this.openSavingsPlusIntemationDialog(popUpArray, "Instant + Normal Order", "Only Normal Redemption").subscribe(value => {
                            InstaRedDialogSubscription.unsubscribe();
                            if (value === 'Y') {
                                this.redData.fundsData.forEach((fundData, index) => {
                                    if (instaStats['instaList'].length > 0 && instaStats['instaList'].indexOf(fundData.fundId) >= 0) {
                                        fundData.selectedRedemptionMode = OrderTypes.InstantFlag
                                    }
                                });
                                this.redemptionService.redemptionData.next(this.redData);
                                this.redemptionService.postRedemptionData().subscribe(data => {
                                    if (data && !data['success']) {
                                        this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                                    }
                                    else {
                                        this.redData.redemptionId = data['redemptionId'];
                                        // let savingsPlusFunds = this.redData.fundsData.filter(x => x.option.soptRfnum === SchemeCodes.SavingsPlus_Reliance);
                                        this.redemptionService.redemptionData.next(this.redData);
                                        this.router.navigate(['summary'], {relativeTo: this.route.parent});
                                    }
                                }, error => {
                                    this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                                });
                            }
                            if (value === 'N') {
                                this.redemptionService.postRedemptionData().subscribe(data => {
                                    if (data && !data['success']) {
                                        this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                                    }
                                    else {
                                        this.redData.redemptionId = data['redemptionId'];
                                        this.redemptionService.redemptionData.next(this.redData);
                                        this.router.navigate(['summary'], {relativeTo: this.route.parent});
                                    }
                                }, error => {
                                    this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                                });
                            }
                        })
                    }
                    else {
                        this.redemptionService.postRedemptionData().subscribe(data => {
                            if (data && !data['success']) {
                                this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                            }
                            else {
                                this.redData.redemptionId = data['redemptionId'];
                                this.redemptionService.redemptionData.next(this.redData);
                                this.logger.debug(this.redData);
                                this.router.navigate(['summary'], {relativeTo: this.route.parent});
                            }
                        }, error => {
                            this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                        });
                    }
                }, error => {
                    this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                });
                /*let savingsPlusFunds = this.redData.fundsData.filter(x => x.option.soptRfnum === SchemeCodes.SavingsPlus_Reliance);
                 if (savingsPlusFunds.length > 0){
                 this.openSavingsPlusIntemationDialog().subscribe(value => {
                 if (value) {
                 this.redemptionService.postRedemptionData().subscribe(data => {
                 if (data && !data['success']) {
                 this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                 }
                 else {
                 this.redData.redemptionId = data['redemptionId'];
                 this.redemptionService.redemptionData.next(this.redData);
                 this.router.navigate(['summary'], {relativeTo: this.route.parent});
                 }
                 });
                 }
                 })
                 }
                 else {
                 this.redemptionService.postRedemptionData().subscribe(data => {
                 if (data && !data['success']) {
                 this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
                 }
                 else {
                 this.redData.redemptionId = data['redemptionId'];
                 this.redemptionService.redemptionData.next(this.redData);
                 this.logger.debug(this.redData);
                 this.router.navigate(['summary'], {relativeTo: this.route.parent});
                 }
                 });
                 }*/
            }

            /*if (makeFullCounter > 0){
             this.snackBarService.showSnackBar("Please select full redemption to redeem all from fund", "OKAY", this.viewContainerRef);
             }*/

        } else {
            this.shake = true;
            this.freezeShake();
            this.logger.debug(this.className, "RedemptionFormGroup: ", this.redemptionFormGroup);
            // this.showErrorOnSubmit();
            this.snackBarService.showSnackBar("Please specify correct details to proceed to redemption!", "Okay", this.viewContainerRef);
        }
    }

    calculateSplitOrder(amount: number, currValue: number): number[]{
        if (currValue > 50000){
            if ((89.98/100 * currValue) > 50000){
                if (amount <= 50000){
                    return [amount, 0];
                }
                else {
                    return [50000, amount-50000];
                }
            }
            else {
                if (amount <= (89.98/100 * currValue)){
                    return [amount, 0]
                }
                else {
                    return [(89.98/100 * currValue), amount - (89.98/100 * currValue)]
                }
            }
        }
        if (currValue <= 50000) {
            if (amount <= (89.98/100 * currValue)){
                return [amount, 0]
            }
            else {
                return [(89.98/100 * currValue), amount - (89.98/100 * currValue)]
            }
        }
    }

    openSavingsPlusIntemationDialog(popUpArray: any[], btn1?: string, btn2?: string) {
        let config = new MdDialogConfig();
        let device = this.headerService.deviceType();
        if (device === 'xs' || device === 'sm') {
            config.width = '100%';
        } else {
            config.width = '40%';
        }
        // config.height = '50%';
        config.disableClose = false;
        config.viewContainerRef = this.viewContainerRef;
        let confirmationConfig = {
            funds: popUpArray,
            confirmationActions: [['Y', btn1, 'hollow-cta-36'], ['N', btn2, 'hollow-cta-36']]
        };
        let dialogRef = this.dialog.open(InstaConfirmationDialogComponent, config);
        dialogRef.componentInstance.config = confirmationConfig;
        return dialogRef.afterClosed().map((result) => {
            if (isNullOrUndefined(result)) {
                return false;
            }
            return result[0];
        });
    }

    openFullRedmptionMessageDialog() {
        return this.openDialog("Attention!",
            "Your redemption amount is close to current market value and your order might get cancelled due to market fluctuations. " +
            "To avoid this, go for redemption by units or opt for full redemption",
            "Go for full redemption",
            "Proceed with same amount")
    }

    openDialog(title?: string, message?: string, btn1?: string, btn2?: string) {
        let config = new MdDialogConfig();
        let device = this.headerService.deviceType();
        if (device === 'xs' || device === 'sm') {
            config.width = '100%';
        } else {
            config.width = '40vw';
        }
        config.disableClose = false;
        config.viewContainerRef = this.viewContainerRef;

        let confirmationConfig = {
            confirmationTitle: title,
            confirmationText: message,
            confirmationActions: [['Y', btn1, 'hollow-cta-36'], ['N', btn2, 'hollow-cta-36']]
        };
        let dialogRef = this.dialog.open(ClosableConfirmationDialogComponent, config);
        dialogRef.componentInstance.config = confirmationConfig;
        return dialogRef.afterClosed().map((result) => {
            //this.logger.debug(this.className + result);
            if (isNullOrUndefined(result)) {
                return false;
            }
            return result[0];
            /*if (result[0] === 'Y') {
             return true;
             }
             if (result[0] === 'N') {
             return false;
             }*/
        });
    }

    freezeShake() {
        this.shakeSub = Observable.timer(1000).subscribe(t => {
            this.shake = false;
        });
    }

    ngOnDestroy() {
       if (this.redemptionDataSubscription) {
           this.redemptionDataSubscription.unsubscribe();
       }
    }

}
