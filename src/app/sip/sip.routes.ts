import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {SmartSipComponent} from "./smart-sip/smart-sip.component";
import {SipComponent} from "./sip.component";
import {SmartSipFundResolveService} from "./smart-sip/smart-sip-fund-resolve.service";
import {SipCalcComponent} from "./sip-calc/sip-calc.component";
import {GoalBasedComponent} from "./sip-calc/goal-based.component";
import {ReturnsBasedComponent} from "./sip-calc/returns-based.component";
import {SipCalcGoalComponent} from "./sip-calc/sip-calc-goal.component";


const sipRoutes: Routes = [
    {
        path: 'sip',
        children: [
            {
                path: 'smartsip',
                component: SmartSipComponent,
                resolve: {
                    funds: SmartSipFundResolveService,
                }
            },
            {
                path: '',
                component: SipComponent,
            }
        ]
    }
];

export const sipRouting: ModuleWithProviders = RouterModule.forChild(sipRoutes);

