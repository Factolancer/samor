import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {disclaimers} from "../../../properties/discalimers";
import {TitleService} from "../../core/services/title.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Logger} from "../../core/logger/logger";
import {NumberValidator} from "../../validators/validator";
import {TaxCalcValidationMessages} from "./tax-calc-validations";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {DialogService} from "../../core/services/dialog.service";
import {URLAccessGuard} from "../../core/guards/urlAccess.guard";
import {ActivatedRoute, Router} from "@angular/router";
import {TaxCalcService} from "./tax-calc.service";

@Component({
    selector: 'app-tax-calc',
    templateUrl: './tax-calc.component.html',
    styleUrls: ['./tax-calc.styles.scss']
})
export class TaxCalcComponent implements OnInit {

    investmentOpportunity = 0;
    currentInvestment = 0;
    taxSaved = 0;
    completeTherm = 0;
    remainingTherm = 100;

    fieldsMax = 10000000; //1 crore
    salaryMax = 1000000000; //100 crore

    calcFormGroup: FormGroup;
    calcFormErrors: any;

    //display variables
    showAll = false;

    constructor(private viewContainerRef: ViewContainerRef, private titleService: TitleService,
                private fb: FormBuilder, private logger: Logger, private snackBarService: SnackBarService,
                private dialogService: DialogService, private urlAccessGuard: URLAccessGuard,
                private router: Router, private route: ActivatedRoute, private taxCalcService: TaxCalcService) {
    }

    ngOnInit() {
        this.titleService.setTitle("tax_calculator");
        this.titleService.setMetaTags("tax_calculator");
        this.calcFormInitialisation();
    }

    calcFormInitialisation() {

        this.logger.debug("TaxCalcComponent", "Initializing form!");

        this.calcFormGroup = this.fb.group({
            elssAmt: [0, Validators.compose([NumberValidator.minValue(0), NumberValidator.maxValue(this.fieldsMax)])],
            pfAmt: [0, Validators.compose([NumberValidator.minValue(0), NumberValidator.maxValue(this.fieldsMax)])],
            lifeInsuranceAmt: [0, Validators.compose([NumberValidator.minValue(0), NumberValidator.maxValue(this.fieldsMax)])],
            fdAmt: [0, Validators.compose([NumberValidator.minValue(0), NumberValidator.maxValue(this.fieldsMax)])],
            nscAmt: [0, Validators.compose([NumberValidator.minValue(0), NumberValidator.maxValue(this.fieldsMax)])],
            scssAmt: [0, Validators.compose([NumberValidator.minValue(0), NumberValidator.maxValue(this.fieldsMax)])],
            sukanyaAmt: [0, Validators.compose([NumberValidator.minValue(0), NumberValidator.maxValue(this.fieldsMax)])],
            ulipAmt: [0, Validators.compose([NumberValidator.minValue(0), NumberValidator.maxValue(this.fieldsMax)])],
            annualSalary: [0, Validators.compose([NumberValidator.minValue(0), NumberValidator.maxValue(this.salaryMax), Validators.required])],
        });

        this.calcFormErrors = {
            elssAmt: '',
            pfAmt: '',
            lifeInsuranceAmt: '',
            fdAmt: '',
            nscAmt: '',
            scssAmt: '',
            sukanyaAmt: '',
            ulipAmt: '',
            annualSalary: ''
        };

        this.calcFormGroup.valueChanges
            .subscribe(data => {
                if (!this.calcFormGroup) {
                    return;
                } else {
                    this.updateErrorMessages();
                }
            });
    }

    updateErrorMessages() {
        const form = this.calcFormGroup;


        //ELSS Amount Validation
        this.calcFormErrors.elssAmt = '';
        let elssControl = form.get('elssAmt') as FormControl;
        if (elssControl && elssControl.dirty && !elssControl.valid) {
            const messages = TaxCalcValidationMessages.fields
            for (const key in elssControl.errors) {
                this.calcFormErrors.elssAmt += this.prepareErrorMessage(messages, elssControl, key)
            }
        }

        //pfAmt Amount Validation
        this.calcFormErrors.pfAmt = '';
        let pfControl = form.get('pfAmt') as FormControl;
        if (pfControl && pfControl.dirty && !pfControl.valid) {
            const messages = TaxCalcValidationMessages.fields
            for (const key in pfControl.errors) {
                this.calcFormErrors.pfAmt += this.prepareErrorMessage(messages, pfControl, key)
            }
        }

        //lifeInsuranceAmt Amount Validation
        this.calcFormErrors.lifeInsuranceAmt = '';
        let lifeInsuranceControl = form.get('lifeInsuranceAmt') as FormControl;
        if (lifeInsuranceControl && lifeInsuranceControl.dirty && !lifeInsuranceControl.valid) {
            const messages = TaxCalcValidationMessages.fields
            for (const key in lifeInsuranceControl.errors) {
                this.calcFormErrors.lifeInsuranceAmt += this.prepareErrorMessage(messages, lifeInsuranceControl, key)
            }
        }

        //fdAmt Amount Validation
        this.calcFormErrors.fdAmt = '';
        let fdControl = form.get('fdAmt') as FormControl;
        if (fdControl && fdControl.dirty && !fdControl.valid) {
            const messages = TaxCalcValidationMessages.fields
            for (const key in fdControl.errors) {
                this.calcFormErrors.fdAmt += this.prepareErrorMessage(messages, fdControl, key)
            }
        }
        //nscAmt Amount Validation
        this.calcFormErrors.nscAmt = '';
        let nscControl = form.get('nscAmt') as FormControl;
        if (nscControl && nscControl.dirty && !nscControl.valid) {
            const messages = TaxCalcValidationMessages.fields
            for (const key in nscControl.errors) {
                this.calcFormErrors.nscAmt += this.prepareErrorMessage(messages, nscControl, key)
            }
        }

        //scssAmt Amount Validation
        this.calcFormErrors.scssAmt = '';
        let scssControl = form.get('scssAmt') as FormControl;
        if (scssControl && scssControl.dirty && !scssControl.valid) {
            const messages = TaxCalcValidationMessages.fields
            for (const key in scssControl.errors) {
                this.calcFormErrors.scssAmt += this.prepareErrorMessage(messages, scssControl, key)
            }
        }


        //sukanyaAmt Amount Validation
        this.calcFormErrors.sukanyaAmt = '';
        let sukanyaControl = form.get('sukanyaAmt') as FormControl;
        if (sukanyaControl && sukanyaControl.dirty && !sukanyaControl.valid) {
            const messages = TaxCalcValidationMessages.fields
            for (const key in sukanyaControl.errors) {
                this.calcFormErrors.sukanyaAmt += this.prepareErrorMessage(messages, sukanyaControl, key)
            }
        }


        //ulipAmt Amount Validation
        this.calcFormErrors.ulipAmt = '';
        let ulipControl = form.get('ulipAmt') as FormControl;
        if (ulipControl && ulipControl.dirty && !ulipControl.valid) {
            const messages = TaxCalcValidationMessages.fields
            for (const key in ulipControl.errors) {
                this.calcFormErrors.ulipAmt += this.prepareErrorMessage(messages, ulipControl, key)
            }
        }


        //annualSalary Amount Validation
        this.calcFormErrors.annualSalary = '';
        let salaryControl = form.get('annualSalary') as FormControl;
        if (salaryControl && salaryControl.dirty && !salaryControl.valid) {
            const messages = TaxCalcValidationMessages.annualSalary
            for (const key in salaryControl.errors) {
                switch (key) {
                    case "minValue":
                        this.calcFormErrors.annualSalary += messages[key] + ' ';
                        break;
                    default:
                        this.calcFormErrors.annualSalary += this.prepareErrorMessage(messages, salaryControl, key);
                        break;
                }
            }
        }

        this.currentInvestment = +elssControl.value + +pfControl.value + +lifeInsuranceControl.value + +fdControl.value + +nscControl.value +
            +scssControl.value + +sukanyaControl.value + +ulipControl.value;

        this.logger.debug("Current investments from message update api:" + this.currentInvestment);
        if (this.currentInvestment < 0) {
            this.currentInvestment = 0;
        }

    }

    prepareErrorMessage(messages: any, control: FormControl, key: string) {
        switch (key) {
            case "minValue":
                return messages[key] + control.errors[key].requiredValue + ' ';
            case "maxValue":
                return messages[key] + control.errors[key].requiredValue + ' ';
            default:
                return messages[key] + ' ';
        }
    }

    taxCalcSubmit() {

        let annualSalary = this.calcFormGroup.get('annualSalary').value;

        if (this.calcFormGroup.valid) {
            if (+annualSalary <= 250000) {
                this.taxSaved = 0;
                this.investmentOpportunity = 0;
                if (+annualSalary == 0) {
                    this.snackBarService.showSnackBar(TaxCalcValidationMessages.annualSalary.empty, "CLOSE", this.viewContainerRef);
                } else {
                    this.snackBarService.showSnackBar(TaxCalcValidationMessages.annualSalary.nonTaxablePre + annualSalary + TaxCalcValidationMessages.annualSalary.nonTaxablePost, "CLOSE", this.viewContainerRef);
                }
            }
            else if (this.currentInvestment >= 150000) {
                this.taxSaved = 0;
                this.investmentOpportunity = 0;
                this.showResultsPage();
            } else {
                this.investmentOpportunity = 150000 - this.currentInvestment;
                if (+annualSalary > 1000000) {
                    this.taxSaved = this.investmentOpportunity * 30 / 100;
                } else if (+annualSalary > 500000) {
                    this.taxSaved = this.investmentOpportunity * 20 / 100;
                } else if (+annualSalary > 250000) {
                    this.taxSaved = this.investmentOpportunity * 10 / 100;
                }
                this.showResultsPage();
            }
        } else {
            this.snackBarService.showSnackBar("Please enter valid values", "Okay", this.viewContainerRef);
        }
    }

    thermometer() {
        if (this.currentInvestment >= 150000) {
            this.completeTherm = 100;
            this.remainingTherm = 0;
        } else {
            this.completeTherm = this.currentInvestment / 1500;
            this.remainingTherm = (150000 - this.currentInvestment) / 1500;
        }

    }

    showResultsPage() {
        this.taxCalcService.setResultValues(this.currentInvestment, this.investmentOpportunity, this.completeTherm,
            this.remainingTherm, this.taxSaved);
        this.urlAccessGuard.allow = true;
        this.router.navigate(['results'], {relativeTo: this.route})
    }

    seeDisclaimers() {
        let disclaimerText: string[] = [`${disclaimers.calculator_1}`, `${disclaimers.calculator_2}`,
            `${disclaimers.calculator_3}`, `${disclaimers.calculator_4}`]
        this.dialogService.showDisclaimers(disclaimerText, this.viewContainerRef);
    }


}