import {NgModule} from "@angular/core";
import {BasicSectionModule} from "./sections/basic-section/basic-section.module";
import {RegistrationComponent} from "./registration.component";
import {registrationrouting} from "./registration.routing";
import {KycSectionModule} from "./sections/kyc-section/kyc-section.module";
import {BankSectionModule} from "./sections/bank-section/bank-section.module";
import {OtherSectionModule} from "./sections/other-section/other-section.module";
import {UploadSectionModule} from "./sections/upload-section/upload-section.module";
import {JsonpModule} from "@angular/http";
import {SharedModule} from "../shared/shared.module";
import {UserService} from "./userdata.service";
import {NomineeSectionModule} from "./sections/nominee-section/nominee-section.module";
import {RegistrationCompleteComponent} from "./registration-complete.component";
import {RegistrationWaitComponent} from "./registration-wait.component";
import {ActivationPendingComponent} from "./activation-pending.component";
import {DateAdapter, MdNativeDateModule} from "@angular/material";
import {FincashDateAdapter} from "../shared/Fincash-date-adapter";
import {OTPService} from "../kyc-status/otp-service";

@NgModule({
    imports: [
        registrationrouting,
        JsonpModule,
        SharedModule,
        BasicSectionModule,
        KycSectionModule,
        BankSectionModule,
        OtherSectionModule,
        UploadSectionModule,
        NomineeSectionModule,
        MdNativeDateModule
    ],
    providers: [UserService, OTPService, { provide: DateAdapter, useClass: FincashDateAdapter }],
    declarations: [RegistrationComponent, /*EKycComonent, */RegistrationCompleteComponent, RegistrationWaitComponent,
                    ActivationPendingComponent],
})
export class RegistrationModule {
}