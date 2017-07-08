import {CheckoutFund} from "./checkout-fund";
import {CheckoutNominee} from "./checkout-nominee";
import {CheckoutBank} from "./checkout-bank";
import {BseBank} from "./bse-bank";

export class Checkout {
    constructor(public checkoutId: string,
                public fundsData: CheckoutFund[],
                public nomineeList: CheckoutNominee[],
                public bankList: CheckoutBank[],
                public selectedBank: CheckoutBank,
                public selectedNominee: CheckoutNominee,
                public totalInvestmentAmount: number,
                public bseBankDetails: BseBank[]) {
    }
}
