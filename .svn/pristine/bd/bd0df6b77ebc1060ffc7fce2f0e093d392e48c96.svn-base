import {CanActivate, Router} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {LoginService} from "../services/login.service";
import {APP_CONFIG, IAppConfig} from "../../../environments/environment";

@Injectable()
export class LoginCheckGuard implements CanActivate {

    constructor(private router: Router, private location: Location, private loginService: LoginService,
                @Inject(APP_CONFIG) private config: IAppConfig) {}

    canActivate() {
        let isLoggedIn = this.loginService.getLoginState();

        if (isLoggedIn){
            this.router.navigate([this.config.defaultAfterLogin]);
            return false;
        }
        else {
            return true;
        }
    }
}

