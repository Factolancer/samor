import {Injectable} from "@angular/core";
import {TransactionReport} from "../transaction";
import {TransactionFilter} from "./transaction-filter";
import {HttpService} from "../../core/services/http-service.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TransactionReportService {

    constructor(private httpService: HttpService) {
    }

    getTransactionFilterValues():Observable<TransactionReport>{
        return this.httpService.secureGet('/report/getTransactionFilterValues')
            .map(res => res as TransactionReport);
    }
    getTransactions(transFilter: TransactionFilter): Observable<TransactionReport> {

        return this.httpService.securePost('/report/getTransactionReport', transFilter)
            .map(res => res as TransactionReport);
    }
    getFoliosByFund(transFilter: TransactionFilter): Observable<TransactionReport>{
        return this.httpService.securePost('/report/getFoliosByFund', transFilter)
            .map(res => res as TransactionReport);
    }
}
