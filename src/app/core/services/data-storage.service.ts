import {Injectable} from "@angular/core";
import {Logger} from "../logger/logger";
import {CookieService} from "./cookie/services/cookies.service";
import {BrowserSupportService} from "./browser-support.service";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class DataStorageService extends LocalStorageService {
    className: string;
    isLocalStorageSupported: boolean;


    constructor(private logger: Logger, private cookieService: CookieService, private browserSupportService: BrowserSupportService) {

        super({
            prefix: 'fincash',
            storageType: 'localStorage'
        });
        this.className = "DataStorageService: ";
        this.isLocalStorageSupported = this.browserSupportService.isLocalStorageSupported();
        this.logger.debug(this.className + this.isLocalStorageSupported );
    }

    add(key: string, value: any): boolean {
        if (this.isLocalStorageSupported) {
            return super.add(key, value);
        } else {
            this.cookieService.putObject(key, value);
            return true;
        }
    }

    clearAll(regularExpression?: string): boolean {
        if (this.isLocalStorageSupported) {
            return super.clearAll(regularExpression)
        } else {
            //this.logger.debug("Removal by regular expression not supported in cookies")
            this.cookieService.removeAll()
            return true;
        }
    }

    get(key: string): any {
        if (this.isLocalStorageSupported) {
            return super.get(key)
        } else {
            return this.cookieService.get(key)
        }
    }

    keys(): any {
        if (this.isLocalStorageSupported) {
            return super.keys()
        } else {
            return this.cookieService.getAll()
        }
    }

    length(): number {
        if (this.isLocalStorageSupported) {
            return super.length();
        } else {
            // this.logger.debug("length function not supported in cookies");
            return null
        }
    }

    remove(key: string): boolean {
        if (this.isLocalStorageSupported) {
            return super.remove(key)
        } else {
            this.cookieService.remove(key)
            return true;
        }
    }


    set(key: string, value: any): boolean {
        if (this.isLocalStorageSupported) {
            return super.set(key, value)
        } else {
            this.cookieService.put(key, value)
            return true;
        }
    }
}