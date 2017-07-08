/**
 * Created by Fincash on 22-02-2017.
 */
import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {Logger} from "../core/logger/logger";
import {Router} from "@angular/router";
import {IAppConfig, APP_CONFIG} from "../../environments/environment";
import {TitleService} from "../core/services/title.service";



@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

    constructor(private titleService: TitleService) { }

    ngOnInit() {
        this.titleService.setTitle("product_solutions");
        this.titleService.setMetaTags("product_solutions");
    }


    ngOnDestroy(){

    }
}
