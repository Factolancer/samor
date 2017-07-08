import {ProductEnum} from "../enum/product-enum";
import {InvestmentModeEnum} from "../enum/investment-mode-enum";
import {Scheme} from "./scheme";

export interface WatchlistProduct {
    product: ProductEnum,
    investmentType: InvestmentModeEnum,
    funds: Scheme[];
}

