import {NgModule} from "@angular/core";
import {TaxComponent} from "./tax.component";
import {SharedModule} from "../shared/shared.module";
import {taxRouting} from "./tax.routes";
import {TaxSaverComponent} from "./tax-saver/tax-saver.component";
import {TaxService} from "./tax.service";
import {TaxSaverFundResolveService} from "./tax-saver/tax-saver-fund-resolve.service";
import {TaxSaverCardComponent} from "./tax-saver/tax-saver-card.component";
import {TaxCalcComponent} from "./tax-calc/tax-calc.component";

@NgModule({
    imports: [
        SharedModule,
        taxRouting,
    ],
    providers: [ TaxService, TaxSaverFundResolveService],
    declarations: [TaxComponent, TaxSaverComponent, TaxSaverCardComponent],
})
export class TaxModule {
}
