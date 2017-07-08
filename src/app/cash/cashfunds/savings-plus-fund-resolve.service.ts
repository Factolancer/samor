import {Injectable} from "@angular/core";
import {Router, Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Fund} from "../../models/fund";
import {HttpService} from "../../core/services/http-service.service";
import {Logger} from "../../core/logger/logger";

@Injectable()
export class SavingsPlusFundResolveService implements Resolve<boolean | Fund[]> {
    className : string;
    constructor(private router: Router, public http: HttpService,private logger: Logger) {
        this.className = "SavingsPlusFundResolveService";
    }

    resolve(route: ActivatedRouteSnapshot): Observable<boolean | Fund[]> {

        return this.http.get('/getSavingsPlusFunds').map(output => {
            if (output) {
                this.logger.debug(this.className," output >>> ", output);
                return output as Fund[];
            } else {
                this.router.navigate(['/cash']);
                return false;
            }
        });
    }
}
