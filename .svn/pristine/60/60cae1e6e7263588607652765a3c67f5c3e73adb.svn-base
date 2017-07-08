/**
 * Created by Fincash on 03-03-2017.
 */
import {Injectable, ViewContainerRef} from "@angular/core";
import {Logger} from "../logger/logger";
import {KYCGroup} from "../constants/KYCGroup";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {InfoDialogComponent} from "../../shared/info-dialog.component";
import {HeaderService} from "./header.service";

@Injectable()
export class DialogService {

    className: string;

    constructor(public logger: Logger, public headerService:HeaderService, private dialog: MdDialog) {
        this.className = "DialogService";
    }

    showDisclaimers(disclaimerTextArray: string[], viewContainerRef: ViewContainerRef, title?: string, width?: string, height?: string) {
        this.logger.debug(this.className, "Showing from dialog service");
        let config = new MdDialogConfig();
        let device  = this.headerService.deviceType();
        if (width) {
            config.width = width;
        } else {
            if (device === 'xs' || device === 'sm'){
                config.width = "100vw";
            } else {
                config.width = "60vw";
            }
        }

        if (height) {
            config.height = height;
        } else {
            config.height = "80vh";
        }

        config.viewContainerRef = viewContainerRef;

        let infoDialogConfig = {
            infoTitle: "Disclaimers",
            infoText: disclaimerTextArray
        }

        let dialogRef = this.dialog.open(InfoDialogComponent, config);
        dialogRef.componentInstance.config = infoDialogConfig;
        let afterClosedSubscription = dialogRef.afterClosed().subscribe((results)=>{
            afterClosedSubscription.unsubscribe();
        })
    }


}