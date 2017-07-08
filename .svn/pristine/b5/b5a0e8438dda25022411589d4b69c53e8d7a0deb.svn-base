import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExploreFundsComponent} from "./explore-funds.component";


const exploreFundRoutes: Routes = [
    {
        path: '',
        component: ExploreFundsComponent,
    },
    {path: 'compare', loadChildren: 'app/compare/compare.module#CompareModule'},
];

export const exploreFundRouting: ModuleWithProviders = RouterModule.forChild(exploreFundRoutes);
