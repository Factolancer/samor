/*
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable, Inject} from "@angular/core";
import {RegistrationComponent} from "../../registration/registration.component";
import {Logger} from "../logger/logger";
import {IAppConfig, APP_CONFIG} from "../../../environments/environment";

export interface CanDeactivate<T> {
    canDeactivate(component: T, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean;
}

@Injectable()
export class RegistrationFormGuard implements CanDeactivate<RegistrationComponent> {

    className : string;
    constructor(private router: Router, public logger: Logger, @Inject(APP_CONFIG) private config: IAppConfig ) {
        this.className =  "RegistrationFormGuard"

    }

    canDeactivate(component: RegistrationComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
        this.logger.debug(this.className,"canDeactivate called");
        return component.areFormsSaved();
    }
}*/
