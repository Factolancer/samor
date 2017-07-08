import {Component, OnInit, Input, ViewContainerRef, OnDestroy} from "@angular/core";
import {CartService} from "../core/services/cart.service";
import {InvestmentModeEnum} from "../enum/investment-mode-enum";
import {Fund} from "../models/fund";
import {SnackBarService} from "../core/services/snack-bar.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-add-to-cart-icon-button',
    templateUrl: './add-to-cart-icon-button.component.html',
    styleUrls: ['./cart.styles.scss']
})
export class AddToCartIconButtonComponent implements OnInit, OnDestroy {

    @Input() btnText: string;
    @Input() cssClass: string;
    @Input() fund: Fund;

    @Input() set _investmentMode(value: InvestmentModeEnum) {
        this.investmentMode = value;
    }

    investmentMode: InvestmentModeEnum;
    funds: Fund[] = [];
    snackBarRef: Subscription;

    constructor(private cartService: CartService, private snackBarService: SnackBarService,
                private viewContainerRef: ViewContainerRef, private router: Router) {

        this.investmentMode = InvestmentModeEnum.LUMPSUM;
    }

    add() {
        this.fund.investmentMode = InvestmentModeEnum[this.investmentMode];
        this.funds.push(this.fund);
        this.cartService.addFundToCart(this.funds).subscribe(res => {
            this.snackBarRef = this.snackBarService.showSnackBar(res.message, "Checkout", this.viewContainerRef).onAction().subscribe(() => {
                this.router.navigate(["/cart"]);
            })
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.snackBarRef) {
            this.snackBarRef.unsubscribe();
        }
    }
}
