import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {KycStatusService} from "../services/kycstatus.service";
import {Logger} from "../logger/logger";
import {LocalStorageService} from "angular-2-local-storage";
import {HttpService} from "../services/http-service.service";


@Injectable()
export class IndividualUserGuard implements CanActivate {
    className: string;

    constructor(public kycstatusService: KycStatusService,public router: Router,
                public logger: Logger, public httpService: HttpService) {
        this.className = "IndividualUserGuard";
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        /*this.logger.debug(this.className, route.params);
         this.logger.debug(this.className, state.url);*/
        return this.kycstatusService.checkIndividual();
    }

}