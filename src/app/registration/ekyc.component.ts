/*
import {Component} from "@angular/core";
import {KYCService} from "./kyc.service";
import {Observable} from "rxjs/Observable";
import {Headers} from "@angular/http";
import {Router} from "@angular/router";
import {HttpService} from "../core/services/http-service.service";

@Component({
    selector: 'app-ekyc',
    templateUrl: './ekyc.component.html',
    styleUrls: ['./registration.styles.scss'],
    providers: [KYCService]
})

export class EKycComonent {

    constructor(public router: Router, public http: HttpService){}

    showKyc: Observable<any>;
    uatUrl = "https://eiscuat1.camsonline.com/ekycuat3/eKYCVal_Aadhar.aspx";
    returnUrl = "http://localhost/";
    pan = "ALDPN3048F";
    aadhar = "321463430696";// "386739705452";
    appID = "fincash";
    userId = "UECH_SHEP";
    password = "HzK6$g3";
    intermediaryId = "B";
    kyc_data = this.pan + "|pareshnagore@gmail.com|7032909303|fincash|" + this.userId + "|" + this.password + "|B|MFKYC2" //9952302214

    public headers = new Headers();

    postData = {
        Aadhar: this.aadhar,
        url: this.returnUrl,
        kyc_data: this.pan + "||9952302214|fincash|" + this.userId + "|" + this.password + "|B|MFKYC"
    }

    queryString = "&Aadhar=" + this.aadhar + "&url=" + this.returnUrl + "&kyc_data=" + this.kyc_data;

    test(){
        this.router.navigateByUrl("http://www.google.com")
    }
    CheckKYC(){
        this.http.post('/checkKYC', {"pan": "ALDPN3048F"})
            .subscribe(result => {
                //console.log(result);
            })
    }
}*/
