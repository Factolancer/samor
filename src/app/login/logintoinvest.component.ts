import {Component, OnInit, Inject, OnDestroy, ViewContainerRef, ViewEncapsulation} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from "@angular/forms";
import {EmailValidator} from "../validators/validator";
import {HttpService} from "../core/services/http-service.service";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";
import {LoginService} from "../core/services/login.service";
import {Logger} from "../core/logger/logger";
import {isNullOrUndefined} from "util";
import {MdSnackBar} from '@angular/material';
import {CartService} from "../core/services/cart.service";
import {ExistingUserValidator, MailgunAsyncValidator} from "../validators/asyncValidator";
import {TitleService} from "../core/services/title.service";
import {IsBasicDetailsUpdatedService} from "../core/services/isbasicDetailUpdated.service";
import {URLAccessGuard} from "../core/guards/urlAccess.guard";
import "rxjs/add/operator/toPromise";
import {SnackBarService} from "../core/services/snack-bar.service";
import {LocalStorageService} from "angular-2-local-storage";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/timer';
import {Subscription} from "rxjs/Subscription";
import {DataStorageService} from "../core/services/data-storage.service";

function passwordValidator(c: AbstractControl) {
    return c.get('confirm_password').value === c.get('enter_password').value
        ? null : {'mismatch': true};
}

@Component({
    selector: 'app-logintoinvest',
    templateUrl: './logintoinvest.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})


export class LoginToInvestComponent implements OnInit, OnDestroy {
    result: any;
    LoginForm: FormGroup;
    signUpForm: FormGroup;
    returnUrl: string;
    userData: any;
    name: String;
    email: String;
    errormessage: String = "";
    errormessage2: String = "";
    selectedTab: number;
    path: any;
    className: string;
    //shakeSub: Subscription;

    loginResLoading: boolean;
    signupResLoading: boolean;
    logInError: any;
    //shake:boolean;
    signUpSubmitted: boolean = false;
    signInSubmitted: boolean = false;

    constructor(private viewContainerRef: ViewContainerRef, public router: Router, private route: ActivatedRoute,
                public http: HttpService, public fb: FormBuilder, @Inject(APP_CONFIG) private config: IAppConfig,
                public loginService: LoginService, private logger: Logger, public snackBar: MdSnackBar,
                private cartService: CartService, private titleService: TitleService,
                private isBasicDetailsUpdatedService: IsBasicDetailsUpdatedService, private dataStorageService: DataStorageService,
                private urlAccessGuard: URLAccessGuard, public snacknarService: SnackBarService) {

        this.loginService.checkNredirect();
        this.returnUrl = this.config.defaultAfterLogin;
        this.selectedTab = 0;
        this.className = 'LoginToInvestComponent';
        this.titleService.setTitle("login");
        this.titleService.setMetaTags("login");
        this.loginResLoading = false;
        this.signupResLoading = false;
        //this.shake = false;

    }

    validateSignUp(isValid) {
        this.signUpSubmitted = true;
        /*this.shake = isValid?false:true;
         this.freezeShake();*/
        return isValid;
    }

    /*freezeShake(){
     this.shakeSub = Observable.timer(1000).subscribe( (tv) => {
     this.shake = false;
     });
     }*/

    validateSignIn(isValid) {
        this.signInSubmitted = true;
        /* this.shake = isValid?false:true;
         this.freezeShake();*/
        return isValid;
    }

    typePass: string = 'password';

    onLogIn() {
        this.loginResLoading = true;
        this.userData = this.LoginForm.value;
        this.logger.debug(this.className, this.userData);
        this.loginService.loginUser(this.userData).subscribe((_value) => {
            this.loginResLoading = false;

            this.logger.debug(this.className, _value, "in component");
            if (!isNullOrUndefined(_value['error'])) {
                this.logInError = _value['error'];
                this.snacknarService.showSnackBar(this.logInError, "Retry", this.viewContainerRef);
            } else {
                this.cartService.mergeCart();
                this.isBasicDetailsUpdatedService.checkIfBasicDetailsUpdated(false).subscribe(isDataPresent => {
                    if (isDataPresent) {
                        this.router.navigate([this.returnUrl]);
                        this.dataStorageService.remove(this.config.returnUrlParam);
                    } else {
                        this.router.navigate([this.config.defaultAfterSignup]);
                    }
                })
            }
        }, err => {
            this.loginResLoading = false;
            this.snacknarService.showIndefiniteSnackBar("Something went wrong, Try Google/Facebook Login or 'Forgot password' option", "Okay", this.viewContainerRef);
        });
    }


    onSignUp() {
        this.signupResLoading = true;

        this.userData = this.signUpForm.value;
        this.logger.debug(this.className, this.userData);
        this.loginService.signUp(this.userData).subscribe((value) => {

            this.signupResLoading = false;
            if (!value['error']) {
                /*this.logger.debug(this.className, "onSignUp() >> Signup successfull");
                 if (this.returnUrl && this.returnUrl.length > 0) {
                 this.router.navigate([this.returnUrl]);
                 this.dataStorageService.remove(this.config.returnUrlParam);
                 } else {
                 this.router.navigate([this.config.defaultAfterLogin]);
                 }*/
                this.logger.info("after signup", value)
                this.router.navigate([this.config.defaultAfterSignup]);
            } else {
                this.logger.debug(this.className, "onSignUp() >> User already exists");
                this.logger.info("after signup failed", value);
                this.errormessage2 = value['error'];
            }
        }, err => {
            this.signupResLoading = false;
            this.snacknarService.showSnackBar("Something went wrong", "Retry", this.viewContainerRef);
        });

    }

    forgotPassword() {
        this.urlAccessGuard.allow = true;
        this.router.navigate(['/auth/password-assistance/forgot']);
    }

    /* loadTab() {
     this.logger.debug(this.className, "selected tab >>> " + this.selectedTab);
     if (this.selectedTab == 0) {
     // login in case
     } else if (this.selectedTab == 1) {
     // sign  up case
     }
     }*/

    processTabs() {
        if (!isNullOrUndefined(this.path)) {
            if (this.path == 'signup')
                this.selectedTab = 1;
            else
                this.selectedTab = 0;
        }
        this.logger.debug(this.className, "Selected tab index  >>> " + this.selectedTab + " path  >>> " + this.path);
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.path = params['path'];
            this.processTabs();
            if (params[this.config.returnUrlParam]) {
                this.returnUrl = params[this.config.returnUrlParam];
                this.dataStorageService.set(this.config.returnUrlParam, this.returnUrl);
            }
        });

        this.logger.debug(this.className, "Preparing login form");
        this.LoginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValidMailFormat])/*,
             Validators.composeAsync([MailgunAsyncValidator.isEmailCorrect(this.http)])*/],
            password: ['', Validators.compose([Validators.required])]
        });

        this.logger.debug(this.className, "Preparing signup form");
        this.signUpForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(60), EmailValidator.isValidMailFormat]),
                Validators.composeAsync([MailgunAsyncValidator.isEmailCorrect(this.http), ExistingUserValidator.validateUserExistance(this.loginService)])],
            /*mob: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]{10}$')])],*/
            password: this.fb.group({
                enter_password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
                confirm_password: ['', Validators.compose([])]
            }, {validator: Validators.compose([passwordValidator])})
        });
        /*this.LoginForm.valueChanges.subscribe(data => {
         this.logger.debug(this.LoginForm);
         })*/
    }

    isEmailUnique(control: FormControl) {
        /*return (control: AbstractControl): Observable<{[key: string]: any}{

         }*/
        return this.loginService.doesUserExists(control.value).map((_value) => {
            this.logger.debug(!_value);
            if (_value) {
                return {'inValid': true};
            } else {
                return {'inValid': false};
            }
        }, () => {
            return {'inValid': false}
        });
    }

    ngOnDestroy() {
        /*   if ( this.shakeSub) {
         this.shakeSub.unsubscribe();
         }*/

    }
}
