/**
 * Created by Fincash on 02-02-2017.
 */

export class PortfolioAssetAllocation {

    public costValue:number;
    public currentValue:number;
    public asOfDate:Date;
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
