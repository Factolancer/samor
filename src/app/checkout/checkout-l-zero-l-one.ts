import {CheckoutFund} from "./models/checkout-fund";
import {LOneLZeroDetails} from "./models/l-zero-l-one-details";

export class  CheckoutLZeroLOne{

    constructor(public summaryFund:CheckoutFund,
                public isLOne?:boolean,
                public isLZero?:boolean,
                public lOneLZeroDetails?:LOneLZeroDetails){

    }
}