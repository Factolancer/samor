import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {APP_CONFIG, IAppConfig} from "../../../environments/environment";
import {Logger} from "../logger/logger";
import {IsBasicDetailsUpdatedService} from "../services/isbasicDetailUpdated.service";
import {isNullOrUndefined} from "util";
import {LoginService} from "../services/login.service";
import {DataStorageService} from "../services/data-storage.service";


@Injectable()
export class BasicDetailStatusGuard implements CanActivate {
    className: string;

    constructor(public isBasicDetailUpdatedService: IsBasicDetailsUpdatedService, @Inject(APP_CONFIG) private config: IAppConfig, public router: Router,
                public logger: Logger, public dataStorageService: DataStorageService, public loginService: LoginService) {
        this.className = "BasicDetailStatusGuard";
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.isBasicDetailUpdatedService.checkIfBasicDetailsUpdated().map(value => {
            if (!isNullOrUndefined(value) && !value) {
                let userObj = this.loginService.getUserObject();
                if (userObj.pan=="" && userObj.mob==""){
                    this.router.navigate([this.config.defaultAfterSignup]);
                    return false;
                }
                this.dataStorageService.set(this.config.userBasicGuard.storagekey, state.url);
                this.router.navigate([this.config.userBasicGuard.navigate]);
                return false;
            } else {
                return true;
            }
        });
    }
}