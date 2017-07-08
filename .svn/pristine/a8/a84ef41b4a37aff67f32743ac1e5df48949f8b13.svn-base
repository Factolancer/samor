import {NgModule} from "@angular/core";
import {portfolioReportRouting} from "./report.routes";
import {CapitalGainsReportComponent} from "./capital-gains-report/capital-gains-report.component";
import {SharedModule} from "../shared/shared.module";
import {AssetAllocationComponent} from "./asset-allocation/asset-allocation.component";
import {IrrReportComponent} from "./irr-report/irr-report.component";
import {TransactionReportComponent} from "./transaction-report/transaction-report.component";
import {ReportComponent} from "./report.component";
import {HoldingReportComponent} from "./holding-report/holding-report.component";
import {ReportService} from "./report.service";
import {TransactionReportService} from "./transaction-report/transaction-report.service";
import {SummaryReportComponent} from "./summary-report/summary-report.component";
import {PdfReportService} from "./pdf-report.service";
import {CapitalGainsReportService} from "./capital-gains-report/capital-gains-report.service";
import {SummaryReportService} from "./summary-report/summary-report.service";
import {AssetAllocationService} from "./asset-allocation/asset-allocation.service";
import {DashboardModule} from "../dashboard/dashboard.module";
import {ChartModule} from "angular2-highcharts";
import {HighchartsStatic} from "angular2-highcharts/dist/HighchartsService";
import {RedemptionService} from "../core/services/redemption.service";
import {DateAdapter, MdNativeDateModule} from "@angular/material";
import {FincashDateAdapter} from "../shared/Fincash-date-adapter";

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
        portfolioReportRouting,
        ChartModule,
        DashboardModule,
        MdNativeDateModule
    ],
    //entryComponents: [PrintReportComponent],
    declarations: [CapitalGainsReportComponent, AssetAllocationComponent, IrrReportComponent, TransactionReportComponent, ReportComponent,
        HoldingReportComponent, SummaryReportComponent],
    providers: [ReportService, TransactionReportService, PdfReportService, CapitalGainsReportService,
        SummaryReportService, AssetAllocationService, {provide: HighchartsStatic, useFactory: highChartsFactory},
        { provide: DateAdapter, useClass: FincashDateAdapter }],
})
export class ReportModule {
}
