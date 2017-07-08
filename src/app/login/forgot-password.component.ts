import {Component, Inject, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

import {HttpService} from "../core/services/http-service.service";
import {EmailValidator} from "../validators/validator";
import {Logger} from "../core/logger/logger";
import {SnackBarService} from "../core/services/snack-bar.service";
import {LoginService} from "../core/services/login.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/timer";
import {TitleService} from "../core/services/title.service";
import {isNullOrUndefined} from "util";
import {APP_CONFIG, IAppConfig} from "../../environments/environment";

@Component({
    selector: 'app-forgot-pass',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./password.component.scss']
})

export class ForgotPasswordComponent implements OnInit, OnDestroy {
    forgotPasswordForm: FormGroup;
    email: any;
    emailSent: boolean;
    forgotPassSubmitted: boolean;
    startLoading: boolean;
    mailResLoading: boolean;
    userObject: any;
    mailSub: Subscription;
    shakeSub: Subscription;
    shake: boolean;

    reCapatchaVerifyResponse: string;
    isHuman: boolean;

    constructor(private loginService: LoginService, @Inject(APP_CONFIG) config: IAppConfig, public viewContainerRef: ViewContainerRef, public router: Router, private http: HttpService, private fb: FormBuilder, private logger: Logger, public snackBar: SnackBarService,
                private titleService: TitleService) {
        this.startLoading = false;
        this.mailResLoading = false;
        this.userObject = this.loginService.getUserObject();
        this.shake = false;
        this.isHuman = true;

        /*recaptcha part*/
        window['verifyCallback'] = this.verifyCallback.bind(this);
        window['expiryCallback'] = this.expiryCallback.bind(this);
        let doc = <HTMLHeadElement>document.getElementsByTagName("head")[0];
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        doc.appendChild(script);
    }

    public verifyCallback(response) {
        this.reCapatchaVerifyResponse = response;
        if (!isNullOrUndefined(this.reCapatchaVerifyResponse)) {
            this.isHuman = true;
        }
    }
    public expiryCallback() {
        delete(this.reCapatchaVerifyResponse);
    }

    ngOnInit() {
        this.titleService.setTitle('password_assistance');
        this.titleService.setMetaTags('password_assistance');
        if (this.userObject && this.userObject.username && !this.userObject.username.includes("Anonymous")) {
            this.email = this.userObject.username.toLowerCase();
            this.sendMail(this.email);
        } else {
            this.startLoading = true;
        }
        this.forgotPasswordForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValidMailFormat])]
        });
    }

    validateForgotPass(isValid) {
        if (!isValid) {
            this.forgotPassSubmitted = true;
        }
        if (isNullOrUndefined(this.reCapatchaVerifyResponse)) {
            this.isHuman = false;
            isValid = false;
        }
        this.shake = isValid ? false : true;
        this.freezeShake();
        return isValid;
    }
    onForgotPassword() {
        this.loginService.verifyReCaptcha(this.reCapatchaVerifyResponse).subscribe((verifyRes) => {
            if (verifyRes) {
                this.isHuman = true;
                let userData = this.forgotPasswordForm.value;
                let email = userData.email.trim();
                this.sendMail(email);
            }else {
                this.isHuman = false;
                /*recaptcha reload logic to be added upon one use*/
            }
        });
    }
    freezeShake() {
        this.shakeSub = Observable.timer(1000).subscribe((tv) => {
            this.shake = false;
        });
    }

    sendMail(email) {
        let nonRegUserMsg = "This email ID does not exist in our system – sure you have spelt it right?";
        this.mailResLoading = true;
        this.mailSub = this.http.post('/forgotPasswordMail', {email: email}).subscribe(
            res => {
                this.mailResLoading = false;
                this.startLoading = true;
                this.logger.info(res);
                if (res.exists) {
                    this.emailSent = true;
                    this.email = email;
                } else {
                    this.snackBar.showSnackBar(nonRegUserMsg, '', this.viewContainerRef);
                }
            },
            err => {
                this.mailResLoading = false;
                this.logger.error(err);
            }
        )
    }

    ngOnDestroy() {
        if (this.mailSub) {
            this.mailSub.unsubscribe();
        }
        if (this.shakeSub) {
            this.shakeSub.unsubscribe();
        }
    }

}
