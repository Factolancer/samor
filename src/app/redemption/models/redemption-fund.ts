import {Fund} from "../../models/fund";
import {FundOption} from "../../models/fund-option";


export class RedemptionFund {
    constructor(public fundId: number,
                public fundName: string,
                public plan: string,
                public option: FundOption,
                public folioNo: string,
                public holdingMode: string,
                public selectedRedemptionMode: string,
                public amount: number,
                public amountUnitFlag: boolean,
                public fullPartialFlag: boolean,
                public totalUnits: number,
                public redeemableUnits: number,
                public currValue: number,
                public currNav: number,
                public navDate: Date,
                public redemptionAllowed: string,
                public minQuantity: number,
                public minAmount: number,
                public quantityMultiple: number,
                public amountMultiple: number,
                public orderPlaced: boolean = false) {
    }
}