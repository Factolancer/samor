import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {Logger} from "../core/logger/logger";
import {ActivatedRoute, Router} from "@angular/router";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";
import {isNullOrUndefined} from "util";
import {LoginService} from "../core/services/login.service";
import {Subscription} from "rxjs/Subscription";
import {CartService} from "../core/services/cart.service";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";
import {DataStorageService} from "../core/services/data-storage.service";

@Component({
    selector: 'app-social-login',
    templateUrl: '../shared/blanktemplate.html'
})

export class SocialLoginComponent implements OnInit, OnDestroy {
    className: string;
    token: any;
    loginSubscription: Subscription;
    cartSubscription : Subscription;

    constructor(private logger: Logger, private router: Router, private route: ActivatedRoute, @Inject(APP_CONFIG) private config: IAppConfig,
                private loginService: LoginService, private dataStorageService: DataStorageService,
                private cartService: CartService,private urlAccessGaurd: URLAccessGuard) {
        this.className = "SocialLoginComponent";
        if(this.cartService.getCartSubscription){
            this.cartService.getCartSubscription.unsubscribe()
        }
        this.token = this.route.snapshot.params['token'];
        //this.logger.debug(this.className," >>>>>>>>>>>>>>>>>>>>>> token in constructor >>>>>>>>>>>>>> ", this.token, " snapshot >>>> ", this.route.snapshot);
        if (isNullOrUndefined(this.token) || this.token.length == 0) {
            // login failed case
            this.cartService.initCart();
            this.router.navigate([this.config.dloginUrl]);
        }else {
            // login success case.
            let returnUrl = this.dataStorageService.get(this.config.returnUrlParam);
            this.logger.debug(this.className," return url >>>> ", returnUrl);
            this.loginSubscription = this.loginService.loginObservable.subscribe(loggedIn => {
                    this.logger.debug(this.className, "  loginService.loginObservable.subscribe >>> ", loggedIn);
                    if (!isNullOrUndefined(loggedIn) && loggedIn) {
                        let cartId = this.dataStorageService.get(this.config.cartToken);
                        this.cartService.mergeCart(cartId);
                        // to avoid infinite loop on logins ...
                        this.loginSubscription.unsubscribe();
                        if (!isNullOrUndefined(returnUrl)) {
                            this.dataStorageService.remove(this.config.returnUrlParam);
                            this.logger.debug(this.className," reutrn url ", returnUrl, JSON.stringify(returnUrl));
                            if(JSON.stringify(returnUrl).indexOf('checkout')!=-1){
                                this.urlAccessGaurd.allow = true;
                            }
                            this.router.navigate([returnUrl])
                        }
                        else {
                            this.router.navigate([this.config.defaultAfterLogin])
                        }
                    }
                },
                error => {
                    this.logger.debug(this.className, "Error in login")
                }
            );
            this.dataStorageService.set(this.config.authToken, this.token);
            // reinitializing login &  dataprovided to make  everything sync with  new token
            this.loginService.initToken();
            this.loginService.initUserFromStorage();
        }
    }

    ngOnInit() {

    }

    ngOnDestroy(){
        if (this.loginSubscription){
            this.loginSubscription.unsubscribe();
        }
        if(this.cartSubscription){
            this.cartSubscription.unsubscribe();
        }
    }
}