import {Pipe, PipeTransform, LOCALE_ID, Inject} from "@angular/core";
import {DecimalPipe} from "@angular/common";

@Pipe({
    name: 'ratio'
})


export class RatioPipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) private _locale: string) {
    }

    transform(value: any): any {
        let digits: string = '1.1-1';
        let decimalPipe: DecimalPipe = new DecimalPipe(this._locale);

        if (value == 0 || value == "null" || !value) {
            return "-";
        } else {
            return decimalPipe.transform(value, digits);
        }
    }

}

