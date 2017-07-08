import {Component, OnInit, OnDestroy} from "@angular/core";
import {FilterData} from "./filter-data";
import {ExploreFundsService} from "../../core/services/explore-funds.service";
import {Subscription} from "rxjs/Subscription";
import {FundSearchInput} from "../fund-search-input";

@Component({
    selector: 'app-age-filter',
    templateUrl: './age-filter.component.html',
    styleUrls: ['./filters.styles.scss']
})
export class AgeFilterComponent implements OnInit,OnDestroy {

    ageFilterData: FilterData[];
    filterTitle: string;
    selectedAge: string;
    searchInputSubscription: Subscription;
    searchFacetSubscription: Subscription;
    searchInput: FundSearchInput;

    constructor(private exploreFundsService: ExploreFundsService) {

    }

    filter() {
        this.searchInput.ag = +this.selectedAge;
        this.exploreFundsService.filterFunds(this.searchInput);
    }

    clearFilter() {
        this.selectedAge = "";
        this.searchInput.ag = 0;
        this.exploreFundsService.filterFunds(this.searchInput);
    }

    ngOnInit() {
        this.filterTitle = "Fund Age";
        this.selectedAge = "";

        this.searchInputSubscription = this.exploreFundsService.fundSearchInput
            .subscribe(searchInput => {
                this.searchInput = searchInput;
                this.selectedAge = this.searchInput.ag.toString();
            });

        this.searchFacetSubscription = this.exploreFundsService.fundSearchFacet.subscribe(facets => {
            if(facets.ageFilterData) {
                this.ageFilterData = facets.ageFilterData;
            }
        })

    }

    ngOnDestroy() {
        this.searchInputSubscription.unsubscribe();
        this.searchFacetSubscription.unsubscribe();
    }

}
