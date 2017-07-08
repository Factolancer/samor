/**
 * Created by Fincash on 16-09-2016.
 */
import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {RegistrationComponent} from "./registration.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {UploadSectionComponent} from "./sections/upload-section/upload-section.component";
import {RegistrationCompleteComponent} from "./registration-complete.component";
import {RegistrationWaitComponent} from "./registration-wait.component";
import {ActivationPendingComponent} from "./activation-pending.component";

export const registrationRoutes: Routes = [
    {path: 'kyc', loadChildren: 'app/kyc-status/kyc-status.module#KYCStatusdModule'},
    {
        path: 'upload',
        component: UploadSectionComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'upload/:userData',
        component: UploadSectionComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'wait',
        component: RegistrationWaitComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'complete',
        component: RegistrationCompleteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'activation-pending',
        component: ActivationPendingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':path',
        component: RegistrationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: RegistrationComponent,
        canActivate: [AuthGuard]
    },


    /*{
     path: 'ekyc',
     component: EKycComonent,
     canActivate: [AuthGuard]
     }*/
];

export const registrationrouting: ModuleWithProviders = RouterModule.forChild(registrationRoutes);
