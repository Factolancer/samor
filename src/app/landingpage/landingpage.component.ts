import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {Logger} from "../core/logger/logger";
import {Router} from "@angular/router";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";
import {HeaderService} from "../core/services/header.service";
import {TitleService} from "../core/services/title.service";


@Component({
    selector: 'app-landingpage',
    templateUrl: 'landingpage.component.html',
    styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit, OnDestroy {

    constructor(private logger: Logger, private router: Router, @Inject(APP_CONFIG) private config: IAppConfig,
                private headerService: HeaderService, private titleService: TitleService) {
        let device = this.headerService.deviceType();
        if (device === 'xs' || device === 'sm') {
          this.initCarouselMob();
        }else {
            this.initCarousel();
        }
    }

    minAge: number = 18;
    maxAge: number = 60;
    minExpns: number = 5000;
    maxExpns: number = 200000;
    stepExpns: number = 5000;
    defaultExpns: number = 5000;
    carouselContent:any;

    ngOnInit() {
        this.headerService.autoHideHeader(true);
        this.headerService.onDemandProgressBar();
        this.titleService.setTitle("home");
        this.titleService.setMetaTags("home");
    }
    initCarousel(){
        this.carouselContent = [
            { 'url': this.config.staticImagePath +'/assets/img/landingpage/daily-returns-savingsplus-blurred.jpg'},
            {
                'url': this.config.staticImagePath +'/assets/img/landingpage/daily-returns-savingsplus.jpg',
                'content':'<p class="txt-2-5 center-align mar-b-5 mar-t-5 pad-lr-80" ><span class="white">Invest in Mutual Funds <br/><span class="yellow txt-1-3 italic txt-norm">for a couple of days & <br/>earn!</span></span></p>' +
                '<div class="white center-align">Invest in</div>',
                'link':'cash',
                'btnposition':'center'
            },
            {
                'url': this.config.staticImagePath + '/assets/img/landingpage/beat-fixed-deposit-savingsplus.jpg',
                'content':'<p class="txt-2-5 mar-tb-5 pad-r-60" ><span class="white">Beat <span class="txt-1-3 yellow italic txt-norm">FD returns <br/> without any lock-in!</span></span></p>'
                +'<p class="left-align italic white txt-1-3 bor-t-1-white pad-tb-5 ls-1-0">Invest in mutual funds and get <span class="yellow">higher returns</span></p>' +
                '<div class="white right-align pad-lr-50">Invest in</div>',
                'contentposition':'left',
                'btnposition':'right',
                'link':'cash'
            },
            {
                'url': this.config.staticImagePath + "/assets/img/landingpage/higher-returns-savingsplus.jpg",
                'content':'<p class="txt-2-5 mar-t-5 mar-b-10-n display-inline-block" ><span class="white">You\'ve heard <span class="yellow">6>4,</span><span class="txt-1-3 italic txt-norm"> but why <br/>not go for<span class="yellow txt-1-3"> 7%*.</span></span></span></p>' +
                '<div class="white right-align pad-lr-50 display-inline-block">Invest in</div><br/>',
                'note':'* 6.9% and 6.9% is the past one-year  return of Birla Sun Life Cash Plus Fund and Reliance Liquid Fund - Treasury Plan respectively as of June 30th, 2017.',
                'contentposition':'left',
                'btnposition':'right',
                'link':"cash",
            },
            {
                'url': this.config.staticImagePath + "/assets/img/landingpage/instant-redemption-savingsplus.jpg",
                'content':'<p class="txt-2-5 mar-t-5 mar-b-10-n display-inline-block" ><span class="white">Instant <br/> <span class="txt-1-3 italic txt-norm">Redemption within <br/> <span class="yellow">30 mins!</span></span></span></p>' +
                '<div class="white right-align pad-lr-50 display-inline-block">Invest in</div> <br/>',
                'note':'<i>Instant redemption is available only for bank accounts with IMPS facility enabled for up to 90% of the amount in their portfolio, subject to a maximum of Rs 50 thousand/day & a minimum Rs 500</i>',
                'contentposition':'left',
                'btnposition':'right',
                'link':'cash',
            }
        ];
    }
    initCarouselMob(){
        this.carouselContent = [
            { 'url': this.config.staticImagePath +'/assets/img/landingpage/daily-returns-savingsplus-blurred.jpg'},
            {
                'url': this.config.staticImagePath +'/assets/img/landingpage/daily-returns-savingsplus-m.jpg',
                'link':'cash',
            },
            {
                'url': this.config.staticImagePath + '/assets/img/landingpage/beat-fixed-deposit-savingsplus-m.jpg',
                'link':'cash'
            },
            {
                'url': this.config.staticImagePath + "/assets/img/landingpage/higher-returns-savingsplus-m.jpg",
                'link':"cash",
            },
            {
                'url': this.config.staticImagePath + "/assets/img/landingpage/instant-redemption-savingsplus-m.jpg",
                'link':'cash',
            }
        ];
    }


    calculate(age: number, expense: number) {
        this.router.navigate(['/calculator/sip/goals/questions/1', {'a': age, 'e': expense}]);
    }

    ngOnDestroy() {
        this.headerService.resetHeaderHiding()
    }
}
