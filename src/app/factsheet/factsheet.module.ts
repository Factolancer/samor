import {NgModule} from "@angular/core";
import {AdvancedFactsheetComponent} from "./advanced-factsheet.component";
import {BasicFactsheetComponent} from "./basic-factsheet.component";
import {factsheetRouting} from "./factsheet.routes";
import {SharedModule} from "../shared/shared.module";
import {FactsheetService} from "./factsheet.service";
import {EquityViewComponent} from "./equity-view/equity-view.component";
import {AdvancedFactsheetDataResolveService} from "./advanced-factsheet-data-resolve-service";
import {DebtViewComponent} from "./debt-view/debt-view.component";
import {CartModule} from "../cart/cart.module";
import {RiskometerIconComponent} from "./riskometer-icon.component";

@NgModule({
    imports: [
        SharedModule,
        factsheetRouting,
        CartModule,
    ],
    exports: [BasicFactsheetComponent],
    entryComponents: [BasicFactsheetComponent],
    providers: [FactsheetService, AdvancedFactsheetDataResolveService],
    declarations: [BasicFactsheetComponent, AdvancedFactsheetComponent, EquityViewComponent, DebtViewComponent, RiskometerIconComponent]
})
export class FactsheetModule {
}
