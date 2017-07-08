import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {Input} from "@angular/core";
import {BasicFactsheetComponent} from "../../factsheet/basic-factsheet.component";
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";

import {FactsheetService} from "../../factsheet/factsheet.service";
import {Fund} from "../../models/fund";
import {disclaimers} from "../../../properties/discalimers";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog.component";
import {HeaderService} from "../../core/services/header.service";

@Component({
    selector: 'app-savings-plus-card',
    templateUrl: './savings-plus-card.component.html',
    styleUrls: ['../cash.styles.scss']
})
export class SavingsPlusCardComponent implements OnInit {

    //inputs
    @Input() set funds(funds: Fund[]) {
        this._funds = funds || [];
        this.selectedFunds = this._funds;
    }

    _funds: Fund[];
    selectedFunds: Fund[];
    factsheetDialogRef: MdDialogRef<BasicFactsheetComponent>;
    ratingDisclaimerText: string;

    constructor(public viewContainerRef: ViewContainerRef, public dialog: MdDialog, public factsheetService: FactsheetService,
                private headerService: HeaderService) {
    }

    changeFundComposition(checked: boolean, fundItem: Fund) {
        if (checked) {
            this.selectedFunds.push(fundItem);
        } else {

            let config = new MdDialogConfig();
            let device = this.headerService.deviceType();
            if (device === 'xs' || device === 'sm') {
                config.width = '100%';
            }else {
                config.width = '30vw';
            }
            config.disableClose = true;
            config.viewContainerRef = this.viewContainerRef;

            let confirmationConfig = {
                confirmationTitle: 'Are you sure?',
                confirmationText: 'You want to remove this fund from the SavingsPlus Product bundle?',
                confirmationActions: [['Y', 'Yes', 'hollow-cta-36'], ['N', 'No', 'hollow-cta-36']]
            }

            let dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
            dialogRef.componentInstance.config = confirmationConfig;
            dialogRef.afterClosed().subscribe( (result) => {
                if (result[0] === 'Y') {
                    this.selectedFunds = this.selectedFunds.filter((selectedFund) => selectedFund.id != fundItem.id);
                } else {
                    fundItem.selected = true;
                }
            });
        }
    }

    viewFactSheet(fund: Fund) {
        let config = this.factsheetService.getFactsheetDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.factsheetDialogRef = this.dialog.open(BasicFactsheetComponent, config);
        this.factsheetDialogRef.componentInstance.fund = fund;
    }

    ngOnInit() {
        this.ratingDisclaimerText = `${disclaimers.rating}`;
    }

}
