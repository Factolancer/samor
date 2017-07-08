import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import {Fund } from '../models/fund';
import {disclaimers } from '../../properties/discalimers';

@Component({
    selector: 'app-basic-factsheet',
    templateUrl: './basic-factsheet.component.html',
    styleUrls: ['./factsheet.styles.scss']
})
export class BasicFactsheetComponent implements OnInit {

    constructor(public dialogRef: MdDialogRef<BasicFactsheetComponent>, private router: Router) {
    }

    @Input('fund') set fund(value: Fund) {
        this._fund = value;
        this.advancedViewPath = "/factsheet/" + this._fund.id;
    }

    ratingDisclaimerText: string;


    advancedViewPath: string;

    _fund: Fund;

    ngOnInit() {
        this.ratingDisclaimerText = `${disclaimers.rating}`;
    }

    showAdvancedView() {
        this.dialogRef.close();
        this.router.navigateByUrl(this.advancedViewPath);
    }
}
