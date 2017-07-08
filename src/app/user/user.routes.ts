import {RouterModule} from "@angular/router";
import {UserComponent} from "./user.component";
import {ModuleWithProviders} from "@angular/core";

const userRoutes = [
    {
        path: 'user',
        children: [
            {
                path: '',
                component: UserComponent
            }

        ]

    }
];

export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);