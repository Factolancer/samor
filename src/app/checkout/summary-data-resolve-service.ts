import {Inject, Injectable} from "@angular/core";
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {CheckoutService} from "../core/services/checkout.service";
import {SummaryUserInfo} from "./models/summary-user-info";
import {isNullOrUndefined} from "util";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";


@Injectable()
export class SummaryResolveService implements Resolve<boolean | SummaryUserInfo> {


    constructor(private router: Router, private checkoutService: CheckoutService,@Inject(APP_CONFIG) private config: IAppConfig) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | SummaryUserInfo> {

        return this.checkoutService.getSummaryInfo().map(output => {
            if (!isNullOrUndefined(output)) {
                return output as SummaryUserInfo;
            } else {
                this.router.navigate(['/cart']);
                return false;
            }
        });
    }

}
