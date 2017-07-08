import {AbstractControl, AsyncValidatorFn, Validator} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../core/services/login.service";
import {Logger} from "../core/logger/logger";
import {HttpService} from "../core/services/http-service.service";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

export class ExistingUserValidator{

    static validateUserExistance(loginService: LoginService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<any> => {
            return loginService.doesUserExists(control.value)
                .debounceTime(1000)
                .distinctUntilChanged()
                .map(data => {
                    return ( data ? {'inValid': data} : null);
                })
        }
    }
}

export class ExistingPANValidator{
    static validatePANExistance(http: HttpService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<any> => {
            let panObj = {};
            panObj["pan"] = control.value.toUpperCase();
            return http.securePost('/user/panCheck', panObj)
                .debounceTime(1000)
                .distinctUntilChanged()
                .map(res => {
                if (!res['success']){
                    return {'inValid' : true}
                }
                return null;
            })
        }
    }
}

export class CustomAsyncValidator {
    constructor() {
    }

    static calcValueValid(logger: Logger, minValue: number): AsyncValidatorFn {
        return (control: AbstractControl): Observable<any> => {
            logger.debug("Calling calc valid function");
            const val = control.value;
            return Observable.of({'minValue': {'requiredValue': minValue, 'actualValue': val}});
        };
    }

}

export class MailgunAsyncValidator {

    static isEmailCorrect(http: HttpService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<any> => {
            const val = control.value; //typeof control.value.length > 0 ? control.value : 0;
            return http.post('/checkmail', {"email": val}, 5000, 0, true)
                .debounceTime(1000)
                .distinctUntilChanged()
                .map(response => {
                    if (!response['is_valid']) {
                        return {"inValidMailFormat": true};
                    } else {
                        return null;
                    }
                },
                error => {
                    return null;
                }
            )

        };
    }
}
