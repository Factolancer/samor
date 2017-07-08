import {Pipe, PipeTransform, LOCALE_ID, Inject} from "@angular/core";
import {DecimalPipe, PercentPipe} from "@angular/common";

@Pipe({
    name: 'returns'
})


export class ReturnsPipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) private _locale: string) {
    }

    transform(value: any, percentSignDisplay?: boolean): any {
        let digits: string = '1.1-1';
        let decimalPipe: DecimalPipe = new DecimalPipe(this._locale);

        if (value == 0 || value == "null" || !value) {
            return "-";
        } else {
            if (percentSignDisplay) {
                return decimalPipe.transform(value, digits) + "%";
            } else {
                return decimalPipe.transform(value, digits);
            }
        }
    }

}

