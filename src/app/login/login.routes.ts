import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginToInvestComponent} from "./logintoinvest.component";
import {ForgotPasswordComponent} from "./forgot-password.component";
import {ResetPasswordComponent} from "./reset-password.component";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";
import {SocialLoginComponent} from "./social-login.component";
import {LoginCheckGuard} from "../core/guards/loginCheck.guard";


const loginRoutes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'password-assistance/forgot',
                component: ForgotPasswordComponent,
                canActivate: [URLAccessGuard]
            },{
                path: 'password-assistance/reset/:key',
                component: ResetPasswordComponent

            },
            {
                path: 'status/failure',
                component: SocialLoginComponent
            },
            {
                path: 'status/success/:token',
                component: SocialLoginComponent
            },
            {
                path: ':path',
                component: LoginToInvestComponent,
                canActivate: [LoginCheckGuard]
            }

        ]

    }
];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);
