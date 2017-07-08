import {ProductOption} from "./product-option";
export class Product {
    constructor(public smtRfnum: number,
                public productName: string,
                public productRfnum: number,
                public productOptions: ProductOption[]) {
    }

}