import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-insta-confirmation-dialog',
    templateUrl: './insta-confirmation-dialog.component.html',
    styleUrls: ['./shared.styles.scss']
})
export class    InstaConfirmationDialogComponent implements OnInit {

    config: any;

    constructor(public dialogRef: MdDialogRef<InstaConfirmationDialogComponent>) {
    }

    ngOnInit() {
    }

}
