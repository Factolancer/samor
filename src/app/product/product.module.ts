/**
 * Created by Fincash on 22-02-2017.
 */
import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {productgpageRouting} from "./product.routes";
import {ProductComponent} from "./product.component";
import {ProductSolutionsComponent} from "./product-solutions.component";


@NgModule({
    imports: [
        SharedModule,
        productgpageRouting
    ],
    declarations: [ProductComponent, ProductSolutionsComponent],
    exports: [ProductSolutionsComponent]
})
export class ProductModule {
}
