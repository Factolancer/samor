import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {CheckoutService} from "../../core/services/checkout.service";
import {disclaimers} from "../../../properties/discalimers";
import {OrderSummary} from "../models/order-summary";
import {Logger} from "../../core/logger/logger";
import {InvestmentModeEnum} from "../../enum/investment-mode-enum";
import {PaymentStatus} from "../models/payment-status";
import {CartService} from "../../core/services/cart.service";
import {TitleService} from "../../core/services/title.service";
import {isNullOrUndefined} from "util";
import {HeaderService} from "../../core/services/header.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/take";
import "rxjs/add/observable/timer";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {Order} from "../models/order";
import {DataStorageService} from "../../core/services/data-storage.service";

@Component({
    selector: 'app-order',
    templateUrl: 'order.component.html',
    styleUrls: ['../checkout.styles.scss']
})
export class OrderComponent implements OnInit {

    //orderId: string;
    hideDetails: boolean;
    //orderSummary: OrderSummary;
    disclaimer: string;
    className: string;
    //subOrderPaymentStatus: PaymentStatus[];
    investmentMode = InvestmentModeEnum;
    totalCreatedStatus: number;
    //paymentStatusRcvdCount: number;

    ordersList: Order[];
    constructor(private checkoutService: CheckoutService, private activatedRoute: ActivatedRoute, private snackBarService: SnackBarService,
                private logger: Logger, private cartService: CartService, private titleService: TitleService,
                public dataStorageService: DataStorageService, private headerService: HeaderService, private viewContainerRef: ViewContainerRef) {
        this.className = "OrderComponent";
        //this.subOrderPaymentStatus = [];
        //this.paymentStatusRcvdCount = 0;
        this.hideDetails = false;
        this.ordersList = [];
        this.totalCreatedStatus= 0;
    }

    ngOnInit() {
        this.headerService.onDemandProgressBar();
        this.activatedRoute.params.subscribe((params: Params) => {
            //this.orderId = params['orderId'];
            let orderIdList = params['orderId'].split("-");
            this.titleService.setTitle("order_summary", {id: params['orderId']});
            for(let orderId of orderIdList){

                this.checkoutService.getOrderStatus(orderId).subscribe(res => {
                    let orderSummary = res as OrderSummary;
                    this.headerService.cancelOnDemandProgressBar();
                    let subOrderPaymentStatus: PaymentStatus[] = [];
                    let paymentStatusRcvdCount = 0;
                    orderSummary.subOrderList.forEach((subOrder, index) => {
                        let paymentStatus = new PaymentStatus(subOrder.subOrderId);
                        subOrderPaymentStatus.push(paymentStatus);
                        this.checkoutService.getSubOrderStatus(subOrder.subOrderId,"Y").subscribe(res => {
                            let serverRes = res as PaymentStatus;
                            paymentStatusRcvdCount += 1;
                            subOrderPaymentStatus[index].status = serverRes.status;
                            subOrderPaymentStatus[index].statusCode = serverRes.statusCode;
                            /*cart clearing logic*/
                            if (subOrderPaymentStatus[index].statusCode == 2 ||
                                subOrderPaymentStatus[index].statusCode == 3 ||
                                subOrderPaymentStatus[index].statusCode == 4 ||
                                subOrderPaymentStatus[index].statusCode == 6 ||
                                subOrderPaymentStatus[index].statusCode == 10 ||
                                subOrderPaymentStatus[index].statusCode == 17) {
                                this.cartService.removeFundById(subOrder.soptrfnum.toString());
                            }

                            if(subOrderPaymentStatus[index].statusCode == 17){
                                this.totalCreatedStatus++;
                            }

                            /*order mail sending logic*/
                            if (paymentStatusRcvdCount == subOrderPaymentStatus.length) {
                                if (isNullOrUndefined(this.dataStorageService.get("orderM" + orderSummary.orderId))) {
                                    this.checkoutService.sendOrderMail(orderSummary.orderId).subscribe(res => {
                                            this.logger.info(this.className, "--->sending order mail succes", res);
                                            this.dataStorageService.add("orderM" + orderSummary.orderId, "Y")
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
                    this.ordersList.push(new Order(orderId,orderSummary,subOrderPaymentStatus));
                    this.checkoutService.updateLastSubOrdersPayment().subscribe(updatedSubRes => {

                    });
                }, error => {
                    this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                });
            }

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
