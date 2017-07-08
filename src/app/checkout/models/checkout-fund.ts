import {Fund} from "../../models/fund";
import {FundOption} from "../../models/fund-option";

export class CheckoutFund {
    constructor(public fund: Fund,
                public options: FundOption[],
                public selectedSoptRfnum: number,
                public selectedPlan: string,
                public selectedOption: string,
                public selectedInvestmentMode: string,
                public selectedAIPFrequency: string,
                public selectedDeductionDate: number,
                public noOfInstallment: number,
                public amount: number,
                public plansList: string[],
                public optionsList: string[],
                public sipDatesList: string[],
                public sipFrequencyList: string[],
                public freshAdditionalType?: string,
                public folioNo?: string,
                public showProductTag: boolean = false,
                public orderPlaced: boolean = false) {
    }
}