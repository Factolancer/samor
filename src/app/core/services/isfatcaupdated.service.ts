import {Injectable} from "@angular/core";
import {Logger} from "../logger/logger";
import {Observable} from "rxjs/Observable";
import {HttpService} from "./http-service.service";
import {KYCGroup} from "../constants/KYCGroup";
import {SnackBarService} from "./snack-bar.service";

@Injectable()
export class IsFatcaUpdatedService {

    isfatcaupdated: boolean;
    className: string;
    constructor(public logger: Logger, public httpService: HttpService, public snackBarService: SnackBarService) {
        this.className = "IsFatcaUpdatedService"
    }

    public checkIfFatcaUpdated() : Observable<boolean>{
        return this.httpService.secureGet('/user/checkIfFatcaUpdated').retry(3).timeout(30000)
            .map(response => {
                this.logger.debug(this.className, response.isfatcaupdated)
                this.isfatcaupdated = response.isfatcaupdated;

                if (this.isfatcaupdated){
                    return true
                }
                else {
                    this.snackBarService.setGuardMessage("Important details like Birth City etc are missing")
                    return false
                }
            });

    }
}