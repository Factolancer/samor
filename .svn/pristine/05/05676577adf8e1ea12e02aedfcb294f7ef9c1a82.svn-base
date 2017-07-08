import {Component, OnInit} from "@angular/core";
import {Fund} from "../../models/fund";
import {ActivatedRoute} from "@angular/router";
import {InvestmentModeEnum} from "../../enum/investment-mode-enum";
import {CartService} from "../../core/services/cart.service";
import {TitleService} from "../../core/services/title.service";

@Component({

    selector: 'app-smart-sip',
    templateUrl: './smart-sip.component.html',
    styleUrls: ['../sip.styles.scss']
})
export class SmartSipComponent implements OnInit {

    quickSipFunds: Fund[];

    proceed(selectedFunds: any) {
        selectedFunds.forEach(fund => fund.investmentMode = InvestmentModeEnum[InvestmentModeEnum.SIP]);
        this.cartService.addFundsToCart(selectedFunds);

        /* this.cartService.addFundsToCart(selectedFunds).subscribe(output => {
         alert(output.response);
         });*/
    }

    constructor(private route: ActivatedRoute, private cartService: CartService,
                private titleService: TitleService) {
    }

    ngOnInit() {
        this.titleService.setTitle("smart_sip");
        this.titleService.setMetaTags("smart_sip");
        this.route.data.forEach((data: {funds: Fund[]}) => {
            this.quickSipFunds = data.funds;
        });
    }

    addToCart() {
        this.cartService.addFundsToCart(this.quickSipFunds);
    }

}
