import {Injectable} from "@angular/core";
import {IRR} from "./irr";
import {HttpService} from "../../core/services/http-service.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class IRRService {

    irrdata: any;
    constructor(public http: HttpService) {
    }

    getIRRData(): Observable<IRR[]> {
        return this.http.secureGet('/fund/getIrr')
            .map(res => res as IRR[])
    }

    // getIRRData(){
    //     return this.http.get('/fund/getIrr')
    //         .subscribe(output => {
    //                 this.irrdata = output as IRR[]
    //             console.log(this.irrdata);
    //             return this.irrdata;
    //             }
    //         )
    //
    // }
}
