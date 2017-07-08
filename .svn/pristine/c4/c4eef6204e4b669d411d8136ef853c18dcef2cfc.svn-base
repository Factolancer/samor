import {Injectable} from "@angular/core";
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {SummaryUserInfo} from "./models/summary-user-info";
import {RedemptionService} from "../core/services/redemption.service";
import {isNullOrUndefined} from "util";


@Injectable()
export class RedSummaryResolveService implements Resolve<boolean | SummaryUserInfo> {


    constructor(private router: Router, private redemptionService: RedemptionService) {
    }

    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | SummaryUserInfo> {

        return this.redemptionService.getSummaryInfo().map(output => {
            if (!isNullOrUndefined(output)) {
                return output as SummaryUserInfo;
            } else {
                // can route for this case
                this.router.navigate(['/init']);
                return false;
            }
        });
    }

}
