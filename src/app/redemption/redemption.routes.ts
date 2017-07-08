import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RedSummaryResolveService} from "./red-summary-data-resolve-service";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";
import {RedemptionComponent} from "./redemption.component";
import {RedemptionSummaryComponent} from "./redemption-summary.component";
import {RedemptionOrderComponent} from "./redemption-order.component";
import {InstantRedemptionComponent} from "./instant-redemption.component";
import {Redemption} from "./models/redemption";
import {InstantRedemptionResolveService} from "./instant-redemption-data-resolve.service";
import {IndividualUserGuard} from "../core/guards/individualUser.guard";

const redemptionRoutes: Routes = [
        {
            path: 'init',
            component: RedemptionComponent,
           /* resolve: {
                checkoutData: CheckoutResolveService
            },*/
            //canActivate: [URLAccessGuard]
        },
        {
            path: 'summary',
            component: RedemptionSummaryComponent,
            resolve: {
                userInfo: RedSummaryResolveService
            },
            canActivate: [URLAccessGuard]
        },
        /*{
            path: 'confirm/:orderId',
            component: OrderConfirmationComponent,
            canActivate: [URLAccessGuard]
        },*/
        {
            path: 'order/:orderId',
            component: RedemptionOrderComponent,
        },
        {
            path: 'instant',
            component: InstantRedemptionComponent,
            resolve: {
                redemptionFunds: InstantRedemptionResolveService
            },
            canActivate:[IndividualUserGuard]
        }
    ]
;

export const redemptionRouting: ModuleWithProviders = RouterModule.forChild(redemptionRoutes);


