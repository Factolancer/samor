import {Injectable, Inject} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {IAppConfig, APP_CONFIG} from "../../../environments/environment";
import {IsAddressUpdatedService} from "../services/isaddressupdated.service";
import {Logger} from "../logger/logger";
import {isNullOrUndefined} from "util";
import {LoginService} from "../services/login.service";
import {DataStorageService} from "../services/data-storage.service";


@Injectable()
export class AddressStatusGuard implements CanActivate {
    className: string;

    constructor(public isAddressUpdatedService: IsAddressUpdatedService, @Inject(APP_CONFIG) private config: IAppConfig, public router: Router,
                public logger: Logger,public dataStorageService: DataStorageService, private loginService: LoginService){
        this.className = "AddressStatusGuard";
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

        return this.isAddressUpdatedService.checkIfAddressUpdated().map( value =>{
            if(!isNullOrUndefined(value) && !value){
                let userObj = this.loginService.getUserObject();
                if (userObj.pan=="" && userObj.mob==""){
                    this.router.navigate([this.config.defaultAfterSignup]);
                    return false;
                }
                this.dataStorageService.set(this.config.addressGuard.storagekey,state.url);
                this.router.navigate([this.config.addressGuard.navigate]);
                return false;
            }else{
                return true;
            }
        });
    }
}