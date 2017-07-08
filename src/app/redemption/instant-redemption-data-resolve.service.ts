import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {RedemptionService} from "../core/services/redemption.service";
import {Redemption} from "./models/redemption";
import {isNullOrUndefined} from "util";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";


@Injectable()
export class InstantRedemptionResolveService implements Resolve<boolean | Redemption> {


    constructor(private router: Router, private redemptionService: RedemptionService, @Inject(APP_CONFIG) private config: IAppConfig) {
    }

    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | Redemption> {

        return this.redemptionService.getInstaRedeemFunds().map(output => {
            if (!isNullOrUndefined(output)) {
                return output as Redemption;
            } else {
                // can route for this case
                this.router.navigate([this.config.defaultAfterLogin]);
                return false;
            }
        });
    }


}
