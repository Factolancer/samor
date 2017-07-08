export class CapitalGains {

    public status: string;
    public pan: string;
    public fundDetailsList: FundDetails[];
    public cumulativeShortTermGain: number;
    public cumulativeLongTermGain: number;
}

export class FundDetails {

    public amc: string;
    public fundBasicDetails: FundBasicDetails;
    public status: string;
    public pan: string;
    public redemptionDetailsList: RedemptionDetails[];
    public totalAmount: number;
    public totalRedeemedUnits: number;
    public totalShortTermGain: number;
    public totalLongTermGain: number;
}
export class FundBasicDetails {
    public fundName: string;
    public folioNo: string;
    public plan: string;
    public divOption: string;
    public divFreq: string;
}
export class RedemptionDetails {

    public desc: string;
    public redeemDate: Date;
    public units: number;
    public price: number;
    public amount: number;
    public purchaseDate: Date;
    public purchaseUnits: number;
    public purchasePrice: number;
    public shortTermGain: number;
    public longTermGain: number;
}
export class FinancialYear {

    constructor(public label: string, public value: number) {
    }
}