import {Inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {APP_CONFIG, IAppConfig} from "../../../environments/environment";
import {Logger} from "../logger/logger";
import {JwtHelper} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {UserDataProviderService} from "./userdata-provider.service";
import {Http} from "@angular/http";
import {UserLogin} from "../../models/userLogin";
import {DataStorageService} from "./data-storage.service";

@Injectable()
export class LoginService extends UserDataProviderService {

    private dafterLogin: string;
    private dafterLogout: string;
    private returnurlParam: string;

    loginObservable: Observable<boolean>;
    userObservable: Observable<any>;
    userVerifiedOservable: Observable<boolean>;
    router: Router;

    constructor(_router: Router, @Inject(APP_CONFIG) config: IAppConfig, logger: Logger,
                defaultHttp: Http, dataStorageService: DataStorageService, jwtHelper: JwtHelper) {
        super(config, logger, dataStorageService, jwtHelper, defaultHttp);
        this.dafterLogin = config.defaultAfterLogin;
        this.dafterLogout = config.defaultAfterLogout;
        this.returnurlParam = this.config.returnUrlParam;
        this.className = "LoginService";
        this.loginObservable = this.loginSubject.asObservable();
        this.userObservable = this.userSubject.asObservable();
        this.userVerifiedOservable = this.userVerified.asObservable();
        this.router = _router;
        this.initUserFromStorage();
    }

    public checkNredirect() {
        let isLoggedIn = this.getLoginState();
        if (isLoggedIn) {
            this.logger.debug(this.className, isLoggedIn);
            this.router.navigate([this.config.defaultAfterLogin]);
        }
    }

    public signUp(userData: any): Observable<any> {
        let cartId = this.dataStorageService.get(this.config.cartToken);
        if (isNullOrUndefined(cartId)) {
            cartId = '';
        }
        //let userObservables = this.getUserObservable.concat(this.userLoggedInObservable);
        return this.defaultHttp.post(this.config.playAPIUrl + '/secure/user/login/signup', {
            "username": userData.email.trim().toLowerCase(),
            "email": userData.email,
            "password": userData.password.confirm_password
        }, this.setHeader()).map(response => {
            if (!isNullOrUndefined(response)) {
                let body = response.json();
                this.processToken(response, true);
                return body;
            }
            return response
        }).catch(error => {
            this.logger.debug(this.className, "Error Occured! :( " + error.error);
            return Observable.throw(error);
        });

    }

    public loginUser(userData: any): Observable<any> {
        this.logger.debug(this.className, userData);
        return this.defaultHttp.post(this.config.playAPIUrl + '/secure/user/login', {
            "username": userData.email.trim().toLowerCase(),
            "password": userData.password
        }, this.setHeader()).map(response => {
            if (!isNullOrUndefined(response)) {
                let body = response.json();
                this.processToken(response, true);
                return body;
            }
            return response;
        }).catch(err => {
            return Observable.throw(err);
        });
    }


    public doesUserExists(username: string): Observable<any> {
        this.logger.debug(this.className, username);

        return this.defaultHttp.post(this.config.playAPIUrl + '/secure/user/checkUsernameInDB', {
            "username": username
        }, this.setHeader()).map(response => {
            if (!isNullOrUndefined(response)) {
                let body = response.json()
                if (!isNullOrUndefined(body['doesUserExists'])) {
                    return body['doesUserExists'];
                }
            }
            return false
        }).catch(error => {
            this.logger.debug(this.className, "Error Occured! :( " + error.error);
            return Observable.throw(error);
        })
    }

    public invalidateToken() {
        this.logger.debug(this.className, "Invalidating token on server");
        return this.defaultHttp.get(this.config.playAPIUrl + '/secure/invalidate', this.setHeader()).map(response => {
            if (!isNullOrUndefined(response)) {
                let body = response.json();
                this.logger.debug(this.className, " invalidateToken() response ", body);
            }
            return response;
        });
    }

    public logOutUser(logoutUrl?: string) {
        //this.logger.debug(this.className, " token expired redirect url >>>> ", logoutUrl);
        let lurl = this.config.defaultAfterLogout;
        if (!isNullOrUndefined(logoutUrl)) {
            lurl = logoutUrl;
        }
        this.dataStorageService.remove(this.config.authToken);
        this.clearDataProviders();
        this.router.navigate([lurl]);

    }

    public clearDataProviders() {
        this.initToken();
        this.initUserFromStorage();
    }

    public initUserFromStorage() {
        let token = this.dataStorageService.get(this.config.authToken);
        this.logger.debug(this.className, "initUserFromStorage()", token);
        if (!isNullOrUndefined(token) && token != 'null' && token != 'undefined') {
            let tokenExpired = this.jwtHelper.isTokenExpired(JSON.stringify(token));
            if (tokenExpired) {
                this.logger.debug(this.className, " token expired clearing cart & ", " redirecting to login page");
                this.dataStorageService.remove(this.config.cartToken);
                this.logOutUser(this.config.dloginUrl);
                return;
            }

            let user = this.jwtHelper.decodeToken(JSON.stringify(token));
            this.logger.debug(this.className, user);
            this.setUserSubjectState(user);
            if (user && user.username && !user.username.includes("Anonymous")) {
                this.setLoginSubjectState(true);
                this.processUserData();
            } else {
                this.setLoginSubjectState(false);
                this.setUserSubjectState(new UserLogin);
                this.setUserVerified(false);
            }
        } else {
            this.setLoginSubjectState(false);
            this.setUserSubjectState(new UserLogin);
            this.setUserVerified(false);
        }
    }

    public getUserObject(): UserLogin {
        return this.userSubject.getValue();
    }

    public getLoginState(): boolean {
        return this.loginSubject.getValue();
    }


    public setLoginSubjectState(value: boolean) {
        this.loginSubject.next(value);
    }

    public setUserVerified(value: boolean) {
        this.userVerified.next(value);
    }

    public setUserSubjectState(value: UserLogin) {
        this.userSubject.next(value);
    }

    public verifyReCaptcha(gresponse): Observable<boolean> {
        let data = {'response': gresponse};
        return this.defaultHttp.post(this.config.playAPIUrl + '/getGoogleCaptchaValidity', data).map((googleRes) => {
            let body = googleRes.json();
            if (isNullOrUndefined(gresponse)) {
                return false;
            } else {
                return body['success'];
            }
        });
    }
}
