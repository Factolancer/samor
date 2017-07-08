import {Component, OnDestroy, OnInit} from "@angular/core";
import {ExploreFundsService} from "../core/services/explore-funds.service";
import {FundSearchResults} from "./fund-search-results";
import {Subscription} from "rxjs/Subscription";
import {ExploreFundConstants} from "./explore-funds.constants";
import {FundSearchInput} from "./fund-search-input";
import {Logger} from "../core/logger/logger";

@Component({
    selector: 'app-fund-pagination-panel',
    templateUrl: './fund-pagination-panel.component.html',
    styleUrls: ['./explore-funds.styles.scss']
})
export class FundPaginationPanelComponent implements OnInit,OnDestroy {

    displayPageNumbers: number[] = [];
    currentPosition: number;
    totalPages: number;
    paginationSize: number = 4;
    searchResultsSubscription: Subscription;
    searchInputSubscription: Subscription;
    searchInputFrom: number;
    searchInputRows: number;
    totalNumFound: number;
    searchInput: FundSearchInput;
    className : string;
    constructor(private exploreFundsService: ExploreFundsService, private logger: Logger) {
        this.className = "FundPaginationPanelComponent";
    }

    ngOnInit() {

        this.searchInputSubscription = this.exploreFundsService.fundSearchInput.subscribe(
            (searchInput: FundSearchInput) => {
                this.searchInput = searchInput;
            }
        )


        this.searchResultsSubscription = this.exploreFundsService.fundSearchResult.subscribe(
            (searchResults: FundSearchResults) => {
                this.logger.debug(this.className, searchResults);
                this.searchInputFrom = this.searchInput.f;
                this.searchInputRows = this.searchInput.r;
                this.currentPosition = Math.floor(this.searchInput.f / this.searchInput.r);
                this.totalNumFound = searchResults.numFound;
                this.totalPages = Math.ceil(this.totalNumFound / this.searchInputRows);
                this.setDisplayPageNumbers();
            });


    }


//used for moving to next page on the searchBarInput reults
    next() {
        this.searchInput.f = this.searchInput.f + this.searchInput.r;
        this.searchInput.qt = ExploreFundConstants.PAGE_QUERY;
        this.exploreFundsService.navigateToExplore(this.searchInput);
    }

//used for moving to previous page on searchBarInput results
    prev() {
        this.searchInput.f = this.searchInput.f - this.searchInput.r;
        this.searchInput.qt = ExploreFundConstants.PAGE_QUERY;
        this.exploreFundsService.navigateToExplore(this.searchInput);
    }

    setDisplayPageNumbers() {
        let start = 0;
        let end = this.paginationSize;
        let middle = this.paginationSize / 2;

        this.displayPageNumbers = [];

        if (this.currentPosition <= middle) {
            //case when current position < middle
            if (this.totalPages - this.paginationSize > 0)
                start = this.min(0, this.totalPages - this.paginationSize);
            end = this.min(this.totalPages, this.paginationSize);
        } else if ((middle < this.currentPosition ) &&
            (this.currentPosition < (this.totalPages - middle))) {
            //case when current position in in between
            start = this.currentPosition - middle;
            end = this.currentPosition + middle;
        } else if (this.currentPosition >= (this.totalPages - middle)) {
            //case when current position belongs to somewhere towards the end
            start = this.max(0, this.totalPages - this.paginationSize);
            end = this.totalPages;
        }

        for (let i = start; i < end; i++) {
            this.displayPageNumbers.push(i);
        }

    }

    max(a: number, b: number) {
        if (a >= b)
            return a;
        else
            return b;
    }

    min(a: number, b: number) {
        if (a <= b)
            return a;
        else
            return b;
    }

    gotoPage(value: number) {
        this.logger.debug(this.className,value);
        this.searchInput.f = this.searchInput.r * value;
        this.searchInput.qt = ExploreFundConstants.PAGE_QUERY;
        this.exploreFundsService.navigateToExplore(this.searchInput);
    }

    ngOnDestroy() {
        this.searchResultsSubscription.unsubscribe();
    }

}
