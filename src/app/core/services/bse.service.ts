/**
 * Created by Fincash on 03-03-2017.
 */

import {Injectable} from "@angular/core";
import {Logger} from "../logger/logger";
import {Observable} from "rxjs/Observable";
import {HttpService} from "./http-service.service";
import {KYCGroup} from "../constants/KYCGroup";
import {SnackBarService} from "./snack-bar.service";

@Injectable()
export class BSEService {

    clientRegistered: boolean = false;
    fatcaStatus: boolean = false;
    className: string;
    constructor(public logger: Logger, public httpService: HttpService, public snackBarService: SnackBarService) {
        this.className = "BSEService"
    }

    public IsBseAndFatcaDone() : Observable<boolean>{
        return this.httpService.secureGet('/bse/checkBseAndFatcaStatus').retry(3).timeout(30000)
            .map(response => {
                this.logger.debug(this.className, response)
                this.clientRegistered = response['bseclient'];
                this.fatcaStatus = response['bsefatca'];

                if (this.clientRegistered && this.fatcaStatus){
                    return true
                }
                else {
                    this.snackBarService.setGuardMessage("Something went wrong, please try after some time")
                    return false
                }
            });
    }

    public  isBseRegDone(): Observable<boolean>{
        return this.httpService.secureGet('/bse/checkBseStatus').retry(3).timeout(30000).map(response => {
                this.logger.debug(this.className, response);
                this.clientRegistered = response['bseclient'];
                let success = response['success'];
                if (success && this.clientRegistered){
                    return true
                }
                else {
                    // this.snackBarService.setGuardMessage("User not registered on BSE");
                    return false
                }
            })
    }
}