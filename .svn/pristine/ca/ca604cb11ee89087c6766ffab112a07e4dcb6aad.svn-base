import {Injectable} from "@angular/core";
import {Router, Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {SipService} from "../sip.service";
import {Fund} from "../../models/fund";

@Injectable()
export class SmartSipFundResolveService implements Resolve<boolean | Fund[]> {
    constructor(private router: Router, private sipService: SipService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<boolean | Fund[]> {

        return this.sipService.getQuickSipFunds().map(output => {
            if (output) {
                return output as Fund[];
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        });
    }
}
