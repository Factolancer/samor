import {NgModule} from "@angular/core";
import {ExploreFundsComponent} from "./explore-funds.component";
import {FundPaginationPanelComponent} from "./fund-pagination-panel.component";
import {FundViewPanelComponent} from "./fund-view-panel.component";
import {FundComponent} from "./fund.component";
import {exploreFundRouting} from "./explore-funds.routes";
import {SharedModule} from "../shared/shared.module";
import {FactsheetModule} from "../factsheet/factsheet.module";
import {CartModule} from "../cart/cart.module";
import {FundSearchBarComponent} from "./fund-search-bar.component";
import {AgeFilterComponent} from "./filters/age-filter.component";
import {AmcFilterComponent} from "./filters/amc-filter.component";
import {AumFilterComponent} from "./filters/aum-filter.component";
import {CategoryFilterComponent} from "./filters/category-filter.component";
import {MoreDataComponent} from "./filters/more-data.component";
import {RatingFilterComponent} from "./filters/rating-filter.component";
import {FilterTitleComponent} from "./filters/filter-title.component";
import {FilterMasterComponent} from "./filters/filter-master.component";
import {ChipsComponent} from "./filters/chips.component";
import {SubCategoryFilterComponent} from "./filters/sub-category-filter.component";

import {SortComponent} from './sort.component'

@NgModule({
    imports: [
        SharedModule,
        exploreFundRouting,
        FactsheetModule,
        CartModule
    ],
    declarations: [ExploreFundsComponent, FundComponent, FundViewPanelComponent,
        FundPaginationPanelComponent, FundSearchBarComponent, AgeFilterComponent,
        AmcFilterComponent, AumFilterComponent, CategoryFilterComponent, MoreDataComponent,
        RatingFilterComponent, FilterTitleComponent, FilterMasterComponent, ChipsComponent,
        SubCategoryFilterComponent, SortComponent],
    entryComponents: [SortComponent]
})
export class ExploreFundsModule {
}
