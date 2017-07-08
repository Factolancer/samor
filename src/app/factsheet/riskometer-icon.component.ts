import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'app-riskometer-icon',
    templateUrl: './riskometer-icon.component.html',
    styleUrls: ['./factsheet.styles.scss']
})
export class RiskometerIconComponent implements OnInit {

    constructor() {
    }

    @Input() riskVal: string;
    riskImagePath: string;
    riskImageAlt: string;

    ngOnInit() {
        let riskImageName: string = "";
        switch (this.riskVal) {
            case "H": {
                riskImageName = "high.svg";
                this.riskImageAlt = "High";
                break;
            }
            case "MH": {
                riskImageName = "moderately_high.svg";
                this.riskImageAlt = "Moderately High";
                break;
            }
            case "M": {
                riskImageName = "moderate.svg";
                this.riskImageAlt = "Moderate";
                break;
            }
            case "ML": {
                riskImageName = "moderately_low.svg";
                this.riskImageAlt = "Moderately Low";
                break;
            }
            case "L": {
                riskImageName = "low.svg";
                this.riskImageAlt = "Low";
                break;
            }

        }
        this.riskImagePath = "assets/img/risk/" + riskImageName;
    }


}
