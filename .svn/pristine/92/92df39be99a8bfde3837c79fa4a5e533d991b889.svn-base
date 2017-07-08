import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {APP_CONFIG, IAppConfig} from "../../../environments/environment";
import {Logger} from "../logger/logger";
import {SnackBarService} from "../services/snack-bar.service";
import {BSEService} from "../services/bse.service";
import {isNullOrUndefined} from "util";
import {DataStorageService} from "../services/data-storage.service";


@Injectable()
export class BSEGuard implements CanActivate {
    className: string;

    constructor(public bseService: BSEService, @Inject(APP_CONFIG) private config: IAppConfig, public router: Router,
                public logger: Logger, public dataStorageService: DataStorageService, private snackBarService: SnackBarService){
        this.className = "BSEGuard";
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

        return this.bseService.IsBseAndFatcaDone().map( value =>{
            if(!isNullOrUndefined(value) && !value){
                this.dataStorageService.set(this.config.kycGuard.storagekey,state.url);
                this.router.navigate([this.config.kycGuard.navigate]);
                return false;
            }else{
                return true;
            }
        });
    }
}