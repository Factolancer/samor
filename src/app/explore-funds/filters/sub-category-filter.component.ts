import {Component, OnInit, OnDestroy} from "@angular/core";
import {FilterData} from "./filter-data";
import {ExploreFundsService} from "../../core/services/explore-funds.service";
import {Subscription} from "rxjs/Subscription";
import {FundSearchInput} from "../fund-search-input";
import {Logger} from "../../core/logger/logger";

@Component({
    selector: 'app-sub-category-filter',
    templateUrl: './sub-category-filter.component.html',
    styleUrls: ['./filters.styles.scss']
})
export class SubCategoryFilterComponent implements OnInit, OnDestroy {

    subCategoryFilterData: FilterData[] = [];
    filterTitle: string;
    checkedCount = 0;
    searchFacetSubscription: Subscription;
    searchInputSubscription: Subscription;
    searchInput: FundSearchInput;

    constructor(private exploreFundsService: ExploreFundsService, private logger: Logger) {

    }

    filter(checked: any, item: FilterData) {
        if (checked) {
            item.selected = true;
        } else {
            item.selected = false;
        }
        this.updateCheckedCount();
        this.logger.debug("SubCategoryFilterComponent", this.getSelectedSubCategoryArray(), this.subCategoryFilterData);
        this.searchInput.sc = this.getSelectedSubCategoryArray();
        this.exploreFundsService.filterFunds(this.searchInput);

    }

    clearFilter() {
        this.checkedCount = 0;
        this.searchInput.sc = [];
        this.exploreFundsService.filterFunds(this.searchInput);
        this.subCategoryFilterData.forEach(listItem => {
            listItem.selected = false;
        });
    }

    updateCheckedCount() {
        this.checkedCount = 0;
        this.subCategoryFilterData.forEach(filterData => {
            if (filterData.selected) {
                this.checkedCount += 1;
            }
        })
    }

    getSelectedSubCategoryArray() {
        let subCategoryList: string[] = [];
        this.subCategoryFilterData.forEach(filterData => {
            if (filterData.selected) {
                subCategoryList.push(filterData.id)
            }
        });
        return subCategoryList;
    }


    ngOnInit() {
        this.filterTitle = "Sub Category";

        this.searchInputSubscription = this.exploreFundsService.fundSearchInput
            .subscribe(searchInput => {
                this.searchInput = searchInput;
                this.subCategoryFilterData.forEach(filterData => {
                    if (this.searchInput.sc.indexOf(filterData.id) > -1) {
                        filterData.selected = true;
                    } else {
                        filterData.selected = false;
                    }
                })
                this.updateCheckedCount();

            });

        this.searchFacetSubscription = this.exploreFundsService.fundSearchFacet.subscribe(facets => {
            if (facets.subCategoryFilterData) {
                facets.subCategoryFilterData.forEach(listItem => {
                    if (this.subCategoryFilterData.indexOf(listItem) > -1)
                        listItem.selected = true
                });
                this.subCategoryFilterData = facets.subCategoryFilterData;

                this.subCategoryFilterData.forEach(filterData => {
                    if (this.searchInput.sc.indexOf(filterData.id) > -1) {
                        filterData.selected = true;
                    }
                });

                this.updateCheckedCount();
            }
        })

    }

    ngOnDestroy() {
        this.searchInputSubscription.unsubscribe();
        this.searchFacetSubscription.unsubscribe();
    }


}