/**
 * Created by Fincash on 06-02-2017.
 */
export class AssetClassFund{
    public assetClass:string;
    public fundDetailsList:funds[];
}
export class funds{
    public fundId: Number;
    public fundName: String;
    public plan: String;
    public divFreq: String;
    public divOption: String;
    public currentValue: Number;
}