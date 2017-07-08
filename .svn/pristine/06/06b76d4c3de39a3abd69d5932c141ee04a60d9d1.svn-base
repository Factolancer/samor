import {NgModule} from "@angular/core";
import {CartComponent} from "./cart.component";
import {cartRouting} from "./cart.routes";
import {SharedModule} from "../shared/shared.module";
import {AddToCartButtonComponent} from "./add-to-cart-button.component";
import {AddToCartIconButtonComponent} from "./add-to-cart-icon-button.component";
import {FactsheetModule} from "../factsheet/factsheet.module";

@NgModule({
    imports: [
        SharedModule,
        cartRouting,
    ],
    exports: [AddToCartButtonComponent, AddToCartIconButtonComponent],
    declarations: [CartComponent, AddToCartButtonComponent, AddToCartIconButtonComponent]
})
export class CartModule {
}
