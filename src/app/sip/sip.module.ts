import {NgModule} from "@angular/core";
import {SipComponent} from "./sip.component";
import {sipRouting} from "./sip.routes";
import {SmartSipComponent} from "./smart-sip/smart-sip.component";
import {SharedModule} from "../shared/shared.module";
import {SmartSipFundResolveService} from "./smart-sip/smart-sip-fund-resolve.service";
import {SipService} from "./sip.service";
import {SipCalcComponent} from "./sip-calc/sip-calc.component";
import {GoalBasedComponent} from "./sip-calc/goal-based.component";
import {ReturnsBasedComponent} from "./sip-calc/returns-based.component";
import {SmartSipCardComponent} from "./smart-sip/smart-sip-card.component";
import {SipCalcGoalComponent} from "./sip-calc/sip-calc-goal.component";

@NgModule({
    imports: [
        SharedModule,
        sipRouting
    ],
    providers: [SmartSipFundResolveService, SipService],
    declarations: [SipComponent, SmartSipComponent, SmartSipCardComponent],
})

export class SipModule {
}
