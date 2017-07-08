import {Injectable} from "@angular/core";
import {HttpService} from "../core/services/http-service.service";

@Injectable()
export class TaxService {

    constructor(private httpService: HttpService) {
    }

    getTaxSaverFunds() {
        return this.httpService.get("/fund/getTaxSaverFunds");
    }

}
