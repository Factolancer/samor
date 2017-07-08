import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {CompareComponent} from "./compare.component";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";

const compareRoutes: Routes = [
    /*{
     path: '',
     redirectTo: 'compare',
     pathMatch: 'full'
     },*/
    {
        path: '',
        component: CompareComponent,
        canActivate: [URLAccessGuard]
    }
];

export const compareRouting: ModuleWithProviders = RouterModule.forChild(compareRoutes);


