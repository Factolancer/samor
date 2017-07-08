import {Pipe, PipeTransform, Inject, LOCALE_ID} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {isNullOrUndefined} from "util";

@Pipe({
    name: 'round'
})
export class RoundPipe implements PipeTransform {

    transform (input:number) {
        return Math.floor(input);
    }

}
