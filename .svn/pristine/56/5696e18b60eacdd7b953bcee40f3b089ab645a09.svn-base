import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {Subscription} from "rxjs/Subscription";
import {Logger} from "../core/logger/logger";
import {UtilityService} from "../core/services/utility.service";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";

@Component({
    selector: 'app-payment-guideline-dialog',
    templateUrl: './payment-guideline.component.html',
    styleUrls: ['./checkout.styles.scss']
})


export class PaymentGuideLineDialogComponent implements OnInit, OnDestroy {

    closingSubscription: Subscription;
    visibleImage: string;
    visibleIndex: number;
    isNetBanking: boolean;
    rtgsArray : any;
    netBankingArray: any;
    //netBankingArray: string[] = ["../../assets/img/guide/net_banking_1.jpg", "../../assets/img/guide/net_banking_2.jpg"];
    showProceed: boolean;
    paymentLink: string;
    carouselContent: any;

    constructor(public dialogRef: MdDialogRef<PaymentGuideLineDialogComponent>, private logger: Logger,
                private utilityService: UtilityService, @Inject(APP_CONFIG) private config: IAppConfig,) {
        this.showProceed = false;

    this.rtgsArray = [{'url': this.config.staticImagePath + '/assets/img/guide/neft_rtgs.jpg'},{'url': this.config.staticImagePath + '/assets/img/guide/neft_rtgs.jpg'}]
    this.netBankingArray = [{'url': this.config.staticImagePath + '/assets/img/guide/net_banking_1.jpg'},{'url': this.config.staticImagePath + '/assets/img/guide/net_banking_1.jpg'}, {'url': this.config.staticImagePath + '/assets/img/guide/net_banking_2.jpg'}]
    }

    showRtgsImage() {
        this.carouselContent = this.rtgsArray;
    }

    showNetBankingImage() {
        this.isNetBanking = true;
        this.carouselContent = this.netBankingArray;
        //this.visibleIndex = 0;
    }

    /*toggleNetBankingImg() {
     if(this.visibleIndex == 0) {
     this.visibleImage = this.netBankingArray[1];
     this.visibleIndex = 1;
     } else {
     this.visibleImage = this.netBankingArray[0];
     this.visibleIndex = 0;
     }


     }*/

    proceed() {
        this.closingSubscription = this.dialogRef.afterClosed().subscribe(value => {
            this.utilityService.redirectionByWindow(this.paymentLink);
        });
        this.dialogRef.close();
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }


}
