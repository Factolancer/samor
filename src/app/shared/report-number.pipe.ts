import {Pipe, PipeTransform, Inject, LOCALE_ID} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'reportNumber'
})
export class ReportNumberPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private _locale: string) {
  }
  transform(value: any, args?: any): any {
      let digits: string = '1.2-2';
      let decimalPipe: DecimalPipe = new DecimalPipe(this._locale);
      if (isNullOrUndefined(value)) {
          ""
      } else{
          return decimalPipe.transform(value, digits);
      }
  }

}
