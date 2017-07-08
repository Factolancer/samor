import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {TaxComponent} from "./tax.component";
import {TaxSaverComponent} from "./tax-saver/tax-saver.component";
import {TaxSaverFundResolveService} from "./tax-saver/tax-saver-fund-resolve.service";
import {TaxCalcComponent} from "./tax-calc/tax-calc.component";


const taxRoutes: Routes = [
    {
        path: 'tax',
        children: [
            {
                path: 'taxsaver',
                component: TaxSaverComponent,
                resolve: {
                    funds: TaxSaverFundResolveService,
                }
            },
            {
                path: '',
                component: TaxComponent,
            }
        ]
    }
];

export const taxRouting: ModuleWithProviders = RouterModule.forChild(taxRoutes);

