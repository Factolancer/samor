/**
 * Created by Fincash on 08-02-2017.
 */
import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {CheckKYCComponent} from "./kyc-status.component";
import {AadharKYCComponent} from "./aadhar-kyc/aadhar-kyc.component";


import {AuthGuard} from "../core/guards/auth.guard";

const kycRoutes: Routes = [
    {
        path: 'aadhar',
        component: AadharKYCComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'response/:encodedId',
        component: CheckKYCComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'aadhar/:userData',
        component: AadharKYCComponent,
        canActivate: [AuthGuard]
    }, {
        path: '',
        component: CheckKYCComponent,
        canActivate: [AuthGuard]
    }

];

export const kycRouting: ModuleWithProviders = RouterModule.forChild(kycRoutes);