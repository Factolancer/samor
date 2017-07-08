import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {disclaimers} from "../../../properties/discalimers";
import {TitleService} from "../../core/services/title.service";
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";
import {Logger} from "../../core/logger/logger";
import {NumberValidator} from "../../validators/validator";
import {TaxCalcValidationMessages} from "./tax-calc-validations";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {DialogService} from "../../core/services/dialog.service";
import {PlatformLocation} from "@angular/common";
import {TaxCalcService} from "./tax-calc.service";

@Component({
    selector: 'app-tax-calc',
    templateUrl: './tax-calc-results.component.html',
    styleUrls: ['./tax-calc.styles.scss']
})
export class TaxCalcResultsComponent implements OnInit {

    investmentOpportunity = 0;
    currentInvestment = 0;
    taxSaved = 0;
    completeTherm = 0;
    remainingTherm = 100;

    constructor(private viewContainerRef: ViewContainerRef, private titleService: TitleService,
                private logger: Logger, private dialogService: DialogService, private platformLocation: PlatformLocation,
                private taxCalcService: TaxCalcService) {
    }

    ngOnInit() {
        this.titleService.setTitle("tax_calculator");
        this.titleService.setMetaTags("tax_calculator");

        this.currentInvestment = this.taxCalcService.currentInv;
        this.investmentOpportunity = this.taxCalcService.invOpportunity;
        this.completeTherm = this.taxCalcService.completeTherm;
        this.remainingTherm = this.taxCalcService.remainingTherm;
        this.taxSaved = this.taxCalcService.taxSaved;
    }


    back() {
        this.platformLocation.back();
    }


    seeDisclaimers() {
        let disclaimerText: string[] = [`${disclaimers.calculator_1}`, `${disclaimers.calculator_2}`,
            `${disclaimers.calculator_3}`, `${disclaimers.calculator_4}`]
        this.dialogService.showDisclaimers(disclaimerText, this.viewContainerRef);
    }


}