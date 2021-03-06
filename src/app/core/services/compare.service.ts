import {HttpService} from "./http-service.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Fund} from "../../models/fund";
import {Injectable} from "@angular/core";
import {Logger} from "../logger/logger";

@Injectable()
export class CompareService {

    private fundCompareDataSource = new BehaviorSubject<Fund[]>([]);
    compareData = this.fundCompareDataSource.asObservable();
    className: string;

    constructor(private httpService: HttpService, private logger : Logger) {
        this.className = "CompareService";
    }

    addToCompare(fund: Fund): [boolean, string] {
        this.logger.debug(this.className, fund);
        let fundList = this.fundCompareDataSource.getValue();
        if (fundList.length >= 3) {
            return [false, "Cannot compare more than 3 funds"];
        } else if (fundList.some(fundInList => fund.id == fundInList.id)) {
            return [false, "Fund already added to compare"];
        } else if (fundList.length > 0 && fundList[0].cid != fund.cid) {
            return [false, "Cannot compare funds from different categories"];
        } else {
            fundList.push(fund);
            this.fundCompareDataSource.next(fundList);
            return [true, "Fund added to comparison"];
        }

    }

    removeFromCompare(fundId: string) {
        let fundList = this.fundCompareDataSource.getValue();
        fundList = fundList.filter(fund => fund.id != fundId);
        this.logger.debug(this.className, fundList);
        this.fundCompareDataSource.next(fundList);
    }

    removeAllFromCompare() {
        this.fundCompareDataSource.next([]);
    }

    getFundComparisonData() {
        return this.fundCompareDataSource.getValue();
    }

}
