import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WatchlistComponent} from "./watchlist.component";
import {WatchlistResolveService} from "./WatchlistResolveService";


const watchlistRoutes: Routes = [
    {
        path: 'watchlist',
        component: WatchlistComponent,
        resolve: {
            watchlistProducts: WatchlistResolveService,
        }
    }
];

export const watchlistRouting: ModuleWithProviders = RouterModule.forChild(watchlistRoutes);
