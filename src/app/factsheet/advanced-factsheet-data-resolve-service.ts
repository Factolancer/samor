import {Injectable} from "@angular/core";
import {Router, Resolve, ActivatedRouteSnapshot, Params} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {FactsheetService} from "./factsheet.service";

@Injectable()
export class AdvancedFactsheetDataResolveService implements Resolve<any> {
    constructor(private router: Router, private factsheetService: FactsheetService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<boolean | any> {

        // let id = ; // (+) converts string 'id' to a number
        return this.factsheetService.getAdvancedFactsheet(+route.params['id']).map(output => {
            if (output) {
                return output;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        });


    }
}
