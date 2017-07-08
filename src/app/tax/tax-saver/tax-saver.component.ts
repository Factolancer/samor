import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Fund} from "../../models/fund";
import {CartService} from "../../core/services/cart.service";
import {InvestmentModeEnum} from "../../enum/investment-mode-enum";
import {TitleService} from "../../core/services/title.service";

@Component({
    selector: 'app-tax-saver',
    templateUrl: './tax-saver.component.html',
    styleUrls: ['../tax.styles.scss']
})
export class TaxSaverComponent implements OnInit {

    taxSaverFunds: Fund[];

    proceed(selectedFunds: any) {
        selectedFunds.forEach(fund => fund.investmentMode = InvestmentModeEnum[InvestmentModeEnum.LUMPSUM]);
        this.cartService.addFundsToCart(selectedFunds);
        /*  this.cartService.addFundsToCart(selectedFunds).subscribe(output => {
         alert(output.response);
         });*/
    }

    constructor(private route: ActivatedRoute, private cartService: CartService, private titleService: TitleService) {
    }

    ngOnInit() {
        this.titleService.setTitle("tax_saver");
        this.titleService.setMetaTags("tax_saver");

        this.route.data.forEach((data: {funds: Fund[]}) => {
            this.taxSaverFunds = data.funds;
        });
    }

}

