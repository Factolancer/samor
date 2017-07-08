import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReportComponent} from "./report.component";
import {AuthGuard} from "../core/guards/auth.guard";
/**
 * Created by fincash on 18-11-2016.
 */

const reportRoutes = [
    {
        path: ':id',
        component: ReportComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: ReportComponent,
        canActivate: [AuthGuard]
    }

];

export const portfolioReportRouting: ModuleWithProviders = RouterModule.forChild(reportRoutes);