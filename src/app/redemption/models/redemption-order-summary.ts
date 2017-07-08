import {RedSubOrderSummary} from "./red-sub-order-summary";
export class RedemptionOrderSummary {
    constructor(public orderId: number,
                public subOrderList: RedSubOrderSummary[],
                public orderTime?: string) {
    }
}