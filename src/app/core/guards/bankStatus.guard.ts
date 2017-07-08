import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {APP_CONFIG, IAppConfig} from "../../../environments/environment";
import {Logger} from "../logger/logger";
import {IsBankUpdatedService} from "../services/isbankupdated.service";
import {isNullOrUndefined} from "util";
import {LoginService} from "../services/login.service";
import {DataStorageService} from "../services/data-storage.service";


@Injectable()
export class BankStatusGuard implements CanActivate {
    className: string;

    constructor(public isBankUpdatedService: IsBankUpdatedService, @Inject(APP_CONFIG) private config: IAppConfig, public router: Router,
                public logger: Logger, public dataStorageService: DataStorageService, private loginService: LoginService){
        this.className = "BankStatusGuard";
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

        return this.isBankUpdatedService.checkIfBankUpdated().map( value =>{
            if(!isNullOrUndefined(value) && !value){
                let userObj = this.loginService.getUserObject();
                if (userObj.pan=="" && userObj.mob==""){
                    this.router.navigate([this.config.defaultAfterSignup]);
                    return false;
                }
                this.dataStorageService.set(this.config.bankGuard.storagekey,state.url);
                this.router.navigate([this.config.bankGuard.navigate]);
                return false;
            }else{
                return true;
            }
        });
    }
}