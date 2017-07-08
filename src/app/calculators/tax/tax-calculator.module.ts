import {NgModule} from "@angular/core";
import {TaxCalcComponent} from "./tax-calc.component";
import {taxCalculatorRouting} from "./tax-calculator.routes";
import {SharedModule} from "../../shared/shared.module";
import {TaxCalcResultsComponent} from "./tax-calc-results.component";
import {TaxCalcService} from "./tax-calc.service";


@NgModule({
    imports: [
        SharedModule,
        taxCalculatorRouting
    ],
    providers: [TaxCalcService],
    declarations: [TaxCalcComponent, TaxCalcResultsComponent],
})

export class TaxCalculatorModule {
}
