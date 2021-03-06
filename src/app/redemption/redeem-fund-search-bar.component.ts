import {Component, OnInit, OnDestroy, ViewContainerRef} from "@angular/core";
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
import {FundSearchInput} from "../explore-funds/fund-search-input";
import {ExploreFundConstants} from "../explore-funds/explore-funds.constants";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RedemptionService} from "../core/services/redemption.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {RedemptionFund} from "./models/redemption-fund";
import {SnackBarService} from "../core/services/snack-bar.service";

@Component({
    selector: 'app-redeem-fund-search-bar',
    templateUrl: './redeem-fund-search-bar.component.html',
    styleUrls: ['./redemption.styles.scss']
})
export class RedeemFundSearchBarComponent implements OnInit, OnDestroy {

    redeemSuggestionSubject: BehaviorSubject<RedemptionFund[]>;
    redeemSuggestions: Observable<RedemptionFund[]>;
    private searchTermStream = new Subject<string>();
    queryString: string = "";
    searchInputSubscription: Subscription;
    fundControl: FormControl;
    className: string;

    searchInput: FundSearchInput;

    constructor(private redemptionService: RedemptionService, private logger: Logger, private router: Router, private snackBarService: SnackBarService,
                private viewContainerRef: ViewContainerRef) {
        this.className = "RedeemFundSearchBarComponent";
        this.fundControl = new FormControl();
    }

    searchBarInput() {
        this.searchTermStream.next(this.queryString);
        this.redeemSuggestionSubject = new BehaviorSubject<RedemptionFund[]>([]);
        // this.redeemSuggestions = this.redeemSuggestionSubject.asObservable();
    }

    /*searchForKeyword(event: any) {
        let keywordObservable = Observable.timer(300).take(1).subscribe(_ => {
            this.logger.debug("got new value!", event, event.target);
            let defaultSearchInput = this.exploreFundsService.getDefaultFundSearchInput();
            defaultSearchInput.q = this.queryString;
            defaultSearchInput.r = this.searchInput.r;
            defaultSearchInput.qt = ExploreFundConstants.SEARCH_QUERY;
            this.exploreFundsService.navigateToExplore(defaultSearchInput);
            keywordObservable.unsubscribe();
        });


        /!*if (event.keyCode == 13 || event.type == "click" || event.type == "select") {

         }*!/
    }*/

    ngOnInit() {
        this.redeemSuggestions = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((term: string) => this.redemptionService.getRedemptionAutoCompleteData(term).map(res => {
                this.logger.debug(this.className, res);
                this.redeemSuggestionSubject.next(res);
                return res; //this.setAutoSuggestion(res);
            }));

        this.fundControl.valueChanges.subscribe(controlVal => {
            this.logger.debug("THIS IS VALUE of FUNDCONTROL ", controlVal);
            this.logger.debug("THIS IS redemmSUgeestionos ", this.redeemSuggestions);
            if (typeof controlVal === "object") {
                let rededmptionData = this.redemptionService.redemptionData.getValue();
                // Check if redeembale units are zero
                if (controlVal.redeemableUnits == 0){
                    this.snackBarService.showSnackBar("You cannot redeem from this fund", "Okay", this.viewContainerRef);
                    this.fundControl.setValue('');
                }
                else {
                    //Check if fund exists in list
                    if (this.checkInRedemptionList(controlVal)){
                        this.snackBarService.showSnackBar("Fund is already added for redemption", "Okay", this.viewContainerRef);
                        this.fundControl.setValue('');
                    }
                    else {
                        rededmptionData.fundsData.push(controlVal);
                        this.redemptionService.redemptionData.next(rededmptionData);
                        // this.removeFromSuggestionList(controlVal);
                        this.fundControl.setValue('');
                    }
                }
            }
        })
    }

    addToRedemptionList(event: any) {
        this.logger.debug("got new value!", this.fundControl.value);
        // this.removeFromSuggestionList(this.fundControl.value);
    }

    removeFromSuggestionList(suggestion: RedemptionFund){
        this.redeemSuggestions.subscribe(suglist => {
            suglist.filter(x => !(x.option.soptRfnum==suggestion.option.soptRfnum && x.folioNo==suggestion.folioNo));
            this.logger.debug("SUGList ", suglist);
        });
        /*this.redeemSuggestions
            .map(arr => Observable.from(arr))
            .filter((x: RedemptionFund) => !(x.option.soptRfnum==suggestion.option.soptRfnum && x.folioNo==suggestion.folioNo))
            .subscribe(x => this.logger.debug("SUGGESTIONS ", this.redeemSuggestions))*/
        // this.redeemSuggestions.filter(x => !(x.option.soptRfnum==suggestion.option.soptRfnum && x.folioNo==suggestion.folioNo));
    }

    checkInRedemptionList(redemptionFund: RedemptionFund){
        let redemptionData = this.redemptionService.redemptionData.getValue();
        let funds = redemptionData.fundsData.filter(x => (x.option.soptRfnum==redemptionFund.option.soptRfnum && x.folioNo==redemptionFund.folioNo));
        // return true if fund exists in list already
        if (funds.length > 0){
            return true;
        }
        else
            return false;
    }

    gotoHolding(){
        this.router.navigate(['/dashboard/report/1']);
    }

    ngOnDestroy() {
        if (this.searchTermStream){
            this.searchTermStream.unsubscribe();
        }
        if (this.searchInputSubscription){
            this.searchInputSubscription.unsubscribe();
        }
    }

}
