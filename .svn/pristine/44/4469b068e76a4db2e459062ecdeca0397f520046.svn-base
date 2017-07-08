import {Pipe, PipeTransform, Inject, LOCALE_ID} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {isNullOrUndefined} from "util";

@Pipe({
    name: 'round2'
})
export class Round2Pipe implements PipeTransform {

    transform (input:number) {
        return input.toFixed(2);
    }

}
