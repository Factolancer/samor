/**
 * Created by Fincash on 28-02-2017.
 */

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {StaticRoutes} from "./constants/staticroutes";

import {StaticTxtService} from "./static-txt.service";
import {HeaderService} from "../core/services/header.service";
import {TitleService} from "../core/services/title.service";


@Component({
    selector: 'static-content',
    templateUrl: './static-txt.component.html',
    styleUrls: ['./static-txt.component.scss']
})
export class StaticTextComponent implements OnInit, OnDestroy {

    staticRouteSub:Subscription;
    staticRoutes = StaticRoutes;
    content:any;
    pageName:string;

    constructor(private router:Router, private route:ActivatedRoute, private staticDataService:StaticTxtService, private headerService:HeaderService, private titleService:TitleService){
        this.headerService.autoHideHeader(true);
        this.staticRouteSub = this.route.params.subscribe((params: Params) => {
            if(this.staticRoutes.indexOf(params.path)>=0){
                this.content = this.staticDataService.getContent(params.path);
                this.pageName = params.path;
                this.pageName = this.pageName.replace('-','_');
                this.titleService.setTitle(this.pageName);
                this.titleService.setMetaTags(this.pageName);
            }
            else{
                this.router.navigate(['/']);
            }

            });
        };
    ngOnInit(){
    };

    ngOnDestroy(){
        this.headerService.resetHeaderHiding();
    }

}