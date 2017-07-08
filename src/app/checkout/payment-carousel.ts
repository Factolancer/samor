import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { Carousel } from '../models/carousel';
import { isNullOrUndefined } from 'util';
import {DataStorageService} from "../core/services/data-storage.service";

@Component({
    selector: '[payment-carousel]',
    template: `
        <ul class="carousel">
            <i (click)="prev()" *ngIf="hideBlurred" class="material-icons prev no-select" >keyboard_arrow_left</i>
            <i (click)="next()" *ngIf="hideBlurred" class="material-icons next no-select" >keyboard_arrow_right</i>

            <li  [ngClass]="{'sharpen':hideBlurred}" class="blurred no-select" fxFlex="row" fxLayoutAlign="center center">
                <img fxHide.lt-md="" src="{{image.url}}" alt="{{image.alt || 'banner'}}">
                <img fxHide.gt-sm="" src="{{image.url}}" alt="{{image.alt || 'banner'}}" [routerLink]=image.link>
                <div class="banner-content" [ngClass]=image.contentposition *ngIf="image.content" style="position: absolute;padding:10px;">
                    <span fxHide.lt-md="" [innerHTML]="image.content"></span>
                    <span *ngIf="image.link">
                             <a [routerLink]=image.link ><button class="cta-btn" [ngClass]="image.btnposition">SavingsPlus</button></a>
                        </span>
                </div>
                <div class="disclaimer" ngClass.lt-md="txt-7" ngClass.gt-sm="txt-10" style="position: absolute;bottom:10px;left:20px;" *ngIf="image.note">
                    <span [innerHTML]="image.note"></span>
                </div>
            </li>
        </ul>
    `,
    styles: [`
        .blurred{
            filter:blur(10px);
            -webkit-filter:blur(10px);
            -ms-filter: blur(10px);
        }
        .sharpen{filter:blur(0);-webkit-filter:blur(0);-ms-filter:blur(0);}
        ul{margin:0 !important; padding: 0 !important; position: relative;}
        .prev{position:absolute; top:45%;left:0; }
        .next{position:absolute; top:45%;right:0; }
        .prev,.next{
            background-color: transparent;
            border-radius: 50%;
            cursor: pointer;
            outline: none;
            color: rgba(0,0,0,0.35);
            font-size: 2em;
            z-index:5;
        }
        .prev:hover,.next:hover{
            background-color: rgba(0,0,0,0.15);
        }
        i{border-radius: 50%;}
        ul.carousel{
            overflow:hidden;
            width:100%;
            text-align: center;
            position:relative;
            background-color:white;
        }
        ul.carousel img{
            display:block;
            width:90%;
            max-width:100%;
            height:auto;}
        .banner-content{left: 29%; top: 30%; text-align: center; background-color: rgba(255, 255, 255, 0.2);}
        .banner-content.left{left:2.5%;top:7%;text-align: left;}
        .banner-content.right{right:5%;top:10%;text-align: right;}
        .disclaimer{ color: white; opacity: 0.8;text-align:justify; max-width: 600px;}

        .cta-btn.right{ float:right;}
        .cta-btn.left{ float:left;}
        .no-select{
            user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -webkit-user-select: none;
        }

    `],
})

export class PaymentCarouselComponent implements OnInit, OnDestroy {
    @Input('payment-carousel') carouselContent: Carousel[];

    /*make sure url passed do have absolute path*/
    hideBlurred :boolean;
    carouselTimer: Subscription;
    image: any ;
    i: number;
    length: number;
    duration:number;

    constructor(public dataStorageService: DataStorageService) {
        this.hideBlurred  = false;
        this.duration = 7000;
    }

    ngOnInit() {
        if (this.carouselContent) {
            this.length = this.carouselContent.length;

            // slice content if imges are cached(localstorage imgblur val is there)
            if (isNullOrUndefined(this.dataStorageService.get('imgBlurred'))){
                this.dataStorageService.set('imgBlurred', 'Y');
            }else {
                this.hideBlurred = true;
                this.carouselContent = this.carouselContent.slice(1, this.length + 1);
            }
            this.image = this.carouselContent[0];
            if (this.carouselContent[0].url.indexOf('blur') >= 0) {
                this.carouselContent = this.carouselContent.slice(1, this.length + 1);
            }
            this.i = -1;
            this.start();
        }
    };

    start() {
        this.carouselTimer = Observable.timer(1500, this.duration).subscribe(t => {
            this.length = this.carouselContent.length;
            this.hideBlurred = true;
            this.i = (this.i + 1) % this.length;
            this.image = this.carouselContent[this.i];
            this.image.alt = this.image.url.split('/').pop().split('.')[0].replace(/-/g, "_");
        });
    }

    pause(){
        if(this.carouselTimer)
            this.carouselTimer.unsubscribe();
    }
    next(){
        this.pause();
        this.i = (this.i + 1) % this.length;
        this.image = this.carouselContent[this.i];
        this.image.alt = this.image.url.split('/').pop().split('.')[0].replace(/-/g, "_");
    }
    prev(){
        this.pause();
        this.i = ((this.i - 1) + this.length)%this.length;
        this.image = this.carouselContent[this.i];
        this.image.alt = this.image.url.split('/').pop().split('.')[0].replace(/-/g, "_");

    }
    ngOnDestroy() {
        if (this.carouselTimer)
            this.carouselTimer.unsubscribe();
    }
}


