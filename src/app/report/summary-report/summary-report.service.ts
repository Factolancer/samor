import {Injectable} from '@angular/core';
import {HttpService} from "../../core/services/http-service.service";
import {PortfolioAssetAllocation} from "./portfolio-asset-allocation";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SummaryReportService {

    constructor(private http:HttpService) {
    }

    getAssetAllocationDetails(): Observable<PortfolioAssetAllocation>{
        return this.http.secureGet('/report/summaryReport')
            .map(res => res as PortfolioAssetAllocation)
    }
}
