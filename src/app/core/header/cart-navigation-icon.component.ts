import {Component, OnInit, Input, OnDestroy} from "@angular/core";
import {CartService} from "../services/cart.service";
import {Subscription} from "rxjs/Subscription";
import {LoginService} from "../services/login.service";
import {Cart} from "../../models/cart";
import {Logger} from "../logger/logger";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-cart-navigation-icon',
    templateUrl: 'cart-navigation-icon.component.html',
    styleUrls: ['../../cart/cart.styles.scss']
})
export class CartNavigationIconComponent implements OnInit, OnDestroy {

    private loginSubscription: Subscription;
    private cartSubscription: Subscription;
    public cartItemsCount: number;
    @Input() cssClass: string;

    constructor(private cartService: CartService, private loginService: LoginService, private logger: Logger) {
    }


    ngOnInit() {
        this.loginSubscription = this.loginService.loginObservable.subscribe((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
                this.cartItemsCount = 0;
            }
        });

        /*if (!this.cartService.isCartPresent()) {
            let cartId = this.cartService.getCartToken();
        } else {
            this.cartService.setCartSubjectState(new Cart);
        }*/

        this.cartSubscription = this.cartService.cartObservable.subscribe(cart => {
            this.cartItemsCount = cart.funds.length;
        });


    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.cartSubscription.unsubscribe();
    }

}
