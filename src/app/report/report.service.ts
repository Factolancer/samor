import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ReportService {

    private fundIndexSource = new Subject<number>();
    private holdingTabInit = new BehaviorSubject<boolean>(false);
    private transactionTabInit = new BehaviorSubject<boolean>(false);
    private assetAllocationTabInit = new BehaviorSubject<boolean>(false);
    private capitalGainsTabInit = new BehaviorSubject<boolean>(false);
    private irrTabInit = new BehaviorSubject<boolean>(false);

    fundIndexResult = this.fundIndexSource.asObservable();
    holdingTabResult = this.holdingTabInit.asObservable();
    transactionTabResult = this.transactionTabInit.asObservable();
    irrTabResult = this.irrTabInit.asObservable();
    assetAllocationTabResult = this.assetAllocationTabInit.asObservable();
    capitalGainsTabResult = this.capitalGainsTabInit.asObservable();
    constructor() {
    }


    setFundIndexResult(fundIndexResult: number) {
        this.fundIndexSource.next(fundIndexResult);
    }

    setHoldingTabResult(loadTab:boolean){
        this.holdingTabInit.next(loadTab);
    }

    getHoldingTabResult(){
        return this.holdingTabInit.getValue();
    }

    setTransactionTabResult(loadTab:boolean){
        this.transactionTabInit.next(loadTab);
    }

    getTransactionTabResult(){
        return this.transactionTabInit.getValue();
    }


    geAssetAllocationTabInit(){
        return this.assetAllocationTabInit.getValue();
    }

    setAssetAllocationTabInit(loadTab:boolean) {
        this.assetAllocationTabInit.next(loadTab);
    }

    getCapitalGainsTabInit(){
        return this.capitalGainsTabInit.getValue();
    }

    setCapitalGainsTabInit(loadTab:boolean) {
        this.capitalGainsTabInit.next(loadTab);
    }

    getIrrTabInit(){
        return this.irrTabInit.getValue();
    }

    setIrrTabInit(loadTab:boolean) {
        this.irrTabInit.next(loadTab);
    }

}
