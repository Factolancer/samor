import {Component, OnInit, Input, ViewContainerRef, OnDestroy} from "@angular/core";
import {CartService} from "../core/services/cart.service";
import {InvestmentModeEnum} from "../enum/investment-mode-enum";
import {Fund} from "../models/fund";
import {SnackBarService} from "../core/services/snack-bar.service";
import {MdDialogRef, MdSnackBarRef, SimpleSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-add-to-cart-button',
    templateUrl: './add-to-cart-button.component.html',
    styleUrls: ['./cart.styles.scss']
})
export class AddToCartButtonComponent implements OnInit, OnDestroy {

    @Input() btnText: string;

    @Input() set _cssClass(value: string) {
        this.cssClass = value;
    }


    @Input() fund: Fund;

    @Input() dialogRef: MdDialogRef<any>;

    funds: Fund[] = [];
    cssClass: string;
    snackBarRefSubscription: Subscription;
    dialogSubscription: Subscription;

    @Input() set _investmentMode(value: InvestmentModeEnum) {
        this.investmentMode = value;
    }

    investmentMode: InvestmentModeEnum;

    constructor(private cartService: CartService, private snackBarService: SnackBarService,
                private viewContainerRef: ViewContainerRef, private router: Router) {

        this.investmentMode = InvestmentModeEnum.LUMPSUM;
    }

    add() {
        this.fund.investmentMode = InvestmentModeEnum[this.investmentMode];
        this.funds.push(this.fund)
        this.cartService.addFundToCart(this.funds).subscribe(res => {
            this.snackBarRefSubscription = this.snackBarService.showSnackBar(res.message, "Checkout", this.viewContainerRef).onAction().subscribe(() => {
                if (this.dialogRef) {
                    this.dialogRef.afterClosed().subscribe(() => {
                        this.navigateToCart()
                    })
                    this.dialogRef.close();
                } else {
                    this.navigateToCart();
                }
            })
        })
    }

    navigateToCart() {
        this.router.navigate(["/cart"]);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.snackBarRefSubscription) {
            this.snackBarRefSubscription.unsubscribe();
        }

        if (this.dialogSubscription) {
            this.dialogSubscription.unsubscribe();
        }
    }

}
