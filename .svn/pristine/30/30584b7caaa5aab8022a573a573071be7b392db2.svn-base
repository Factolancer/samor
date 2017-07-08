import {Component, OnInit, OnDestroy} from "@angular/core";
import {FundSearchInput} from "../fund-search-input";
import {Subscription} from "rxjs/Subscription";
import {ExploreFundsService} from "../../core/services/explore-funds.service";
import {ExploreFundConstants} from "../explore-funds.constants";
import {FilterData} from "./filter-data";
import {Logger} from "../../core/logger/logger";

@Component({
    selector: 'app-aum-filter',
    templateUrl: './aum-filter.component.html',
    styleUrls: ['./filters.styles.scss']
})
export class AumFilterComponent implements OnDestroy, OnInit {

    aumFilterData: FilterData[] = [];
    filterTitle: string;
    searchInputSubscription: Subscription;
    searchFacetSubscription: Subscription;
    searchInput: FundSearchInput;
    checkedCount = 0;

    constructor(private exploreFundsService: ExploreFundsService, private logger: Logger) {

    }

    filter(checked: any, item: FilterData) {
        if (checked) {
            item.selected = true;
            this.searchInput.ar.push(this.getRangeVal(item.id));
        } else {
            item.selected = false;
            this.searchInput.ar = this.searchInput.ar.filter(oldVal => oldVal != this.getRangeVal(item.id))
        }
        this.updateCheckedCount();
        this.logger.debug("AUMFilterComponent", this.searchInput.ar, this.aumFilterData);
        this.exploreFundsService.filterFunds(this.searchInput);

    }


    clearFilter() {
        this.checkedCount = 0;
        this.searchInput.ar = [];
        this.exploreFundsService.filterFunds(this.searchInput);
        this.aumFilterData.forEach(listItem => {
            listItem.selected = false;
        });
    }

    updateCheckedCount() {
        this.checkedCount = 0;
        this.aumFilterData.forEach(filterData => {
            if (filterData.selected) {
                this.checkedCount += 1;
            }
        })
    }


    ngOnInit() {
        this.filterTitle = "AUM";

        this.searchInputSubscription = this.exploreFundsService.fundSearchInput
            .subscribe(searchInput => {
                this.searchInput = searchInput;

                this.aumFilterData.forEach(filterData => {
                    if (this.searchInput.ar.indexOf(this.getRangeVal(filterData.id)) > -1) {
                        filterData.selected = true;
                    } else {
                        filterData.selected = false;
                    }
                })
                this.updateCheckedCount();

            });

        this.searchFacetSubscription = this.exploreFundsService.fundSearchFacet.subscribe(facets => {
            this.aumFilterData = [];
            //removing those searchSuggestions which have been already checked

            if (facets.aumFilterData) {
                facets.aumFilterData.forEach(listItem => {
                 if (this.aumFilterData.indexOf(listItem) > -1)
                 listItem.selected = true
                 });
                this.aumFilterData = facets.aumFilterData;
                this.updateDisplayName();
                 this.aumFilterData.forEach(filterData => {
                 if (this.searchInput.ar.indexOf(this.getRangeVal(filterData.id)) > -1) {
                 filterData.selected = true;
                 }
                 });
                //this.checkedCount = 0;
                this.updateCheckedCount();
            }

        })
    }

    updateDisplayName() {
        this.aumFilterData.forEach(filterData => {
            switch (filterData.id) {
                case "0": {
                     filterData.name = "Below 100 Cr"
                    break;
                }
                case "100": {
                    filterData.name = "100 to 500 Cr"
                    break;
                }
                case "500": {
                    filterData.name = "500 to 1,000 Cr"
                    break;
                }
                case "1000": {
                    filterData.name = "1,000 to 2,000 Cr"
                    break;
                }
                case "2000": {
                    filterData.name = "2,000 to 5,000 Cr"
                    break;
                }
                case "5000": {
                    filterData.name = "5,000 to 10,000 Cr"
                    break;
                }
                case "10000": {
                    filterData.name = "Above 10,000 Cr"
                    break;
                }
            }
        })
    }

    getRangeVal(val: string) : string {
        switch(val) {
            case "0": {
                return "0 TO 100"
            }
            case "100": {
                return "100 TO 500"
            }
            case "500": {
                return "500 TO 1000"
            }
            case "1000": {
                return "1000 TO 2000"
            }
            case "2000": {
             return "2000 TO 5000"
            }
            case "5000": {
                return "5000 TO 10000"
            }
            case "10000": {
                return "10000 TO 50000"
            }
            default : {
                return "sumit"
            }
        }
    }

    ngOnDestroy() {
        this.searchInputSubscription.unsubscribe();
        this.searchFacetSubscription.unsubscribe();
    }

    /*searchInput: FundSearchInput;
     searchInputSubscription: Subscription;
     filterTitle: string;
     minAUM = 0;
     maxAUM = 30000;
     selectedMin = this.minAUM;
     selectedMax = this.maxAUM;

     constructor(private exploreFundsService: ExploreFundsService) {

     }

     filter() {
     if (this.selectedMin > this.selectedMax) {
     this.selectedMax = this.selectedMin;
     }
     this.searchInput.ar = this.selectedMin + " TO " + this.selectedMax;
     this.exploreFundsService.filterFunds(this.searchInput);
     }

     clearFilter() {
     this.selectedMin = this.minAUM;
     this.selectedMax = this.maxAUM;
     this.searchInput.ar = "";
     //this.searchInput.ar = this.selectedMin + " TO " + this.selectedMax;
     this.exploreFundsService.filterFunds(this.searchInput);
     }

     ngOnInit() {
     this.filterTitle = "AUM";

     this.searchInputSubscription = this.exploreFundsService.fundSearchInput.subscribe(
     searchInput => {
     this.searchInput = searchInput;
     if (searchInput.qt == ExploreFundConstants.SEARCH_QUERY) {
     this.selectedMin = this.minAUM;
     this.selectedMax = this.maxAUM;
     } else {
     if (this.searchInput.ar) {
     let range: string[] = this.searchInput.ar.split(' ');
     this.selectedMin = +range[0];
     this.selectedMax = +range[2];
     }
     }
     }
     )

     /!*this.exploreFundsService.getFilterData("/sip/getAUMRange").subscribe(
     output => {
     this.minAUM = output.min;
     this.maxAUM = output.max;
     });*!/
     }

     ngOnDestroy() {
     this.searchInputSubscription.unsubscribe();
     }*/

}
