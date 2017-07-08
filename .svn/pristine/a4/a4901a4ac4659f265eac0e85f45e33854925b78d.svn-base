import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {AuthGuard} from "../core/guards/auth.guard";

const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {path: 'report', loadChildren: 'app/report/report.module#ReportModule'},
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);


