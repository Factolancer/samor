import {Injectable} from "@angular/core";
import {Logger} from "../logger/logger";
import {Observable} from "rxjs/Observable";
import {HttpService} from "./http-service.service";
import {KYCGroup} from "../constants/KYCGroup";
import {SnackBarService} from "./snack-bar.service";

@Injectable()
export class IsBankUpdatedService {

    isbankupdated: boolean;
    className: string;
    constructor(public logger: Logger, public httpService: HttpService, public snackBarService: SnackBarService) {
        this.className = "IsBankUpdatedService"
    }

    public checkIfBankUpdated() : Observable<boolean>{
        return this.httpService.secureGet('/user/checkIfBankUpdated').retry(3).timeout(30000)
            .map(response => {
                this.logger.debug(this.className, response.isbankupdated)
                this.isbankupdated = response.isbankupdated;

                if (this.isbankupdated){
                    return true
                }
                else {
                    this.snackBarService.setGuardMessage("Important details like Name/Bank Account No. etc are missing")
                    return false
                }
            });

    }
}