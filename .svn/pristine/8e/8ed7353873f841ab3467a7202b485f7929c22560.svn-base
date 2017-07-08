import {Injectable} from "@angular/core";
import {HttpService} from "../core/services/http-service.service";

@Injectable()
export class SipService {

    constructor(private httpService: HttpService) {
    }

    getQuickSipFunds() {
        return this.httpService.get("/sip/getQuickSipFunds");
    }

}
