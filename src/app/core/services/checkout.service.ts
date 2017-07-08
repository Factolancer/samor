import {Injectable} from "@angular/core";
import {HttpService} from "./http-service.service";
import {Checkout} from "../../checkout/models/checkout";
import {Summary} from "../../checkout/models/summary";
import {SummaryFund} from "../../checkout/models/summary-fund";
import {Router, NavigationEnd} from "@angular/router";
import {PaymentObject} from "../../checkout/models/payment-object";
import {Logger} from "../logger/logger";
import {CheckoutFund} from "../../checkout/models/checkout-fund";
import {CartService} from "./cart.service";
import {isNull, isNullOrUndefined} from "util";

@Injectable()
export class CheckoutService {

    checkoutData: Checkout;
    previousURL: string;
    className: string;
    errorCheckoutData: CheckoutFund[];

    constructor(private httpService: HttpService, private router: Router, private logger: Logger, private cartService: CartService) {

        this.className = "CheckoutService";
        this.logger.debug(this.className, 0);
        this.previousURL = "";
        this.logger.debug(this.className, this.previousURL);
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map((event: NavigationEnd) => {
                this.logger.debug(this.className, this.previousURL);
                this.previousURL = event['url'];
            })
            .subscribe(() => {
                this.logger.debug(this.className, this.previousURL);
            });
    }

    getCheckoutData() {
        return this.httpService.securePost("/checkout/getCheckoutData", {"cartId": this.cartService.getCartSubjectState().id});
    }

    getCheckoutDataSummary() {
        return this.httpService.securePost("/checkout/getCheckoutDataSummary", {"cartId": this.cartService.getCartSubjectState().id});
    }

    postCheckoutData() {
        return this.httpService.securePost("/checkout/saveCheckoutData", {"cartId": this.cartService.getCartSubjectState().id, "checkout": this.checkoutData})
    }

    getSummaryInfo() {
        return this.httpService.secureGet("/checkout/getSummaryInfo");
    }

    getBSEBankDetails(){
        return this.httpService.secureGet("/checkout/setBSEBankDetails");
    }
    invest(imagePath: string) {
        return this.httpService.securePost("/checkout/invest", this.prepareSummary(imagePath), 90000 , 0);
    }

    getPaymentLink(paymentObj: PaymentObject) {
        return this.httpService.securePost("/checkout/generatePaymentUrl", paymentObj, 90000 , 0);
    }

    prepareSummary(imagePath: string): any {
        let summaryFunds: SummaryFund[] = [];


        this.checkoutData.fundsData.forEach(fund => {
            let summaryFund = new SummaryFund(fund.selectedSoptRfnum, fund.fund.basicFactsheet.name, fund.selectedPlan,
                fund.selectedOption, fund.selectedInvestmentMode, fund.selectedAIPFrequency, +fund.selectedDeductionDate,
                +fund.noOfInstallment, +fund.amount, fund.freshAdditionalType, fund.folioNo);

            if(!isNullOrUndefined(fund.fund.productObj)){
                let productId = fund.fund.productObj.productRfnum;
                let productName = fund.fund.productObj.productName;
                summaryFund.productId = productId;
                summaryFund.productName = productName;
            }

            summaryFunds.push(summaryFund);
        });
        return new Summary(summaryFunds, this.checkoutData.selectedBank.id,
            this.checkoutData.totalInvestmentAmount, imagePath);
    }

    checkLZeroLOne(summary:Summary) {
        return this.httpService.securePost("/checkout/checkLZeroLOne", summary);

    }
    getOrderStatus(orderId: string) {
        return this.httpService.secureGet('/checkout/orderStatus/' + orderId);
    }

    getSchemeFolioNo(soptrfnum:number){
        return this.httpService.securePost('/checkout/getFolioNoForSoptrfnum',{soptrfnum:soptrfnum});
    }
    updateLastSubOrdersPayment(){
        return this.httpService.secureGet('/checkout/updateSubOrderPayment');
    }

    getSubOrderStatus(subOrderId: number, updateState:string) {
        return this.httpService.secureGet('/checkout/subOrderStatus/' + subOrderId+'/'+updateState);
    }

    sendOrderMail(orderId:number) {
        return this.httpService.securePost('/sendMail/orderMail',{orderId:orderId});
    }


}