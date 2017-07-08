import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AdvancedFactsheetComponent} from "./advanced-factsheet.component";
import {AdvancedFactsheetDataResolveService} from "./advanced-factsheet-data-resolve-service";


const factsheetRoutes: Routes = [
    {
        path: 'factsheet',
        children: [
            {
                path: ':id',
                component: AdvancedFactsheetComponent,
                resolve: {
                    factsheetData: AdvancedFactsheetDataResolveService
                }
            }
        ]
    }
];

export const factsheetRouting: ModuleWithProviders = RouterModule.forChild(factsheetRoutes);


