import {Component, OnInit, Inject, ViewContainerRef} from '@angular/core';
import {OrderService} from "../../order/order.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CheckoutService} from "../../core/services/checkout.service";
import {CheckoutFund} from "../models/checkout-fund";
import {PlatformLocation} from "@angular/common";
import {PaymentObject} from "../models/payment-object";
import {IAppConfig, APP_CONFIG} from "../../../environments/environment";
import {Logger} from "../../core/logger/logger";
import {TitleService} from "../../core/services/title.service";
import {UtilityService} from "../../core/services/utility.service";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {OrderSummary} from "../models/order-summary";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-order-confirmation',
    templateUrl: 'order-confirmation.component.html',
    styleUrls: ['../checkout.styles.scss']
})
export class OrderConfirmationComponent implements OnInit {

    errorFunds: CheckoutFund[] = [];
    allFailed: boolean;
    orderId: string;
    className: string;
    showQueuedOrderMsg: boolean;

    constructor(private checkoutService: CheckoutService, private activatedRoute: ActivatedRoute,
                private router: Router, private platformLocation: PlatformLocation, private snackBarService: SnackBarService,
                @Inject(APP_CONFIG) private config: IAppConfig, private utilityService: UtilityService,
                private logger: Logger, private titleService: TitleService, private viewContainerRef: ViewContainerRef) {

        this.className = "OrderConfirmationComponent";
        this.allFailed = false;
        this.showQueuedOrderMsg = false;
    }

    ngOnInit() {

        this.titleService.setTitle("order_confirmation");
        this.errorFunds = this.checkoutService.errorCheckoutData;
        let errorFundCount = 0;
        let successFundCount = 0;
        this.errorFunds.forEach(fund => {
            if (fund.orderPlaced == false) {
                errorFundCount += 1;
            }
            if(fund.orderPlaced){
                successFundCount += 1;
            }
        });

        if (errorFundCount == this.checkoutService.checkoutData.fundsData.length) {
            this.allFailed = true;
        }

        this.activatedRoute.params.subscribe((params: Params) => {
            this.orderId = params['orderId'];
            this.checkoutService.getOrderStatus(this.orderId).subscribe(data =>{
                this.logger.debug(this.className,data);
                let summary = data as OrderSummary;
                if(isNullOrUndefined(summary.paymentRedirect) || !summary.paymentRedirect){
                    this.allFailed = true;
                }
                if(successFundCount && this.allFailed){
                    this.showQueuedOrderMsg = true;
                }
            });

        });
    }

    goToCart() {
        this.router.navigate(['/cart']);
    }

    payNow() {
        let paymentUrl = this.platformLocation['location'].origin + this.config.paymentFallbackUrl;
        this.checkoutService.getPaymentLink(new PaymentObject(+this.orderId, paymentUrl)).subscribe(paymentResponse => {
            let responsePaymentObj = paymentResponse as PaymentObject;
            this.logger.debug(this.className, responsePaymentObj);
            this.utilityService.redirectionByWindow(responsePaymentObj.bseUrl);
        }, error => {
            this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
        })
    }
}
