import {SummaryFund} from "./summary-fund";
export class Summary {
    constructor(public fundList: SummaryFund[],
                public bankRfnum: number,
                public totalAmount: number,
                public imagePath: string) {
    }
}
