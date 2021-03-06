export class TransactionSummary {

    constructor(public orderId: number,
                public subOrderId: number,
                public fundName: string,
                public schemePlan: string,
                public dividendFreq: string,
                public dividendOption: string,
                public subOrderDate: string,
                public subOrderStatus: string,
                public subOrderAmount: number,
                public subOrderInvestmentMode: string,
                public cancelAllowed: boolean,
                public paymentAllowed: boolean,
                public orderType: string,
                public quantity?: number) {

    }
}

export class Performer {
    constructor(public fundName: string,
                public plan: string,
                public divFreq: string,
                public divOption: string,
                public fundReturn: number) {

    }
}
