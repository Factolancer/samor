import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TaxCalcComponent} from "./tax-calc.component";
import {URLAccessGuard} from "../../core/guards/urlAccess.guard";
import {TaxCalcResultsComponent} from "./tax-calc-results.component";


const taxCalcRoutes: Routes = [
    {
        path: 'tax',
        children: [
            {
                path: '',
                component: TaxCalcComponent
            },
            {
                path: 'results',
                component: TaxCalcResultsComponent,
                canActivate: [URLAccessGuard]
            },
        ]
    },


];

export const taxCalculatorRouting: ModuleWithProviders = RouterModule.forChild(taxCalcRoutes);

