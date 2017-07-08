export class PortfolioAssetAllocation {

    public costValue:number;
    public asOfDate:Date;
    public currentValue:number;
    public unrealizedGain:number;
    public realizedGain:number;
    public assetClassDetailsList:AssetClassDetails[];

}

export class AssetClassDetails{

    public assetClass:string;
    public investedAmt:number;
    public share:number;
    public currValue:number;
    public currShare:number;
    public currentCostRatio:number;
}
