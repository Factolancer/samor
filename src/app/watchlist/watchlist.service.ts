import {Injectable} from "@angular/core";
import {HttpService} from "../core/services/http-service.service";
import {WatchlistProduct} from "./watchlist-product";
import {ProductEnum} from "../enum/product-enum";
import {InvestmentModeEnum} from "../enum/investment-mode-enum";
import {Scheme} from "./scheme";

@Injectable()
export class WatchlistService {


    constructor(private httpService: HttpService) {
    }

    addToCart(watchlistItems: Scheme[]) {
        return this.httpService.post("/fund/addToWishlist", watchlistItems);
    }

    removeProductFromWatchlist(productEnumId: number) {
        return this.httpService.post("/fund/removeFund", {productName: ProductEnum[productEnumId]});
    }

    removeFundFromWatchlist(fundId: number) {
        return this.httpService.post("/fund/removeFromWishlist", fundId /*{
            fundId: fundId,*/
            // investmentMode: InvestmentModeEnum[investmentTypeEnumId]
        );
    }

    getWatchlistData() {
        return this.httpService.get("/fund/getWishlistData");
    }
}
