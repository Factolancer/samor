export class RedeemStatus {
    constructor(public subOrderId: number,
                public statusCode?: number,
                public status?: string) {
    }
}
