import {Inject, Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/timeout";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/take";
import {Logger} from "../logger/logger";
import {APP_CONFIG, IAppConfig} from "../../../environments/environment";
import {LoginService} from "./login.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class HttpService {

    className: string;
    private requests: any;
    public httpErrorSubject: Subject<any>;
    public httpErrorObservable: Observable<any>;
    httpTimeout: number;
    retryCount: number;

    constructor(private http: Http, private logger: Logger, @Inject(APP_CONFIG) private config: IAppConfig, private loginService: LoginService) {
        this.className = "HttpService";
        this.httpTimeout = 90000; // 180 second is load balance timeout & it throws gateway timeout exception
        this.retryCount = 1;
        this.requests = {};
        this.httpErrorSubject = new Subject<any>();
        this.httpErrorObservable = this.httpErrorSubject.asObservable();
    }


    get(path: string, _timeout?: number, _retry?: number, suppressErrors?: boolean): Observable<any> {
        path = this.config.playAPIUrl + path;
        this.logger.debug(this.className, path);
        let timeout = this.httpTimeout;
        if (!isNullOrUndefined(_timeout)) {
            timeout = _timeout;
        }
        let retry = this.retryCount;
        if (!isNullOrUndefined(_retry)) {
            retry = _retry;
        }
        return this.http.get(path).retry(retry).timeout(timeout)
            .map(this.extractData.bind(this)).catch(this.handleError.bind(this, suppressErrors));
    }

    post(path: string, data: any, _timeout?: number, _retry?: number, suppressErrors?: boolean): Observable<any> {
        path = this.config.playAPIUrl + path;
        this.logger.debug(this.className, path);
        this.logger.debug(this.className, data);
        let timeout = this.httpTimeout;
        if (!isNullOrUndefined(_timeout)) {
            timeout = _timeout;
        }
        let retry = this.retryCount;
        if (!isNullOrUndefined(_retry)) {
            retry = _retry;
        }

        return this.http.post(path, data).retry(retry).timeout(timeout)
            .map(this.extractData.bind(this)).catch(this.handleError.bind(this, suppressErrors))
    }

    secureGet(path: string, _timeout?: number, _retry?: number, suppressErrors?: boolean): Observable<any> {
        path = this.config.playAPIUrl + '/secure' + path;
        let timeout = this.httpTimeout;
        if (!isNullOrUndefined(_timeout)) {
            timeout = _timeout;
        }
        let retry = this.retryCount;
        if (!isNullOrUndefined(_retry)) {
            retry = _retry;
        }
        return this.http.get(path, this.loginService.setHeader()).retry(retry).timeout(timeout)
            .map(this.secureExtractData.bind(this)).catch(this.handleError.bind(this, suppressErrors));
    }

    securePost(path: string, data: any, _timeout?: number, _retry?: number, suppressErrors?: boolean): Observable<any> {
        path = this.config.playAPIUrl + '/secure' + path;
        this.logger.debug(this.className, path);
        this.logger.debug(this.className, data);
        let timeout = this.httpTimeout;
        if (!isNullOrUndefined(_timeout)) {
            timeout = _timeout;
        }

        let retry = this.retryCount;
        if (!isNullOrUndefined(_retry)) {
            retry = _retry;
        }
        return this.http.post(path, data, this.loginService.setHeader()).retry(retry).timeout(timeout)
            .map(this.secureExtractData.bind(this)).catch(this.handleError.bind(this, suppressErrors));
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private secureExtractData(res: Response) {
        //this.logger.debug(this.className, "URL >> " + res.url);
        // this.logger.debug(this.className, "responseHeaders >> " + JSON.stringify(res.headers));
        let body = res.json();
        this.logger.debug(this.className, "extractData >>>> ", body);
        if (!body['success'] && (body['refreshtoken'] || body['unauthorizedAccess'])) {
            this.logger.debug(this.className, "TOKEN EXPIRED ", body['refreshtoken'], " unauthorizedAccess ", body['unauthorizedAccess']);
            // logging out in case of token is expired for security reasons.
            //this.loginService.logOutUser(this.loginService.router.routerState.snapshot.url);
            this.loginService.logOutUser(this.config.dloginUrl);
        } else {
            this.loginService.processToken(res, false);
            return body || {};
        }
    }

    private handleError(error: Response | any, suppressErrors?: boolean) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || {};
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error['message'] ? error['message'] : error.toString();
        }
        this.logger.error(this.className, errMsg);
        if (!isNullOrUndefined(suppressErrors)) {
            if (!suppressErrors) {
                this.httpErrorSubject.next(errMsg);
            }
        } else {
            this.httpErrorSubject.next(errMsg);
        }
        return Observable.throw(errMsg);
    }
}