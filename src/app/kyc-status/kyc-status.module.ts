/**
 * Created by Fincash on 08-02-2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {kycRouting} from "./kyc-status.routes";
import {CheckKYCComponent} from "./kyc-status.component";
import {AadharKYCComponent} from "./aadhar-kyc/aadhar-kyc.component";

import {OTPService} from "./otp-service";

@NgModule({
    imports: [
        SharedModule,
        kycRouting
    ],
    declarations: [CheckKYCComponent, AadharKYCComponent],/*
    entryComponents:[CheckKYCComponent, AadharKYCComponent],*/
    providers:[OTPService]
})
export class KYCStatusdModule {
}
