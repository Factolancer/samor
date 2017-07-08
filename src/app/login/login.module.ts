import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {ForgotPasswordComponent} from "./forgot-password.component";
import {LoginToInvestComponent} from "./logintoinvest.component";
import {SharedModule} from "../shared/shared.module";
import {loginRouting} from "./login.routes";
import {ResetPasswordComponent} from "./reset-password.component";
import {SocialLoginComponent} from "./social-login.component";

@NgModule({
    imports: [
        SharedModule,
        loginRouting
    ],
    exports: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
    declarations: [LoginComponent, ForgotPasswordComponent, LoginToInvestComponent , ResetPasswordComponent, SocialLoginComponent],
    entryComponents: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent]
})
export class LoginModule {
}