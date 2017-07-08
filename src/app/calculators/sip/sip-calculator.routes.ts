import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ReturnsBasedComponent} from "./returns-based.component";
import {GoalBasedComponent} from "./goal-based.component";
import {SipCalcGoalComponent} from "./sip-calc-goal.component";
import {SipCalcComponent} from "./sip-calc.component";
import {URLAccessGuard} from "../../core/guards/urlAccess.guard";
import {ResultsGoalBasedComponent} from "./results-goal-based.component";
import {ReturnsResultsComponent} from "./results-returns.component";


const sipCalculatorRoutes: Routes = [
    {
        path: 'sip',
        children: [
            {
                path: 'returns',
                children: [
                    {
                        path: '',
                        component: ReturnsBasedComponent
                    },
                    {
                        path: 'results',
                        component: ReturnsResultsComponent,
                        canActivate: [URLAccessGuard]
                    },
                ]
            },
            {
                path: 'goals',
                children: [
                    {
                        path: 'questions/:id',
                        component: GoalBasedComponent
                    },
                    {
                        path: 'results/:id',
                        component: ResultsGoalBasedComponent,
                        canActivate: [URLAccessGuard]
                    },
                    {
                        path: '',
                        component: SipCalcGoalComponent
                    }
                ]
            },
            {
                path: '',
                component: SipCalcComponent,
            }
        ]
    },
];

export const sipCalculatorRouting: ModuleWithProviders = RouterModule.forChild(sipCalculatorRoutes);

