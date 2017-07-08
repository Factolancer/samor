import {NgModule} from "@angular/core";
import {CheckoutComponent} from "./checkout.component";
import {SharedModule} from "../shared/shared.module";
import {checkoutRouting} from "./checkout.routes";
import {CheckoutService} from "../core/services/checkout.service";
import {CheckoutResolveService} from "./checkout-data-resolve-service";
import {SummaryComponent} from "./summary/summary.component";
import {SummaryResolveService} from "./summary-data-resolve-service";
import {OrderComponent} from "./order/order.component";
import {OrderConfirmationComponent} from "./order/order-confirmation.component";
import {LZeroLOneComponent} from "./l-zero-l-one/l-zero-l-one.component";
import {LZeroLOneService} from "./l-zero-l-one/l-zero-l-one-service";
import {PaymentGuideLineDialogComponent} from "./payment-guideline.component";
import {PaymentCarouselComponent} from "./payment-carousel";

@NgModule({
    imports: [
        SharedModule,
        checkoutRouting
    ],
    providers: [CheckoutResolveService, SummaryResolveService, LZeroLOneService],
    declarations: [CheckoutComponent, SummaryComponent, OrderComponent, OrderConfirmationComponent,
        LZeroLOneComponent, PaymentGuideLineDialogComponent, PaymentCarouselComponent],
    entryComponents: [LZeroLOneComponent, PaymentGuideLineDialogComponent]
})

export class CheckoutModule {
}