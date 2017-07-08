import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {CheckoutService} from "../core/services/checkout.service";
import {disclaimers} from "../../properties/discalimers";
import {RedemptionOrderSummary} from "./models/redemption-order-summary";
import {Logger} from "../core/logger/logger";
import {RedemptionModeEnum} from "../enum/redemption-mode-enum";
// import {PaymentStatus} from "../models/payment-status";
import {CartService} from "../core/services/cart.service";
import {TitleService} from "../core/services/title.service";
import {isNullOrUndefined} from "util";
import {HeaderService} from "../core/services/header.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/take";
import "rxjs/add/observable/timer";
import {RedemptionService} from "../core/services/redemption.service";
import {PaymentStatus} from "../checkout/models/payment-status";
import {InvestmentModeEnum} from "../enum/investment-mode-enum";
import {YES_NO_ARRAY} from "../constants/CNDGroup";
import {SnackBarService} from "../core/services/snack-bar.service";
import {DataStorageService} from "../core/services/data-storage.service";

@Component({
    selector: 'app-red-order',
    templateUrl: 'redemption-order.component.html',
    styleUrls: ['./redemption.styles.scss']
})
export class RedemptionOrderComponent implements OnInit {

    orderId: string;
    hideDetails: boolean;
    orderSummary: RedemptionOrderSummary;
    disclaimer: string;
    className: string;
    subOrderPaymentStatus: PaymentStatus[];
    redemptionMode = RedemptionModeEnum;
    investmentMode = InvestmentModeEnum;
    totalCreatedStatus: number;
    paymentStatusRcvdCount: number;

    constructor(private checkoutService: CheckoutService, private activatedRoute: ActivatedRoute, private redemptionService: RedemptionService,
                private logger: Logger, private cartService: CartService, private titleService: TitleService, private snackBarService: SnackBarService,
                public dataStorageService: DataStorageService, private headerService: HeaderService, private viewContainerRef: ViewContainerRef) {
        this.className = "RedemptionOrderComponent";
        this.subOrderPaymentStatus = [];
        this.paymentStatusRcvdCount = 0;
        this.hideDetails = false;
        this.totalCreatedStatus= 0;
    }

    ngOnInit() {
        this.headerService.onDemandProgressBar();
        this.activatedRoute.params.subscribe((params: Params) => {
            this.orderId = params['orderId'];
            this.titleService.setTitle("order_summary", {id: this.orderId});
            this.checkoutService.getOrderStatus(this.orderId).subscribe(res => {
                this.orderSummary = res as RedemptionOrderSummary;
                this.headerService.cancelOnDemandProgressBar();
                this.orderSummary.subOrderList.forEach((subOrder, index) => {
                    let paymentStatus = new PaymentStatus(subOrder.subOrderId);
                    this.subOrderPaymentStatus.push(paymentStatus);
                    this.checkoutService.getSubOrderStatus(subOrder.subOrderId, YES_NO_ARRAY[1].value).subscribe(res => {
                        let serverRes = res as PaymentStatus;
                        this.paymentStatusRcvdCount += 1;
                        this.subOrderPaymentStatus[index].status = serverRes.status;
                        this.subOrderPaymentStatus[index].statusCode = serverRes.statusCode;
                        /*cart clearing logic*/
                        if (this.subOrderPaymentStatus[index].statusCode == 2 ||
                            this.subOrderPaymentStatus[index].statusCode == 3 ||
                            this.subOrderPaymentStatus[index].statusCode == 4 ||
                            this.subOrderPaymentStatus[index].statusCode == 6) {
                            // this.cartService.removeFundById(subOrder.soptrfnum.toString());
                        }
                        if(this.subOrderPaymentStatus[index].statusCode == 17){
                            this.totalCreatedStatus++
                        }

                        /*order mail sending logic*/
                        if (this.paymentStatusRcvdCount == this.subOrderPaymentStatus.length) {
                            if (isNullOrUndefined(this.dataStorageService.get("orderM" + this.orderSummary.orderId))) {
                                this.checkoutService.sendOrderMail(this.orderSummary.orderId).subscribe(res => {
                                        this.logger.info(this.className, "--->sending order mail succes", res);
                                        this.dataStorageService.add("orderM" + this.orderSummary.orderId, "Y")
                                    },
                                    err => {
                                        this.logger.info(this.className, "--->sending order-mail failed", err);
                                    }
                                )
                            } else {
                                this.logger.debug(this.className, "order mail already sent");
                            }

                        }
                    }, error => {
                        this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                    });
                });
                /*this.checkoutService.updateLastSubOrdersPayment().subscribe(updatedSubRes => {

                });*/
            }, error => {
                this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
            });
        });

        this.disclaimer = `${disclaimers.order}`
    }

    print() {
        this.headerService.hideHeader();
        this.headerService.hideFooter();
        this.hideDetails = true;
        let timerSubscription = Observable.timer(1000).take(1).subscribe(val => {
            window.print();
            this.hideDetails = false;
            this.headerService.showHeader();
            this.headerService.showFooter();
            timerSubscription.unsubscribe();
        })
    }
}
