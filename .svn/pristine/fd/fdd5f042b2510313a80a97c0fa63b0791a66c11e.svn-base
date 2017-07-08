import {Component, OnInit, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core";
import {ProductEnum} from "../../enum/product-enum";
import {WatchlistProduct} from "../watchlist-product";
import {WatchlistService} from "../watchlist.service";
import {Scheme} from '../scheme';
import {Logger} from "../../core/logger/logger";

@Component({
    selector: 'app-watchlist-view',
    templateUrl: './watchlist-view.component.html',
    styleUrls: ['./watchlist-view.component.css']
})
export class WatchlistViewComponent implements OnInit {

    @Input() set _product(value: Scheme) {
       /* this.schemes = value;
        if (value.schemes == this.productEnum.SIP || value.schemes == this.productEnum.LUMPSUM) {
            this.isFincashProduct = false;
        }*/
    }

    @Output() remove = new EventEmitter();
    @Output() onFundSelected = new EventEmitter();

    currentFund: Scheme;
    schemes: Scheme[];
    isFincashProduct: boolean = true;
    productEnum = ProductEnum;
    className : string;
    constructor(private watchlistService: WatchlistService, private  logger : Logger) {
        // this.onFundSelected = new EventEmitter<Scheme>();
        this.className = "WatchlistViewComponent";
    }

    selectFund(fund: Scheme) {
        this.currentFund = fund;
        this.onFundSelected.emit(fund);
        this.logger.debug(this.className, fund);
    }

    isSelected(fund: Scheme): boolean {
        if (!this.currentFund) {
            return false;
        }
        return this.currentFund.scheme_name === fund.scheme_name ? true : false;
    }

    removeProduct(productEnumId: number) {
        this.watchlistService.removeProductFromWatchlist(productEnumId).subscribe(
            output => alert(output.response)
        )

        this.remove.emit(productEnumId);
    }

    ngOnInit() {

    }

}
