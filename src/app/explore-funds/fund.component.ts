import {Component, OnInit, ViewContainerRef, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ExploreFundsService} from '../core/services/explore-funds.service';
import {Input} from '@angular/core';
import {Fund} from '../models/fund';
import {FundSearchInput} from './fund-search-input';
import {ExploreFundConstants} from './explore-funds.constants';
import {MdDialogRef, MdDialog, MdDialogConfig} from '@angular/material';
import {BasicFactsheetComponent} from '../factsheet/basic-factsheet.component';
import {CompareService} from '../core/services/compare.service';
import {FactsheetService} from '../factsheet/factsheet.service';
import {Logger} from '../core/logger/logger';
import {InvestmentModeEnum} from '../enum/investment-mode-enum';
import {SnackBarService} from '../core/services/snack-bar.service';
import {disclaimers} from '../../properties/discalimers';

import { SortComponent } from './sort.component';
import {isNullOrUndefined} from "util";


@Component({
    selector: 'app-fund',
    templateUrl: './fund.component.html',
    styleUrls: ['./explore-funds.styles.scss']
})


export class FundComponent implements OnInit, OnDestroy {

    //inputs
    funds: Fund[] = [];
    @Input() showListView: boolean;
    @Input() showCardView: boolean;

    //subscriptions
    searchInputSubscription: Subscription;
    searchResultSubscription: Subscription;
    searchInput: FundSearchInput;

    //variables
    currentSortElement: string;
    sortState: string;
    comparisonStatus: [boolean, string];
    factsheetDialogRef: MdDialogRef<BasicFactsheetComponent>;
    defaultInvestmentMode: InvestmentModeEnum;
    ratingDisclaimerText: string;
    className : string;


    sortActive:boolean;
    filterActive:boolean;


    constructor(private exploreFundsService: ExploreFundsService, private compareService: CompareService,
                public dialog: MdDialog, private snackBarService: SnackBarService,
                private viewContainerRef: ViewContainerRef, private cdRef: ChangeDetectorRef,
                public factsheetService: FactsheetService, private logger: Logger) {
        this.className = "FundComponent";
        this.sortActive = false;
        this.filterActive = false;
    }

    //used for column level sorting of fields
    sort(value: string) {
        this.currentSortElement = value;
        if (this.searchInput.se === this.currentSortElement) {
            this.toggleSortOrder();
            if (this.sortState == ExploreFundConstants.SORT_NUETRAL) {
                this.searchInput.so = "";
                this.searchInput.se = "";
                this.currentSortElement = "";
            } else {
                this.searchInput.so = this.sortState;
            }
        } else {
            this.sortState = ExploreFundConstants.SORT_DESC;
            this.searchInput.so = this.sortState;
            this.searchInput.se = this.currentSortElement;
        }
        this.searchInput.f = 0;
        this.searchInput.qt = ExploreFundConstants.SORT_QUERY;
        this.exploreFundsService.navigateToExplore(this.searchInput);
    }



    //used for toggling the sort order
    toggleSortOrder() {
        if (this.sortState == ExploreFundConstants.SORT_DESC) {
            this.sortState = ExploreFundConstants.SORT_ASC;
        } else if (this.sortState == ExploreFundConstants.SORT_ASC) {
            this.sortState = ExploreFundConstants.SORT_NUETRAL;

        } else if (this.sortState == ExploreFundConstants.SORT_NUETRAL) {
            this.sortState = ExploreFundConstants.SORT_DESC;
        }
    }

    viewFactSheet(fund: Fund) {
        let config = this.factsheetService.getFactsheetDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.factsheetDialogRef = this.dialog.open(BasicFactsheetComponent, config);
        this.factsheetDialogRef.componentInstance.fund = fund;

    }


    addToCompare(fund: Fund) {
        if (fund.selected) {
            this.compareService.removeFromCompare(fund.id);
            fund.selected = false;
            this.cdRef.detectChanges();
        } else {

            this.comparisonStatus = this.compareService.addToCompare(fund);
            if (this.comparisonStatus[0]) {
                fund.selected = true;
                this.logger.debug(this.className,"fund added to compare!");
            } else {
                this.logger.debug(this.className,"fund not added to compare!");
                fund.selected = true;
                this.cdRef.detectChanges();
                fund.selected = false;
                this.cdRef.detectChanges();
                this.snackBarService.showSnackBar(this.comparisonStatus[1], "Okay", this.viewContainerRef);
            }
        }
    }

    public activeTab(i: number) {
        if ( i === 0 ) {
            this.filterActive = false;
            this.sortActive = !this.sortActive;

            let config = new MdDialogConfig();
            config.role = 'dialog';
            config.width = '60%';
            config.viewContainerRef = this.viewContainerRef;

            let dialogRef = this.dialog.open(SortComponent, config);
            let sortConfig = {
                sortActions: [['Fund Name', 'dname'], ['Rating', 'drat'], ['1Y Return', 'dret1yr'], ['3Y Return', 'dret3yr'],
                    ['Risk', 'drisk'], ['Age', 'dage'], ['AUM (Cr)', 'daum']],
                currentSortElement: this.currentSortElement,
                sortState: this.sortState
            };
            dialogRef.componentInstance.config = sortConfig;
            dialogRef.afterClosed().subscribe( (result) => {
                if (!isNullOrUndefined(result)) {
                    this.sort(result);
                }
            });
            }
        if ( i === 1) {
            this.sortActive = false;
            this.filterActive = !this.filterActive;
            let filterSub = this.exploreFundsService.closeFilter.subscribe( (res) => {
                if (res) {
                    if (filterSub) {
                        this.filterActive = false;
                        filterSub.unsubscribe();
                    }
                }
            });
        }
    }
    ngOnInit() {

        this.sortState = ExploreFundConstants.SORT_DESC;
        this.ratingDisclaimerText = `${disclaimers.rating}`;
        this.searchInputSubscription = this.exploreFundsService.fundSearchInput
            .subscribe(searchInput => {
                if (searchInput.qt == ExploreFundConstants.SEARCH_QUERY) {
                    this.currentSortElement = "";
                }
                this.searchInput = searchInput;
                this.currentSortElement = searchInput.se;
                this.sortState = searchInput.so;

                if (this.searchInput.o.length > 0 && this.searchInput.o.split(':').indexOf(ExploreFundConstants.SIP_FUNDS) > -1) {
                    this.defaultInvestmentMode = InvestmentModeEnum.SIP;
                    this.logger.debug("FundComponent", "Default Investment mode:", this.defaultInvestmentMode);
                } else {
                    this.defaultInvestmentMode = InvestmentModeEnum.LUMPSUM;
                }

            });

        this.searchResultSubscription = this.exploreFundsService.fundSearchResult.subscribe(searchResults => {
            this.logger.debug("FundComponent", searchResults);
            this.funds = searchResults.funds;
        })

    }


    ngOnDestroy() {
        this.searchInputSubscription.unsubscribe();
        this.searchResultSubscription.unsubscribe();
    }
}