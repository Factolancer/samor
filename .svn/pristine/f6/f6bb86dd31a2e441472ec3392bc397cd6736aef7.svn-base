import {NgModule} from "@angular/core";
import {sipCalculatorRouting} from "./sip-calculator.routes";
import {SharedModule} from "../../shared/shared.module";
import {SipCalcComponent} from "./sip-calc.component";
import {GoalBasedComponent} from "./goal-based.component";
import {SipCalcGoalComponent} from "./sip-calc-goal.component";
import {ReturnsBasedComponent} from "./returns-based.component";
import {ChartModule} from "angular2-highcharts";
import {HighchartsStatic} from "angular2-highcharts/dist/HighchartsService";
import {ReturnsResultsComponent} from "./results-returns.component";
import {SIPCalcService} from "./sip-calc.service";
import {ResultsGoalBasedComponent} from "./results-goal-based.component";

export function highChartsFactory() {
    var hc = require('highcharts');
    return hc;
}
@NgModule({
    imports: [
        SharedModule,
        ChartModule,
        sipCalculatorRouting
    ],
    providers: [{provide: HighchartsStatic, useFactory: highChartsFactory}, SIPCalcService],
    declarations: [SipCalcComponent, GoalBasedComponent, SipCalcGoalComponent, ReturnsBasedComponent,
        ReturnsResultsComponent, ResultsGoalBasedComponent],
})

export class SipCalculatorModule {
}
