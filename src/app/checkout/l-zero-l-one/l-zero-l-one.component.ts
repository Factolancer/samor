import {Component, OnDestroy, OnInit} from "@angular/core";
import {Logger} from "../../core/logger/logger";
import {MdDialogRef} from "@angular/material";
import {LZeroLOneService} from "./l-zero-l-one-service";
import {BseBank} from "../models/bse-bank";

@Component({
    selector: 'app-l-zero-l-one',
    templateUrl: './l-zero-l-one.component.html',
    styleUrls: ['../checkout.styles.scss']
})

export class LZeroLOneComponent implements OnInit, OnDestroy {

    isLZero:boolean;
    isLOne:boolean;
    bseBankList:BseBank[];
    cutOffTime:string;
    constructor(private logger: Logger,public dialogRef: MdDialogRef<LZeroLOneComponent>, public lZeroLOneService:LZeroLOneService){

    }
    ngOnInit() {

        let checkoutLZeroLOneDetails = this.lZeroLOneService.lZeroLOneDetailsSubject.getValue();
        this.bseBankList = checkoutLZeroLOneDetails.bseBank;
        for(let fund of checkoutLZeroLOneDetails.checkoutLZeroLOne){
            if(fund.isLZero){
                this.isLZero = true;
            }
            if(fund.isLOne){
                this.isLOne = true;
            }
        }
        for(let fund of checkoutLZeroLOneDetails.checkoutLZeroLOne){
            if(this.isLZero){
                if(fund.isLZero){
                    this.cutOffTime = fund.lOneLZeroDetails.fundsCutOffTime;
                }
            } else{
                if(fund.isLOne){
                    this.cutOffTime = fund.lOneLZeroDetails.fundsCutOffTime;
                }
            }
        }
    }
    ngOnDestroy() {

    }
}