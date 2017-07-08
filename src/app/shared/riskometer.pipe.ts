import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'riskometer'
})
export class RiskometerPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        let risk: string = "";
        switch (value) {
            case "H": {
                risk = "High";
                break;
            }
            case "MH": {
                risk = "Moderately High";
                break;
            }
            case "M": {
                risk = "Moderate";
                break;
            }
            case "ML": {
                risk = "Moderately Low";
                break;
            }
            case "L": {
                risk = "Low";
                break;
            }
            default: {
                risk = value;
                break;
            }
        }
        return risk;
    }

}