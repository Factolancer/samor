import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/take";
import {ProgressBarService} from "./progressBarService";
import {Logger} from "../logger/logger";

@Injectable()
export class HeaderService extends ProgressBarService{

    public headerVisibilitySubject:BehaviorSubject<boolean>;
    public footerVisibilitySubject:BehaviorSubject<boolean>;

    private headerVisibleSubject: BehaviorSubject<boolean>;
    headerVisibilityObservable: Observable<boolean>;
    defaultBehaviour : boolean;
    className : string;
    logger: Logger;
    constructor(_logger: Logger) {
        super(_logger);
        this.className = "HeaderService";
        this.defaultBehaviour = false;
        this.headerVisibleSubject = new BehaviorSubject<boolean>(this.defaultBehaviour);
        this.headerVisibilityObservable = this.headerVisibleSubject.asObservable();
        this.logger = _logger;
        this.headerVisibilitySubject = new BehaviorSubject<boolean>(true);
        this.footerVisibilitySubject = new BehaviorSubject<boolean>(true);
    }

    hideHeader(){
        this.headerVisibilitySubject.next(false);
    }

    showHeader(){
        this.headerVisibilitySubject.next(true);
    }

    showFooter(){
        this.footerVisibilitySubject.next(true);
    }

    hideFooter(){
        this.footerVisibilitySubject.next(false);
    }



    autoHideHeader(value: boolean) {
        this.logger.debug(this.className,"autoHideHeader()",value);
        this.headerVisibleSubject.next(value);
    }

    resetHeaderHiding(){
        this.logger.debug(this.className,"resetHeaderHiding()",this.defaultBehaviour);
        this.headerVisibleSubject.next(this.defaultBehaviour);
    }


    deviceType() {
        let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let deviceType = '';
        switch (true) {
            case (width < 600):
               deviceType = 'xs';
                break;
            case (width < 960):
                deviceType =  'sm';
                break;
            case (width < 1280) :
                deviceType =  'md';
                break;
            case (width < 1920) :
                deviceType =  'lg';
                break;
            case (width < 5000) :
                deviceType =  'xl';
                break;
            default:
                deviceType =  'md';
                break;
        }
        return deviceType;
    }
}
