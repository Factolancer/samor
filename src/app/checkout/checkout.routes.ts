import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CheckoutComponent} from "./checkout.component";
import {CheckoutResolveService} from "./checkout-data-resolve-service";
import {SummaryComponent} from "./summary/summary.component";
import {SummaryResolveService} from "./summary-data-resolve-service";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";
import {OrderComponent} from "./order/order.component";
import {OrderConfirmationComponent} from "./order/order-confirmation.component";
import {CheckoutURLAccessGuard} from "../core/guards/checkoutUrlAccess.guard";

const checkoutRoutes: Routes = [
        {
            path: 'init',
            component: CheckoutComponent,
            resolve: {
                dataOfCheckout: CheckoutResolveService
            },
            //canActivate: [URLAccessGuard]
        },
        {
            path: 'summary',
            component: SummaryComponent,
            resolve: {
                userInfo: SummaryResolveService
            },
            canActivate: [CheckoutURLAccessGuard]
        },
        {
            path: 'confirm/:orderId',
            component: OrderConfirmationComponent,
            canActivate: [URLAccessGuard]
        },
        {
            path: 'order/:orderId',
            component: OrderComponent,
        }
    ]
    ;

export const checkoutRouting: ModuleWithProviders = RouterModule.forChild(checkoutRoutes);


