import {Component, OnInit, ViewContainerRef, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Checkout} from "./models/checkout";
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from "@angular/forms";
import {InvestmentModeEnum} from "../enum/investment-mode-enum";
import {NumberValidator} from "../validators/validator";
import {CheckoutService} from "../core/services/checkout.service";
import {MdDialog, MdDialogConfig} from "@angular/material";

import {Fund} from "../models/fund";
import {CartService} from "../core/services/cart.service";
import {Logger} from "../core/logger/logger";
import {LookUpService} from "../core/services/lookup.service";
import {CNDGroup} from "../constants/CNDGroup";
import {CheckoutValidationMessages} from "./checkout-form-validations";
import {ConfirmationDialogComponent} from "../shared/confirmation-dialog.component";
import {CheckoutFund} from "./models/checkout-fund";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";
import {FundOption} from "../models/fund-option";
import {SnackBarService} from "../core/services/snack-bar.service";
import {disclaimers} from "../../properties/discalimers";
import {TitleService} from "../core/services/title.service";
import {AIPData} from "../models/aip-data";
import {forEach} from "@angular/router/src/utils/collection";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {CheckoutBank} from "./models/checkout-bank";
import {CheckoutNominee} from "./models/checkout-nominee";
import {CheckoutLZeroLOne} from "./checkout-l-zero-l-one";
import {HeaderService} from "../core/services/header.service";
import {LOneLZeroDetails} from "./models/l-zero-l-one-details";
import {LZeroLOneComponent} from "./l-zero-l-one/l-zero-l-one.component";
import {LZeroLOneService} from "./l-zero-l-one/l-zero-l-one-service";
import {CheckoutURLAccessGuard} from "../core/guards/checkoutUrlAccess.guard";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.styles.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

    checkoutData: Checkout;
    checkoutFormGroup: FormGroup;
    totalInvestmentAmount: number;
    checkoutFormErrors: any;
    investmentMode = InvestmentModeEnum;
    sipDisclaimerText: string;
    className: string;
    lumpsumLimit: number;
    nomineeExists: boolean;
    shake: boolean;
    shakeSub: Subscription;
    additionalPurchaseExists: boolean;

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
                private checkoutService: CheckoutService, private cartService: CartService,
                private snackBarService: SnackBarService, private viewContainerRef: ViewContainerRef,
                private dialog: MdDialog, private logger: Logger, private lookupService: LookUpService,
                private checkoutUrlAccessGuard: CheckoutURLAccessGuard, private headerService: HeaderService,
                private titleService: TitleService, public lZeroLOneService: LZeroLOneService) {
        //variables initialisation
        this.sipDisclaimerText = `${disclaimers.checkout_sip}`;
        this.checkoutFormErrors = {};
        this.totalInvestmentAmount = 0;
        this.lumpsumLimit = 100000000;
        this.className = "CheckoutComponent";
        this.nomineeExists = false;

    }

    ngOnInit() {
        // this.checkoutData = new Checkout("", [], [], [], new CheckoutBank(1, "", "", "", ""), new CheckoutNominee("", "", ""), 0);
        let routeCheckout: any;
        this.titleService.setTitle("checkout");
        this.logger.debug(this.className, this.checkoutService.previousURL);
        if (this.cartService.previousURL && this.cartService.previousURL.split('/').indexOf("cart") > -1) {
            this.logger.debug(this.className, "From Cart :");
            this.route.data.forEach((data: { dataOfCheckout: Checkout }) => {
                // this.checkoutData = data.dataOfCheckout;
                routeCheckout = data.dataOfCheckout;
                this.logger.debug("ROUTE CHECKOUT DATA", data.dataOfCheckout);
                if (data.dataOfCheckout.fundsData.length == 0) {
                    this.router.navigate(['cart']);
                }
            });
            this.checkoutService.getCheckoutDataSummary().subscribe((savedData) => {
                if (!savedData.isEmpty) {
                    let savedDataNew = {};
                    // let savedDataNew = (<any>Object).assign({}, savedData); //JSON.parse(JSON.stringify(savedData));
                    for (let k in savedData) {
                        savedDataNew[k] = savedData[k]; //JSON.parse(JSON.stringify(savedDataNew[k]));
                    }
                    this.logger.debug("SAVED DATA ", savedData);
                    let idList = [];
                    savedData.fundsData.forEach(fundData => {
                        idList.push(fundData.fund.id);
                    });
                    /*routeCheckout.fundsData.forEach(fundData => {
                     idList.push(fundData.fund.id);
                     });*/

                    routeCheckout.fundsData.forEach((fundData, index) => {
                        if (idList.indexOf(fundData.fund.id) > -1) {
                            this.logger.debug("CHECKOUT DATA FUND From Route ", routeCheckout.fundsData[index]);
                            let fundToCopy = savedData.fundsData.filter(x => x.fund.id === fundData.fund.id)[0];
                            this.logger.debug("FUNDTOCOPY ", fundToCopy);
                            routeCheckout.fundsData[index] = fundToCopy;
                            // this.checkoutData.fundsData[index] = savedData.fundsData.filter(x => x.fund.id === fundData.fund.id)[0]; // (data => data.fund.id === fundData.fund.id)[0]
                        }
                    });
                    this.checkoutData = routeCheckout;
                }
                else {
                    this.checkoutData = routeCheckout;
                }

                this.logger.debug("AFTER CONCAT CHECKOUT IS ", this.checkoutData);
                this.populateNomineeData();
                this.setFormFieldDefaults();
                this.checkOutFormInitialisation();
                this.prepareDisplayDataLists();
                this.logger.debug(this.className, "CHECKOUTFORM ", this.checkoutFormGroup);
            }, error => {
                this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
            });
        } else {
            this.logger.debug(this.className, "Not from Cart :");
            this.checkoutService.getCheckoutDataSummary().subscribe(data => {
                this.checkoutData = data;
                this.logger.debug(this.className, "checkoutData: ", this.checkoutData);
                if (this.checkoutData.fundsData.length == 0) {
                    this.router.navigate(['cart']);
                }
                this.populateNomineeData();
                this.setDefaultNomineeAndBank();
                this.checkOutFormInitialisation();
                this.checkoutData.fundsData.forEach(checkoutFund => this.isProductTagVisible(checkoutFund));
            }, error => {
                this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
            });
        }
    }

    ngOnDestroy() {
        if (this.shakeSub) {
            this.shakeSub.unsubscribe();
        }
    }

    populateNomineeData() {
        if (this.checkoutData.nomineeList && this.checkoutData.nomineeList.length > 0) {
            this.nomineeExists = true;
            this.lookupService.getByGroup(CNDGroup.RELATIONSHIP).subscribe(lookupData => {
                this.checkoutData.nomineeList.forEach(nominee => {
                    lookupData.forEach(relationInfo => {
                        // this.logger.debug("relationInfo", relationInfo);
                        if (relationInfo.cndrfnum == nominee.relation)
                            nominee.relation = relationInfo.cndname;
                    })
                })
            }, error => {
                this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
            });
        }
    }

    prepareDisplayDataLists() {
        this.checkoutData.fundsData.forEach((fundData, index) => {
            let newPlansList = [];
            fundData.options.forEach(fundOption => {
                if (newPlansList.indexOf(fundOption.dividendFrequency + " " + fundOption.schemePlan) < 0) {
                    newPlansList.push(fundOption.dividendFrequency + " " + fundOption.schemePlan);
                }
            });
            fundData.plansList = newPlansList;

            this.prepareOptionsList(fundData, index);
            /*this.logger.debug("prepareOptionsList", index, this.checkoutFormGroup);
             this.prepareSIPFrequencyList(fundData, index);
             this.logger.debug("prepareSIPFrequencyList", index, this.checkoutFormGroup);
             this.prepareSIPDatesList(fundData, index);
             this.logger.debug("prepareSIPDatesList", index, this.checkoutFormGroup);
             this.setInstallmentAndAmountChk(fundData, index);
             this.logger.debug("setInstallmentAndAmountChk", index, this.checkoutFormGroup);*/
        })
    }

    prepareOptionsList(fund: CheckoutFund, fundIndex: number) {
        let planDetails = fund.selectedPlan.split(' ');
        let dividendFrequency = planDetails[0];
        let schemePlan = planDetails[1];
        let options = fund.options.filter(option => {
            if (option.schemePlan == schemePlan && option.dividendFrequency == dividendFrequency) {
                return true;
            } else {
                return false;
            }
        });

        let newOptionsList = [];
        options.forEach(option => newOptionsList.push(option.dividendOption));
        fund.optionsList = newOptionsList;
        let fundsArray = this.checkoutFormGroup.get('fundsData') as FormArray;
        fundsArray.at(fundIndex).get('selectedOption').setValue(newOptionsList[0]);
        this.logger.debug(this.className, " prepareOptionsList ", fund);
        this.prepareSIPFrequencyList(fund, fundIndex);
    }

    prepareSIPFrequencyList(fund: CheckoutFund, fundIndex: number) {

        let planDetails = fund.selectedPlan.split(' ');
        let dividendFrequency = planDetails[0];
        let schemePlan = planDetails[1];
        let dividendOption = fund.selectedOption;
        let options = fund.options.filter(option => {
            if (option.schemePlan == schemePlan
                && option.dividendFrequency == dividendFrequency
                && option.dividendOption == dividendOption) {
                return true;
            } else {
                return false;
            }
        });

        this.logger.debug("prepareSIPFrequencyList", options);
        let option = options[0];
        options.length > 0 ? fund.selectedSoptRfnum = options[0].soptRfnum : fund.selectedSoptRfnum = 0;

        fund.freshAdditionalType = null;
        fund.folioNo = null;
        this.isProductTagVisible(fund);
        if (fund.selectedInvestmentMode == InvestmentModeEnum[InvestmentModeEnum.SIP] && option) {
            let newSIPFrequencyList = [];
            option.aipData.forEach(aipData => {
                if (newSIPFrequencyList.indexOf(aipData.frequency) < 0) {
                    newSIPFrequencyList.push(aipData.frequency)
                }
            });

            fund.sipFrequencyList = newSIPFrequencyList;
            this.prepareSIPDatesList(fund, fundIndex);
        } else {
            this.getSchemeFolioNo(fund.selectedSoptRfnum).subscribe(existingFolioNo => {
                if (!isNullOrUndefined(existingFolioNo) && existingFolioNo.length != 0) {
                    fund.freshAdditionalType = 'A';
                    fund.folioNo = existingFolioNo;
                    fund.amount = option.minAddLumpSum;
                }
                this.checkAdditionalPurchase();
                this.prepareSIPDatesList(fund, fundIndex);
            }, error => {
                this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
            })

        }
        this.logger.debug(this.className, " prepareSIPFrequencyList ", fund);

    }

    isProductTagVisible(checkoutFund: CheckoutFund) {
        let ifFound = false;
        if (checkoutFund.fund.productObj) {
            checkoutFund.fund.productObj.productOptions.forEach(productOption => {
                if (productOption.soptRfnum == checkoutFund.selectedSoptRfnum &&
                    (!productOption.investmentMode || productOption.investmentMode == checkoutFund.selectedInvestmentMode)) {
                    //this.logger.debug("isProductTagVisible:" + checkoutFund.selectedSoptRfnum + ":" + productOption.soptRfnum)
                    //this.logger.debug("isProductTagVisible:" + checkoutFund.selectedInvestmentMode + ":" + productOption.investmentMode)
                    ifFound = true;
                }
            })
        }
        //this.logger.debug("isProductTagVisible:" + ifFound);
        checkoutFund.showProductTag = ifFound;
    }

    getSchemeFolioNo(soptrfnum: number) {
        return this.checkoutService.getSchemeFolioNo(soptrfnum).map(res => {
            let folioNo: string = res['FolioNo'];
            return folioNo;
        })
    }

    prepareSIPDatesList(fund: CheckoutFund, fundIndex: number) {
        if (fund.selectedInvestmentMode == InvestmentModeEnum[InvestmentModeEnum.SIP]) {
            let option: FundOption;
            fund.options.forEach(opt => {
                if (opt.soptRfnum == fund.selectedSoptRfnum) {
                    option = opt;
                }
            });

            let newDatesList = [];
            if (option) {
                option.aipData.forEach(aipData => {
                    if (aipData.frequency == fund.selectedAIPFrequency) {
                        aipData.dates.split('|').forEach(date => newDatesList.push(date));
                    }
                })
            }
            fund.sipDatesList = newDatesList;
            this.logger.debug(this.className, " prepareSIPDatesList ", fund);
        }
        this.setInstallmentAndAmountChk(fund, fundIndex);
    }

    setInstallmentAndAmountChk(fund: CheckoutFund, fundIndex: number) {
        let formFundsArray = this.checkoutFormGroup.get('fundsData') as FormArray;
        this.logger.debug("setInstallmentAndAmountChk", formFundsArray);

        let option: FundOption;
        fund.options.forEach(opt => {
            if (opt.soptRfnum == fund.selectedSoptRfnum) {
                option = opt;
            }
        });

        if (option) {
            if (fund.selectedInvestmentMode == InvestmentModeEnum[InvestmentModeEnum.SIP]) {

                let aipVal: AIPData;
                option.aipData.forEach(aip => {
                    if (aip.frequency == fund.selectedAIPFrequency) {
                        aipVal = aip;
                    }
                });

                if (aipVal) {
                    let formGroup = formFundsArray.controls[fundIndex] as FormGroup;
                    let investmentAmountControl = formGroup.get('investmentAmount');
                    if (!isNullOrUndefined(investmentAmountControl.value)) {
                        investmentAmountControl.clearValidators();
                        investmentAmountControl.setValidators(Validators.compose([NumberValidator.minValue(aipVal.minAmount), NumberValidator.maxValue(aipVal.maxAmount), NumberValidator.isMultipleOf(aipVal.multiplier)]));
                        investmentAmountControl.setValue(aipVal.minAmount);
                        /* > 500 ? aipVal.minAmount : 500*/
                        investmentAmountControl.updateValueAndValidity();
                    }

                    let noOfInstallmentControl = formGroup.get('noOfInstallments') as FormControl;
                    noOfInstallmentControl.clearValidators();
                    noOfInstallmentControl.setValidators(Validators.compose([NumberValidator.minValue(aipVal.minNoOfInstallment), NumberValidator.maxValue(aipVal.maxNoOfInstallment)]))
                    noOfInstallmentControl.setValue(aipVal.minNoOfInstallment);
                    noOfInstallmentControl.updateValueAndValidity();
                }

            } else {
                let formGroup = formFundsArray.controls[fundIndex] as FormGroup;
                let investmentAmountControl = formGroup.get('investmentAmount') as FormControl;
                if (!isNullOrUndefined(investmentAmountControl.value)) {
                    if (!isNullOrUndefined(fund.folioNo) && fund.folioNo.length > 0) {
                        investmentAmountControl.setValue(option.minAddLumpSum);
                    } else {
                        investmentAmountControl.setValue(option.minLumpsum);
                    }
                    investmentAmountControl.clearValidators();
                    if (!isNullOrUndefined(fund.folioNo) && fund.folioNo.length > 0) {
                        investmentAmountControl.setValidators(Validators.compose([NumberValidator.minValue(option.minAddLumpSum), NumberValidator.maxValue(this.lumpsumLimit), , NumberValidator.isMultipleOf(option.minLumpsumMultiplier)]));
                    } else {
                        investmentAmountControl.setValidators(Validators.compose([NumberValidator.minValue(option.minLumpsum), NumberValidator.maxValue(this.lumpsumLimit), NumberValidator.isMultipleOf(option.minLumpsumMultiplier)]));
                    }
                    investmentAmountControl.updateValueAndValidity();
                }
            }
        }
    }

    setFormFieldDefaults() {
        this.logger.debug(this.className, "Setting DEFAULT fields");
        this.logger.debug(this.className, "CHOCKOUT ", this.checkoutData);
        //set fund defaults
        this.checkoutData.fundsData.forEach((fundData, index) => {
            if (isNullOrUndefined(fundData.selectedInvestmentMode)) {
                fundData.selectedInvestmentMode = fundData.fund.investmentMode;
            }

            if (fundData.fund.defaultSopt) {
                fundData.options.forEach(fundOption => {
                    if (fundOption.soptRfnum == fundData.fund.defaultSopt) {
                        fundData.selectedPlan = fundOption.dividendFrequency + " " + fundOption.schemePlan;
                        fundData.selectedOption = fundOption.dividendOption;

                        if (fundData.selectedInvestmentMode == InvestmentModeEnum[InvestmentModeEnum.SIP] && fundOption.sipAllowed) {
                            fundData.selectedAIPFrequency = fundOption.aipData[0].frequency;
                            fundData.noOfInstallment = fundOption.aipData[0].minNoOfInstallment;
                            fundData.amount = fundOption.aipData[0].minAmount;
                        } else {
                            fundData.amount = fundOption.minLumpsum;
                        }
                    }
                })
            } else {
                fundData.options.forEach(fundOption => {
                    if (fundOption.isDefault && isNullOrUndefined(fundData.selectedSoptRfnum)) {
                        fundData.selectedPlan = fundOption.dividendFrequency + " " + fundOption.schemePlan;
                        fundData.selectedOption = fundOption.dividendOption;

                        if (fundData.selectedInvestmentMode == InvestmentModeEnum[InvestmentModeEnum.SIP] && fundOption.sipAllowed) {
                            fundData.selectedAIPFrequency = fundOption.aipData[0].frequency;
                            fundData.noOfInstallment = fundOption.aipData[0].minNoOfInstallment;
                            fundData.amount = fundOption.aipData[0].minAmount;
                        } else {
                            fundData.amount = fundOption.minLumpsum;
                        }
                    }
                })
            }
        });
        //set bank defaults
        this.checkoutData.selectedBank = this.checkoutData.bankList[0];

        //set nominee defaults
        if (this.nomineeExists) {
            this.checkoutData.selectedNominee = this.checkoutData.nomineeList[0];
        }
    }

    setDefaultNomineeAndBank() {
        //set bank defaults
        this.checkoutData.selectedBank = this.checkoutData.bankList[0];

        //set nominee defaults
        if (this.nomineeExists) {
            this.checkoutData.selectedNominee = this.checkoutData.nomineeList[0];
        }
    }


    checkOutFormInitialisation() {
        let fundFormGroupArray = this.fb.array([]);
        let fundFormErrorsArray = [];
        let selectedBank = this.checkoutData.selectedBank;

        let selectedNominee = this.checkoutData.selectedNominee;
        this.totalInvestmentAmount = 0;

        this.checkoutData.fundsData.forEach(fundData => {
            let fund = fundData.fund;

            let selectedOption = fundData.selectedOption;
            let selectedPlan = fundData.selectedPlan;
            let selectedInvestmentMode = fundData.selectedInvestmentMode;
            let amount = fundData.amount;

            this.totalInvestmentAmount += amount;

            if (selectedInvestmentMode == InvestmentModeEnum[InvestmentModeEnum.SIP]) {
                let selectedAIPFrequency = fundData.selectedAIPFrequency;
                let selectedAIPDate = fundData.selectedDeductionDate;
                let noOfInstallments = fundData.noOfInstallment;


                fundFormGroupArray.push(this.fb.group({
                    investmentMode: [selectedInvestmentMode || '', Validators.required],
                    selectedPlan: [selectedPlan || '', Validators.required],
                    selectedOption: [selectedOption || '', Validators.required],
                    selectedAIPFrequency: [selectedAIPFrequency || '', Validators.required],
                    selectedDeductionDate: [selectedAIPDate || '', Validators.required],
                    noOfInstallments: [noOfInstallments || '', Validators.required],
                    investmentAmount: [amount || '', Validators.required],
                }));
                fundFormErrorsArray.push({
                    investmentMode: '',
                    selectedPlan: '',
                    selectedOption: '',
                    selectedAIPFrequency: '',
                    selectedDeductionDate: '',
                    noOfInstallments: '',
                    investmentAmount: '',
                });
            } else {
                fundFormGroupArray.push(this.fb.group({
                    investmentMode: [selectedInvestmentMode || '', Validators.required],
                    selectedPlan: [selectedPlan || '', Validators.required],
                    selectedOption: [selectedOption || '', Validators.required],
                    investmentAmount: [amount || '', Validators.required]
                }));
                fundFormErrorsArray.push({
                    investmentMode: '',
                    selectedPlan: '',
                    selectedOption: '',
                    investmentAmount: ''
                });
            }
        });


        if (this.nomineeExists) {
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
        } else {
            this.checkoutFormGroup = this.fb.group({
                selectedBank: [selectedBank || '', Validators.required],
                fundsData: fundFormGroupArray
            });

            this.checkoutFormErrors = {
                selectedBank: '',
                fundsData: fundFormErrorsArray
            };
        }

        this.checkoutFormGroup.valueChanges
            .subscribe(data => {
                if (!this.checkoutFormGroup) {
                    return;
                } else {
                    this.updateErrorMessages();
                    this.updateModelValues();
                    this.logger.debug(this.className, this.checkoutFormErrors);
                }
            });
    }

    updateErrorMessages() {
        const form = this.checkoutFormGroup;


        //selected Bank Validation
        this.checkoutFormErrors.selectedBank = '';
        let selectedBankControl = form.get('selectedBank');
        if (selectedBankControl && selectedBankControl.dirty && !selectedBankControl.valid) {
            const messages = CheckoutValidationMessages.bank;
            for (const key in selectedBankControl.errors) {
                this.checkoutFormErrors.selectedBank += messages[key] + ' ';
            }
        }

        //selected Nominee Validation
        if (this.nomineeExists) {
            this.checkoutFormErrors.selectedNominee = '';
            let selectedNomineeControl = form.get('selectedNominee');
            if (selectedNomineeControl && selectedNomineeControl.dirty && !selectedNomineeControl.valid) {
                const messages = CheckoutValidationMessages.nominee;
                for (const key in selectedNomineeControl.errors) {
                    this.checkoutFormErrors.selectedNominee += messages[key] + ' ';
                }
            }
        }

        //funds validation
        let formFundsArray = form.get('fundsData') as FormArray;
        this.checkoutFormErrors['fundsData'].forEach((fund, index) => {

            //selected investmentMode
            fund.investmentMode = '';
            let investmentModeControl = formFundsArray.at(index).get('investmentMode');
            if (investmentModeControl && investmentModeControl.dirty && !investmentModeControl.valid) {
                const messages = CheckoutValidationMessages.plan;
                for (const key in investmentModeControl.errors) {
                    fund.investmentMode += messages[key] + ' ';
                }
            }

            //selected plan
            fund.selectedPlan = '';
            let planControl = formFundsArray.at(index).get('selectedPlan');
            if (planControl && planControl.dirty && !planControl.valid) {
                const messages = CheckoutValidationMessages.plan;
                for (const key in planControl.errors) {
                    fund.selectedPlan += messages[key] + ' ';
                }
            }

            //selected option
            fund.selectedOption = '';
            let optionControl = formFundsArray.at(index).get('selectedOption');
            if (optionControl && optionControl.dirty && !optionControl.valid) {
                const messages = CheckoutValidationMessages.option;
                for (const key in optionControl.errors) {
                    fund.selectedOption += messages[key] + ' ';
                }
            }


            //selected AIP Frequency
            fund.selectedAIPFrequency = '';
            let aipFrequencyControl = formFundsArray.at(index).get('selectedAIPFrequency');
            if (aipFrequencyControl && aipFrequencyControl.dirty && !aipFrequencyControl.valid) {
                const messages = CheckoutValidationMessages.aipFrequency;
                for (const key in aipFrequencyControl.errors) {
                    fund.selectedAIPFrequency += messages[key] + ' ';
                }
            }

            //selected AIP Date
            fund.selectedDeductionDate = '';
            let aipDateControl = formFundsArray.at(index).get('selectedDeductionDate');
            if (aipDateControl && aipDateControl.dirty && !aipDateControl.valid) {
                const messages = CheckoutValidationMessages.aipDate;
                for (const key in aipDateControl.errors) {
                    fund.selectedDeductionDate += messages[key] + ' ';
                }
            }

            //selected no of installments
            fund.noOfInstallments = '';
            let noOfInstallmentsControl = formFundsArray.at(index).get('noOfInstallments');
            if (noOfInstallmentsControl && noOfInstallmentsControl.dirty && !noOfInstallmentsControl.valid) {
                const messages = CheckoutValidationMessages.installments;
                for (const key in noOfInstallmentsControl.errors) {
                    switch (key) {
                        case "minValue":
                            fund.noOfInstallments += messages[key] + noOfInstallmentsControl.errors[key].requiredValue + ', ';
                            break;
                        case "maxValue":
                            fund.noOfInstallments += messages[key] + noOfInstallmentsControl.errors[key].requiredValue + ', ';
                            break;
                        default:
                            fund.noOfInstallments += messages[key] + ' ';
                            break;
                    }


                }
            }

            //selected investmentAmount
            fund.investmentAmount = '';
            let investmentAmountControl = formFundsArray.at(index).get('investmentAmount');
            if (investmentAmountControl && investmentAmountControl.dirty && !investmentAmountControl.valid) {
                const messages = CheckoutValidationMessages.investmentAmount;
                this.logger.debug(this.className, investmentAmountControl.errors);
                for (const key in investmentAmountControl.errors) {
                    switch (key) {
                        case "minValue":
                            fund.investmentAmount += messages[key] + investmentAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "maxValue":
                            fund.investmentAmount += messages[key] + investmentAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "isMultiple":
                            fund.investmentAmount += messages[key] + investmentAmountControl.errors[key].multipleVal + ' ';
                            break;
                        default:
                            fund.investmentAmount += messages[key] + ' ';
                            break;
                    }
                }
            }
        });
    }

    updateModelValues() {
        const form = this.checkoutFormGroup;
        this.totalInvestmentAmount = 0;
        let formFundsArray = form.get('fundsData') as FormArray;

        formFundsArray.controls.forEach((formGroup, index) => {
            this.logger.debug(this.className, "formFundsArray: ", formGroup);
            this.logger.debug(this.className, formGroup.get('investmentAmount').value);
            //updating total investment amount
            this.totalInvestmentAmount += +formGroup.get('investmentAmount').value;

            this.checkoutData.fundsData[index].selectedInvestmentMode = formGroup.get('investmentMode').value;
            this.checkoutData.fundsData[index].selectedPlan = formGroup.get('selectedPlan').value;
            this.checkoutData.fundsData[index].selectedOption = formGroup.get('selectedOption').value;
            if (formGroup.get('investmentMode').value == InvestmentModeEnum[InvestmentModeEnum.SIP]) {
                this.logger.debug(this.className, formGroup.get('investmentMode').value);
                this.checkoutData.fundsData[index].selectedAIPFrequency = formGroup.get('selectedAIPFrequency').value;
                this.checkoutData.fundsData[index].selectedDeductionDate = formGroup.get('selectedDeductionDate').value;
                this.checkoutData.fundsData[index].noOfInstallment = formGroup.get('noOfInstallments').value;
            }
            this.checkoutData.fundsData[index].amount = formGroup.get('investmentAmount').value;
        });


        this.checkoutData.selectedBank = form.get('selectedBank').value;
        if (this.nomineeExists) {
            this.checkoutData.selectedNominee = form.get('selectedNominee').value;
        }
        this.checkoutData.totalInvestmentAmount = this.totalInvestmentAmount;
        this.logger.debug(this.className, "CheckoutData ", this.checkoutData);
    }


    //triggered when the user wants to change the investment mode.
    investmentModeChangeTrigger(fund: CheckoutFund, index: number) {
        //console.log("open");
        let fundsArray = this.checkoutFormGroup.get("fundsData") as FormArray;
        let fundGroup = fundsArray.at(index) as FormGroup;

        //add only if the current investment mode is SIP
        if (fundGroup.get("investmentMode").value == InvestmentModeEnum[InvestmentModeEnum.LUMPSUM]) {
            fundGroup.addControl("selectedAIPFrequency", new FormControl('', [Validators.required]))
            fundGroup.addControl("selectedDeductionDate", new FormControl('', [Validators.required]));
            fundGroup.addControl("noOfInstallments", new FormControl('', [Validators.required]));
            //this.prepareSIPFrequencyList(fund, index);
            //this.prepareSIPDatesList(fund, index);
            //this.setInstallmentAndAmountChk(fund, index);
        }
    }

    checkAdditionalPurchase() {
        let additionalPurchaseExists = false;
        for (let fund of this.checkoutData.fundsData) {
            if (!isNullOrUndefined(fund.folioNo) && fund.folioNo.length > 0) {
                additionalPurchaseExists = true;
            }
        }
        this.additionalPurchaseExists = additionalPurchaseExists;
    }

    investmentModeUpdate(checkoutFund: CheckoutFund, index: number) {

        let fund = checkoutFund.fund;
        //console.log("close");
        let fundFoundCount = 0;
        let fundsArray = this.checkoutFormGroup.get("fundsData") as FormArray;
        let fundGroup = fundsArray.at(index) as FormGroup;

        //checking if duplicate created due to change of investment mode
        fundsArray.controls.forEach((item, idx) => {
            if (this.checkoutData.fundsData[idx].fund.id == fund.id &&
                item.get("investmentMode").value == fundGroup.get("investmentMode").value) {
                fundFoundCount++;
            }
        });

        //if duplication found then asking user for confirmation on removal
        if (fundFoundCount > 1) {
            let config = new MdDialogConfig();
            config.width = "300px";
            config.disableClose = true;
            config.viewContainerRef = this.viewContainerRef;

            let confirmationConfig = {
                confirmationTitle: "Please Confirm!",
                confirmationText: "Two funds cannot have same investment modes, do you want to remove this fund?",
                confirmationActions: [['Y', "Yes"], ['N', "No"]]

            }

            let dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
            dialogRef.componentInstance.config = confirmationConfig;
            dialogRef.afterClosed().subscribe(result => {

                //user agrees to remove duplicate fund
                if (result[0] == 'Y') {
                    this.logger.debug(this.className, "yes");
                    this.removeFund(fund, index);
                } else {  //user disagrees to remove the fund then we need to revert back to same state.
                    this.logger.debug(this.className, "no");
                    //toggle back the investment mode
                    if (fundGroup.get("investmentMode").value == InvestmentModeEnum[InvestmentModeEnum.SIP]) {
                        fundGroup.setControl("investmentMode", new FormControl(InvestmentModeEnum[InvestmentModeEnum.LUMPSUM], [Validators.required]));
                        fundGroup.removeControl("selectedAIPFrequency");
                        fundGroup.removeControl("selectedDeductionDate");
                        fundGroup.removeControl("noOfInstallments");
                    } else {
                        fundGroup.setControl("investmentMode", new FormControl(InvestmentModeEnum[InvestmentModeEnum.SIP], [Validators.required]));
                    }

                }
            });
        } else {
            //if no duplication found and the investment mode is lumpsum then we need to remove the added controls.
            if (fundGroup.get("investmentMode").value == InvestmentModeEnum[InvestmentModeEnum.LUMPSUM]) {
                fundGroup.removeControl("selectedAIPFrequency");
                fundGroup.removeControl("selectedDeductionDate");
                fundGroup.removeControl("noOfInstallments");
            }
        }

        //set investment Amount checks as per final state of of object
        //this.prepareDisplayDataLists();
        this.prepareOptionsList(checkoutFund, index);
        /*if(fundGroup.get("investmentMode").value == InvestmentModeEnum[InvestmentModeEnum.SIP]){
         this.prepareSIPFrequencyList(checkoutFund, index);
         this.prepareSIPDatesList(checkoutFund, index);
         }
         this.setInstallmentAndAmountChk(checkoutFund, index);*/
        /*if (fundGroup.get("investmentMode").value == InvestmentModeEnum[InvestmentModeEnum.LUMPSUM]) {
         fundGroup.setControl("investmentAmount", new FormControl(fund.basicFactsheet.minLumpsum, [Validators.required, fund.basicFactsheet.]));
         fundGroup.get("").setValue(fund.basicFactsheet.minLumpsum);
         fundGroup.get("investmentAmount").clearValidators();

         } else if (fundGroup.get("investmentMode").value == InvestmentModeEnum[InvestmentModeEnum.SIP]) {

         }*/
    }

    removeFund(removalFund: Fund, fundIndex: number) {

        //console.log("fund removal started!");
        let removeFundObservable = this.cartService.removeFundFromCart([removalFund], false);
        if (removeFundObservable != null) {
            removeFundObservable.subscribe(res => {
                    if (res['success']) {
                        this.checkoutData.fundsData = this.checkoutData.fundsData.filter((fundData, index) => index != fundIndex);
                        this.checkoutFormErrors['fundsData'] = this.checkoutFormErrors['fundsData'].filter((fund, index) => index != fundIndex);
                        let newFundsData = this.fb.array([]);
                        let currentFormArray = this.checkoutFormGroup.get('fundsData') as FormArray;
                        let slicedFormGroups = currentFormArray.controls.filter((formGroup, index) => index != fundIndex);
                        slicedFormGroups.forEach(grp => newFundsData.push(grp));
                        if (newFundsData.length == 0) {
                            // all funds deleted case redirecting to cart
                            this.router.navigate(['cart']);
                        } else {
                            this.checkoutFormGroup.setControl("fundsData", newFundsData);
                            this.snackBarService.showSnackBar("Fund successfully removed!", "Okay", this.viewContainerRef);
                        }

                    } else if (res['message']) {
                        this.snackBarService.showSnackBar(res['message'], "Okay", this.viewContainerRef);
                    }
                }
            )
        }

        //console.log("fund removal ended!");
    }

    onCheckoutSubmit() {
        if (this.checkoutFormGroup.valid) {
            this.checkoutUrlAccessGuard.allow = true;
            this.updateModelValues();
            this.checkoutService.checkoutData = this.checkoutData;
            //let summaryData = this.checkoutService.prepareSummary("");
            /*this.checkoutService.checkLZeroLOne(summaryData).subscribe(data => {
             let lZeroLOneDetailsFunds = data['lZeroLOneList'] as CheckoutLZeroLOne[];
             let isLOneLZeroOrderPresent = this.checkLZeroLOne(lZeroLOneDetailsFunds)
             if(isLOneLZeroOrderPresent){
             let bseBankDetails = this.checkoutService.checkoutData.bseBankDetails;
             this.lZeroLOneService.setlOneLZeroDetais(lZeroLOneDetailsFunds,bseBankDetails);
             let config = this.getLZeroLOneConfig();
             let lZeroLOneDialogRef = this.dialog.open(LZeroLOneComponent, config);
             lZeroLOneDialogRef.afterClosed().subscribe(value =>{
             this.navigateToSummary();
             })
             } else{*/
            this.navigateToSummary();
            /*}

             })*/

        } else {
            this.shake = true;
            this.freezeShake();
            this.logger.debug(this.className, "CheckoutFromGroup: ", this.checkoutFormGroup);
            this.showErrorOnSubmit();
            this.snackBarService.showSnackBar(" Please specify the details to proceed to checkout!", "Okay", this.viewContainerRef);
        }
    }

    freezeShake() {
        this.shakeSub = Observable.timer(1000).subscribe(t => {
            this.shake = false;
        });
    }

    navigateToSummary() {
        this.checkoutService.postCheckoutData().subscribe(data => {
            if (data && !data['success']) {
                this.snackBarService.showSnackBar("Please try again later.", "Okay", this.viewContainerRef);
            }
        }, error => {
            this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
        });
        this.router.navigate(['summary'], {relativeTo: this.route.parent});
    }

    checkLZeroLOne(checkoutLZeroLOneFunds: CheckoutLZeroLOne[]) {
        for (let fund of checkoutLZeroLOneFunds) {
            if ((!isNullOrUndefined(fund.isLOne) && fund.isLOne) || (!isNullOrUndefined(fund.isLZero) && fund.isLZero)) {
                return true;
            }
        }
        return false;
    }

    getLZeroLOneConfig() {

        let config = new MdDialogConfig();
        config.role = 'dialog';
        let device = this.headerService.deviceType();
        if (device == 'xs' || device == 'sm') {
            config.width = '100%';
        } else {
            config.width = '40%';
        }
        config.viewContainerRef = this.viewContainerRef;
        return config;
    }

    showErrorOnSubmit() {

        const form = this.checkoutFormGroup;


        //selected Bank Validation
        this.checkoutFormErrors.selectedBank = '';
        let selectedBankControl = form.get('selectedBank');
        if (selectedBankControl && !selectedBankControl.valid) {
            const messages = CheckoutValidationMessages.bank
            for (const key in selectedBankControl.errors) {
                this.checkoutFormErrors.selectedBank += messages[key] + ' ';
            }
        }

        //selected Nominee Validation
        if (this.nomineeExists) {
            this.checkoutFormErrors.selectedNominee = '';
            let selectedNomineeControl = form.get('selectedNominee');
            if (selectedNomineeControl && !selectedNomineeControl.valid) {
                const messages = CheckoutValidationMessages.nominee
                for (const key in selectedNomineeControl.errors) {
                    this.checkoutFormErrors.selectedNominee += messages[key] + ' ';
                }
            }
        }

        //funds validation
        let formFundsArray = form.get('fundsData') as FormArray;
        this.checkoutFormErrors['fundsData'].forEach((fund, index) => {

            //selected investmentMode
            fund.investmentMode = '';
            let investmentModeControl = formFundsArray.at(index).get('investmentMode');
            if (investmentModeControl && !investmentModeControl.valid) {
                const messages = CheckoutValidationMessages.plan;
                for (const key in investmentModeControl.errors) {
                    fund.investmentMode += messages[key] + ' ';
                }
            }

            //selected plan
            fund.selectedPlan = '';
            let planControl = formFundsArray.at(index).get('selectedPlan');
            if (planControl && !planControl.valid) {
                const messages = CheckoutValidationMessages.plan;
                for (const key in planControl.errors) {
                    fund.selectedPlan += messages[key] + ' ';
                }
            }

            //selected option
            fund.selectedOption = '';
            let optionControl = formFundsArray.at(index).get('selectedOption');
            if (optionControl && !optionControl.valid) {
                const messages = CheckoutValidationMessages.option;
                for (const key in optionControl.errors) {
                    fund.selectedOption += messages[key] + ' ';
                }
            }


            //selected AIP Frequency
            fund.selectedAIPFrequency = '';
            let aipFrequencyControl = formFundsArray.at(index).get('selectedAIPFrequency');
            if (aipFrequencyControl && !aipFrequencyControl.valid) {
                const messages = CheckoutValidationMessages.aipFrequency;
                for (const key in aipFrequencyControl.errors) {
                    fund.selectedAIPFrequency += messages[key] + ' ';
                }
            }

            //selected AIP Date
            fund.selectedDeductionDate = '';
            let aipDateControl = formFundsArray.at(index).get('selectedDeductionDate');
            if (aipDateControl && !aipDateControl.valid) {
                const messages = CheckoutValidationMessages.aipDate;
                for (const key in aipDateControl.errors) {
                    fund.selectedDeductionDate += messages[key] + ' ';
                }
            }

            //selected no of installments
            fund.noOfInstallments = '';
            let noOfInstallmentsControl = formFundsArray.at(index).get('noOfInstallments');
            if (noOfInstallmentsControl && !noOfInstallmentsControl.valid) {
                const messages = CheckoutValidationMessages.installments;
                for (const key in noOfInstallmentsControl.errors) {
                    switch (key) {
                        case "minValue":
                            fund.noOfInstallments += messages[key] + noOfInstallmentsControl.errors[key].requiredValue + ' ';
                            break;
                        case "maxValue":
                            fund.noOfInstallments += messages[key] + noOfInstallmentsControl.errors[key].requiredValue + ' ';
                            break;
                        default:
                            fund.noOfInstallments += messages[key] + ' ';
                            break;
                    }


                }
            }

            //selected investmentAmount
            fund.investmentAmount = '';
            let investmentAmountControl = formFundsArray.at(index).get('investmentAmount');
            if (investmentAmountControl && !investmentAmountControl.valid) {
                const messages = CheckoutValidationMessages.investmentAmount
                this.logger.debug(this.className, investmentAmountControl.errors);
                for (const key in investmentAmountControl.errors) {
                    switch (key) {
                        case "minValue":
                            fund.investmentAmount += messages[key] + investmentAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "maxValue":
                            fund.investmentAmount += messages[key] + investmentAmountControl.errors[key].requiredValue + ' ';
                            break;
                        case "isMultiple":
                            fund.investmentAmount += messages[key] + investmentAmountControl.errors[key].multipleVal + ' ';
                            break;
                        default:
                            fund.investmentAmount += messages[key] + ' ';
                            break;
                    }
                }
            }
        });
    }
}