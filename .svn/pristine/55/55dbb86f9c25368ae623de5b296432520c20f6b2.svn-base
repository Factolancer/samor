import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/switchMap";

import {Fund} from "../models/fund";
import {ExploreFundsService} from "../core/services/explore-funds.service";
import {Logger} from "../core/logger/logger";
import {FundSearchInput} from "./fund-search-input";
import {ExploreFundConstants} from "./explore-funds.constants";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-fund-search-bar',
    templateUrl: './fund-search-bar.component.html',
    styleUrls: ['./explore-funds.styles.scss']
})
export class FundSearchBarComponent implements OnInit, OnDestroy {


    searchSuggestions: Observable<Fund[]>;
    private searchTermStream = new Subject<string>();

    searchInputSubscription: Subscription;
    searchInput: FundSearchInput;
    searchBarControl: FormControl;
    searchBarControlSubscription: Subscription;

    constructor(private exploreFundsService: ExploreFundsService, private logger: Logger) {
        this.searchBarControl = new FormControl();
    }


    searchForKeyword() {
        let defaultSearchInput = this.exploreFundsService.getDefaultFundSearchInput();
        let querySuggestion: string = "";
        if (this.searchBarControl.value['name']) {
            querySuggestion = this.searchBarControl.value['name']
        } else {
            querySuggestion = this.searchBarControl.value;
        }
        defaultSearchInput.q = querySuggestion;
        defaultSearchInput.r = this.searchInput.r;
        defaultSearchInput.qt = ExploreFundConstants.SEARCH_QUERY;
        this.exploreFundsService.navigateToExplore(defaultSearchInput);
    }

    ngOnInit() {

        this.searchSuggestions = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((term: string) => this.exploreFundsService.getFundAutoCompleteData(term).map(res => {
                this.logger.debug(res)
                return res;
            }));

        this.searchInputSubscription = this.exploreFundsService.fundSearchInput.subscribe(
            (searchInput: FundSearchInput) => {
                this.searchInput = searchInput;
                this.searchBarControl.setValue(searchInput.q);
            }
        )

        this.searchBarControlSubscription = this.searchBarControl.valueChanges.subscribe(controlVal => {
            this.logger.debug(controlVal);
            if (typeof controlVal === "object") {
                this.searchForKeyword();
                this.searchBarControl.setValue(controlVal['name'])
            } else {
                this.searchTermStream.next(controlVal);
            }
        })
    }

    ngOnDestroy() {
        this.searchTermStream.unsubscribe();
        this.searchInputSubscription.unsubscribe();
        this.searchBarControlSubscription.unsubscribe();
    }

}
