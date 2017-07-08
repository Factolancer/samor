import {Component, OnInit, OnDestroy, ViewContainerRef} from "@angular/core";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {FundSearchResults} from "./fund-search-results";
import {Title} from "@angular/platform-browser";
import {FundSearchInput} from "./fund-search-input";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/take";
import {ExploreFundsService} from "../core/services/explore-funds.service";
import {CompareService} from "../core/services/compare.service";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";
import {Fund} from "../models/fund";
import {Logger} from "../core/logger/logger";
import {SnackBarService} from "../core/services/snack-bar.service";
import {HeaderService} from "../core/services/header.service";
import {Observable} from "rxjs/Observable";
import {TitleService} from "../core/services/title.service";


@Component({
    selector: 'app-explore-funds',
    templateUrl: './explore-funds.component.html',
    styleUrls: ['./explore-funds.styles.scss']
})
export class ExploreFundsComponent implements OnInit, OnDestroy {

    searchResults: FundSearchResults;
    searchInputSubscription: Subscription;
    compareFundSubscription: Subscription;
    routeInputSubscription: Subscription;
    showFilterContent: boolean;
    //searchType: string;
    pageHeading: string;
    compareFundList: Fund[];
    //funds: Observable<Fund[]>;
    showComparisonList: boolean;
    searchInput: FundSearchInput;
    className: string;

    constructor(private route: ActivatedRoute, private router: Router,
                private exploreFundsService: ExploreFundsService, private titleService: Title,
                private compareService: CompareService, private urlAccessGuard: URLAccessGuard,
                private snackBarService: SnackBarService, private viewContainerRef: ViewContainerRef,
                private logger: Logger, private headerService : HeaderService, private metaService: TitleService) {
            this.className = "ExploreFundsComponent";

    }

    ngOnInit() {
        // show progress bar
//        this.headerService.onDemandProgressBar();
        this.logger.debug(this.className, "This view has been initialised");
        this.titleService.setTitle("Explore & Invest in Mutual Fund Schemes with Fincash");
        this.metaService.setMetaTags('explore_all');
        this.showComparisonList = false;
        //for managing fund compare criteria changes
        this.compareFundSubscription = this.compareService.compareData.subscribe(fundList => {
            this.compareFundList = fundList;
            if (this.compareFundList.length == 0) {
                this.showComparisonList = false;
            }
            if (this.searchResults) {
                this.checkAgainstComparisonList();
            }
        });

        this.route.params.switchMap((params: Params) => {
            this.logger.debug(params);
            return this.exploreFundsService.getSearchFundFromRoute(params);
        }).subscribe(searchInput => {
            this.headerService.onDemandProgressBar();
            this.searchInput = searchInput;
            this.logger.debug(this.className, "emitting search Input");
            this.exploreFundsService.setFundSearchInput(searchInput);
            this.titleService.setTitle(this.exploreFundsService.getExploreTitle(searchInput));
            this.logger.debug(this.className, searchInput);
            this.exploreFundsService.search(searchInput).subscribe(results => {
                this.searchResults = results;
                this.checkAgainstComparisonList();
                this.exploreFundsService.setFundSearchResult(results);
                this.logger.debug(results);
                Observable.interval(2000).take(1).subscribe(()=>{
                    this.headerService.cancelOnDemandProgressBar();
                })
                //this.exploreFundsService.setTotalFundCount(this.searchResults.numFound);
            });
        });

    }


    //checking if the fund is in comparison list then it is updated else it is not marked
    checkAgainstComparisonList() {
        if (this.compareFundList.length > 0 && this.searchResults.funds.length > 0) {
            this.searchResults.funds.forEach(fund => {
                let fundExists = false;
                this.compareFundList.forEach(comparisonFund => {
                    if (comparisonFund.id == fund.id)
                        fundExists = true;
                })
                if (fundExists) {
                    fund.selected = true;
                } else {
                    fund.selected = false;
                }
            })
        } else {
            this.searchResults.funds.forEach(fund => fund.selected = false)
        }
    }

    /*setPageTitle() {
     let title;
     switch (this.searchType) {
     case ExploreFundConstants.ALL_FUNDS:
     title = "All Funds";
     break;
     case ExploreFundConstants.ELSS_FUNDS:
     title = "ELSS Funds";
     break;
     case ExploreFundConstants.SIP_FUNDS:
     title = "SIP Funds";
     break;
     }
     this.pageHeading = title;
     }*/

    compare() {
        if (this.compareFundList.length < 2) {
            this.snackBarService.showSnackBar("Add atleast 2 funds for comparison", "Okay", this.viewContainerRef);
        } else {
            this.urlAccessGuard.allow = true;
            this.router.navigate(["compare"], {relativeTo: this.route});
        }
    }

    emptyCompare() {
        this.compareService.removeAllFromCompare();

    }

    removeCompareFund(fund: Fund) {
        this.compareService.removeFromCompare(fund.id);
    }

    ngOnDestroy() {
        // this.searchInputSubscription.unsubscribe();
        this.compareFundSubscription.unsubscribe();
    }

}