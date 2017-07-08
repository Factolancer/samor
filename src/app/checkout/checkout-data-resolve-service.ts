import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Checkout} from "./models/checkout";
import {CheckoutService} from "../core/services/checkout.service";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";


@Injectable()
export class CheckoutResolveService implements Resolve<boolean | Checkout> {


    constructor(private router: Router, private checkoutService: CheckoutService,@Inject(APP_CONFIG) private config: IAppConfig) {
    }

    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | Checkout> {

        return this.checkoutService.getCheckoutData().map(output => {
            if (!isNullOrUndefined(output)) {
                return output as Checkout;
            } else {
                this.router.navigate([this.config.dloginUrl]);
                return false;
            }
        });
    }

}
