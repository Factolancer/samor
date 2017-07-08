import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ExploreFundConstants} from "../explore-funds.constants";
import {ExploreFundsService} from "../../core/services/explore-funds.service";
import {FundSearchInput} from "../fund-search-input";

@Component({
    selector: 'app-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./filters.styles.scss']
})
export class ChipsComponent implements OnInit, OnDestroy {

    searchInputSubscription: Subscription;
    searchInput: FundSearchInput;
    chipsDisplayList: [string, string, string][] = [];

    constructor(private exploreFundsService: ExploreFundsService) {

    }

    removeAllFilter() {
        this.exploreFundsService.navigateToExplore(this.exploreFundsService.getDefaultFundSearchInput());
    }


    removeFilter(data: [string, string, string], index: number) {
        this.chipsDisplayList = this.chipsDisplayList.filter((data, idx) => idx != index);

        switch (data[0]) {
            case ExploreFundConstants.AGE_FILTER:
                this.searchInput.ag = 0;
                break;
            case ExploreFundConstants.RATING_FILTER:
                this.searchInput.ra = this.searchInput.ra.filter(rate => rate != +data[1]);
                break;
            case ExploreFundConstants.CATEGORY_FILTER:
                this.searchInput.c = this.searchInput.c.filter(cat => cat != data[1]);
                break;
            case ExploreFundConstants.AUM_FILTER:
                this.searchInput.ar = this.searchInput.ar.filter(aum => aum != data[1]);
                break;
            case ExploreFundConstants.SUBCATEGORY_FILTER:
                this.searchInput.sc = this.searchInput.sc.filter(subCat => subCat != data[1]);
                break;
            case ExploreFundConstants.AMC_FILTER:
                this.searchInput.am = this.searchInput.am.filter(amc => amc != data[1]);
                break;
            case ExploreFundConstants.OTHER_SEARCH:
                this.searchInput.o = "";
                break;
            case ExploreFundConstants.KEYWORD_SEARCH:
                this.removeAllFilter();
                return
            default:
                break;
        }

        this.exploreFundsService.filterFunds(this.searchInput);
    }

    ngOnInit() {

        this.searchInputSubscription = this.exploreFundsService.fundSearchInput
            .subscribe(searchInput => {
                this.searchInput = searchInput;

                if (searchInput.qt == ExploreFundConstants.SEARCH_QUERY) {
                    this.chipsDisplayList = [];
                }

                //populating chips display list
                this.chipsDisplayList = [];

                //other
                if (this.searchInput.o.length > 0) {
                    this.chipsDisplayList.push([ExploreFundConstants.OTHER_SEARCH, this.searchInput.o, this.searchInput.o]);
                }

                //keyword
                if (this.searchInput.q.length > 0) {
                    this.chipsDisplayList.push([ExploreFundConstants.KEYWORD_SEARCH, this.searchInput.q, this.searchInput.q]);
                }

                //AMC
                if (this.searchInput.am.length > 0) {
                    this.searchInput.am.forEach(amc => {
                        this.chipsDisplayList.push([ExploreFundConstants.AMC_FILTER, amc, amc]);
                    })
                }

                //Category
                if (this.searchInput.c.length > 0) {
                    this.searchInput.c.forEach(cat => {
                        this.chipsDisplayList.push([ExploreFundConstants.CATEGORY_FILTER, cat, cat]);
                    })
                }

                //Sub-c
                if (this.searchInput.sc.length > 0) {
                    this.searchInput.sc.forEach(subCat => {
                        this.chipsDisplayList.push([ExploreFundConstants.SUBCATEGORY_FILTER, subCat, subCat]);
                    })
                }

                //AUM
                if (this.searchInput.ar.length > 0) {
                    this.searchInput.ar.forEach(aumRange => {
                        this.chipsDisplayList.push([ExploreFundConstants.AUM_FILTER, aumRange, aumRange + " Cr"])
                    })
                }
                //ra
                if (this.searchInput.ra.length > 0) {
                    this.searchInput.ra.forEach(rating => {
                        this.chipsDisplayList.push([ExploreFundConstants.RATING_FILTER, rating.toString(), rating + " Star"]);
                    })
                }
                //Age
                if (this.searchInput.ag != 0) {
                    this.chipsDisplayList.push([ExploreFundConstants.AGE_FILTER, this.searchInput.ag.toString(), this.searchInput.ag + " years & Up"]);
                }


            });

    }

    ngOnDestroy() {
        this.searchInputSubscription.unsubscribe();
    }

}
