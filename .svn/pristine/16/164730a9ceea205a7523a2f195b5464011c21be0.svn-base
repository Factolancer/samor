import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import { WatchlistComponent } from './watchlist.component';
import {watchlistRouting} from "./watchlist.routes";
import {WatchlistViewComponent} from "./watchlist-view/watchlist-view.component";
import {WatchlistService} from "./watchlist.service";
import {WatchlistResolveService} from "./WatchlistResolveService";

@NgModule({
  imports: [
    SharedModule,
    watchlistRouting
  ],
  providers: [WatchlistService, WatchlistResolveService],
  declarations: [WatchlistComponent, WatchlistViewComponent]
})
export class WatchlistModule { }
