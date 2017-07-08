import {APP_BASE_HREF} from '@angular/common';
import {Inject, Injectable, Optional} from '@angular/core';
import {CookieOptionsArgs} from '../model/cookie-options-args.model';
import {UtilityService} from "../../utility.service";

/** @private */
export class CookieOptions {
    path: string;
    domain: string;
    expires: string | Date;
    secure: boolean;
    cookieExpiryTime: string;

    constructor({path, domain, expires, secure}: CookieOptionsArgs = {}) {
        this.cookieExpiryTime = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)).toUTCString(); //7 days
        this.path = this.isPresent(path) ? path : null;
        this.domain = this.isPresent(domain) ? domain : null;
        this.expires = this.isPresent(expires) ? expires : this.cookieExpiryTime;
        this.secure = this.isPresent(secure) ? secure : true;
    }

    merge(options?: CookieOptionsArgs): CookieOptions {
        return new CookieOptions(<CookieOptionsArgs>{
            path: this.isPresent(options) && this.isPresent(options.path) ? options.path : this.path,
            domain: this.isPresent(options) && this.isPresent(options.domain) ? options.domain :
                this.domain,
            expires: this.isPresent(options) && this.isPresent(options.expires) ? options.expires :
                this.expires,
            secure: this.isPresent(options) && this.isPresent(options.secure) ? options.secure :
                this.secure,
        });
    }

    private isPresent(obj: any): boolean {
        return obj !== undefined && obj !== null;
    }
}

/** @private */
@Injectable()
export class BaseCookieOptions extends CookieOptions {
    constructor(@Optional() @Inject(APP_BASE_HREF) private baseHref: string) {
        super({path: baseHref || '/'});
    }
}
