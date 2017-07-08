import {Injectable} from "@angular/core";
import {Logger} from "../logger/logger";
import {Observable} from "rxjs/Observable";
import {HttpService} from "./http-service.service";
import {SnackBarService} from "./snack-bar.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class IsBasicDetailsUpdatedService {

    isbasicDetailsupdated: boolean;
    className: string;
    constructor(public logger: Logger, public httpService: HttpService, public snackBarService : SnackBarService) {
        this.className = "IsBasicDetailsUpdatedService"
    }

    public checkIfBasicDetailsUpdated(showMessageBool? : boolean) : Observable<boolean>{
        let showMessage = true;
        if(!isNullOrUndefined(showMessageBool)){
            showMessage = showMessageBool;
        }
        return this.httpService.secureGet('/user/checkIfBasicDetailsUpdated').retry(3).timeout(30000)
            .map(response => {
                this.logger.debug(this.className, response.isbasicdetailsupdated)
                this.isbasicDetailsupdated = response.isbasicdetailsupdated;

                if (this.isbasicDetailsupdated){
                    return true
                }
                else {
                    if(showMessage){
                        this.snackBarService.setGuardMessage("Important details like PAN/Mobile No etc are missing")
                    }
                    return false
                }
            });

    }
}