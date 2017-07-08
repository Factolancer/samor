import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
@Injectable()
export class URLAccessGuard implements CanActivate {

    constructor(private router: Router, private location: Location) {

    }

    //must be set to true for navigation to succeed
    allow = false;

    canActivate() {
        if (this.allow) {
            this.allow = false;
            return true;
        }
        else {
            // start a new navigation to redirect to login page

            this.router.navigate(['/']);
            // abort current navigation
            //this.location.forward();
            return false;
        }
    }
}