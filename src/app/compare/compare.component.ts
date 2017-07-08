import {Component, OnInit} from "@angular/core";
import {Fund} from "../models/fund";
import {CompareService} from "../core/services/compare.service";
import {Location} from "@angular/common";
import {TitleService} from "../core/services/title.service";
import {disclaimers} from "../../properties/discalimers";

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.styles.scss']
})


export class CompareComponent implements OnInit {

    funds: Fund[];
    ratingDisclaimerText: string;

    constructor(private compareService: CompareService, private location: Location, private titleService: TitleService) {
        this.funds = this.compareService.getFundComparisonData();
    }

    ngOnInit() {
        this.titleService.setTitle("compare");
        this.titleService.setMetaTags("compare");
        this.ratingDisclaimerText = `${disclaimers.rating}`;
    }

    back() {
        this.location.back();
    }
}
