import {Injectable} from "@angular/core";
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {WatchlistService} from "./watchlist.service";
import {Scheme} from "./scheme";
import {Logger} from "../core/logger/logger";
import {Observable} from "rxjs/Observable";
import {isNull, isNullOrUndefined} from "util";

@Injectable()
export class WatchlistResolveService implements Resolve<boolean | Scheme[]> {

    schemedata: Scheme[];
    className : string;
    constructor(private router: Router, private watchService: WatchlistService, private logger : Logger) {
        this.className = "WatchlistResolveService";
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | Scheme[]> {

        return this.watchService.getWatchlistData().map(output => {
            if (!isNullOrUndefined(output)){
                this.schemedata = output as Scheme[];
                this.logger.debug(this.className,this.schemedata);
                return this.schemedata;
            }
            else {
                return false;
            }

        });
    }
}
