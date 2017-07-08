import {SubOrderSummary} from "./sub-order-summary";
export class OrderSummary {
    constructor(public orderId: number,
                public subOrderList: SubOrderSummary[],
                public orderTime?: string,
                public paymentRedirect?: boolean) {
    }
}