import {Component, OnDestroy, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {Subscription} from "rxjs/Subscription";
import {funds} from "../dashboard/asset-funds";
import {Logger} from "../core/logger/logger";

@Component({
    selector: 'app-loading-dialog',
    templateUrl: './loading-dialog.component.html',
    styleUrls: ['./shared.styles.scss']
})


export class LoadingDialogComponent implements OnInit, OnDestroy {

    config: any;
    closingSubscription: Subscription;

    constructor(public dialogRef: MdDialogRef<LoadingDialogComponent>, private logger: Logger) {
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }


}
