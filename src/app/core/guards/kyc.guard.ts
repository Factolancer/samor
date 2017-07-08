import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {KycStatusService} from "../services/kycstatus.service";
import {Logger} from "../logger/logger";
import {HttpService} from "../services/http-service.service";
import {DataStorageService} from "../services/data-storage.service";


@Injectable()
export class KycGuard implements CanActivate {
    className: string;

    constructor(public kycstatusService: KycStatusService,public router: Router,
                public logger: Logger, public dataStorageService: DataStorageService, public httpService: HttpService) {
        this.className = "KYCGuard";
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        /*this.logger.debug(this.className, route.params);
         this.logger.debug(this.className, state.url);*/
       return this.kycstatusService.checkKycStatusBoolean(route, state);
    }

}