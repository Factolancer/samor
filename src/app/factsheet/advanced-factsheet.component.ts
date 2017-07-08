import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {EquityAdvancedFactsheet} from "./equity-advanced-factsheet";
import {DebtAdvancedFactsheet} from "./debt-advanced-factsheet";
import {Logger} from "../core/logger/logger";

@Component({
    selector: 'app-advanced-factsheet',
    templateUrl: './advanced-factsheet.component.html',
    styleUrls: ['./factsheet.styles.scss']
})
export class AdvancedFactsheetComponent implements OnInit {

    advancedFactsheet: any;
    id: number;
    className : string;
    constructor(private route: ActivatedRoute,  private logger :  Logger) {
        this.className = "AdvancedFactsheetComponent";
    }

    ngOnInit() {

        this.route.data.forEach((data: any) => {
            this.logger.debug(this.className, data.factsheetData);
            if (data.factsheetData.basicFactsheet.category === "Equity") {
                this.advancedFactsheet = data.factsheetData as EquityAdvancedFactsheet;
            } else {
                this.advancedFactsheet = data.factsheetData as DebtAdvancedFactsheet;
            }
        });
    }


}
