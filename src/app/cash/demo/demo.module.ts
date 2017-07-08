import { NgModule } from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import {ChartModule} from "angular2-highcharts";
import {HighchartsStatic} from "angular2-highcharts/dist/HighchartsService";

import { AvgbalComponent } from './avgbal.component';
import { AccEarningComponent } from './accearning.component';
import {CashEarningComponent} from "./cashearning.component";
import { DemoComponent } from './demo.component';
import {DemoaComponent} from "./demoa.component";
import {DemoallComponent} from "./demoall.component";

import {DemoService} from "./demo.service";


export function highChartsFactory() {
    var hc = require('highcharts');
    return hc;
}


@NgModule({
  imports: [
     SharedModule,
      ChartModule
  ],
  declarations: [DemoComponent, AvgbalComponent, AccEarningComponent, CashEarningComponent, DemoaComponent,DemoallComponent],
    providers:[DemoService,{provide: HighchartsStatic, useFactory: highChartsFactory}],
    exports:[DemoComponent]

})
export class DemoModule { }
