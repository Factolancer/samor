export class PaymentObject {
    constructor(public orderId: number,
                public paymentUrl: string,
                public bseUrl?: string) {
    }
}
