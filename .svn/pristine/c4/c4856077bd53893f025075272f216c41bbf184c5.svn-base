import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {dashboardRouting} from "./dashboard.routes";
import {DashboardComponent} from "./dashboard.component";
import {ChartComponent} from "./chart/chart.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {NavigationPanelComponent} from "./navigation-panel/navigation-panel.component";
import {TopPerformerComponent} from "./top-performer/top-performer.component";
import {DashboardDataService} from "../core/services/dashboard-data.service";
import {ProductModule} from "../product/product.module";
import {ChartModule} from "angular2-highcharts";
import {HighchartsStatic} from "angular2-highcharts/dist/HighchartsService";
import {ChartOptions} from "./chart/chart-options";

export function highChartsFactory() {
    var hc = require('highcharts');
    var hc3d = require('highcharts/highcharts-3d');
    var hcExporting = require('highcharts/modules/exporting');
    hc3d(hc);
    hcExporting(hc);
    return hc;
}

@NgModule({
    imports: [
        SharedModule,
        ProductModule,
        dashboardRouting,
        ChartModule
    ],
    declarations: [DashboardComponent, ChartComponent, TransactionComponent, TopPerformerComponent, NavigationPanelComponent],
    entryComponents: [ChartComponent, TransactionComponent, NavigationPanelComponent],
    providers: [ChartOptions, {provide: HighchartsStatic, useFactory: highChartsFactory}],
    exports: [ChartComponent]
})
export class DashboardModule {
}
