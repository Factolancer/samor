/**
 * Created by Fincash on 03-03-2017.
 */

import {Injectable} from "@angular/core";
import {Logger} from "../../core/logger/logger";
import {SipCalcQuestion} from "./sip-calc-question";

@Injectable()
export class TaxCalcService {

    className: string;

    currentInv: number;
    invOpportunity: number;
    completeTherm: number;
    remainingTherm: number;
    taxSaved: number;


    constructor(public logger: Logger) {
        this.className = "TaxCalcService"
    }

    setResultValues(currentInv: number, invOpportunity: number, completeTherm: number,
                    remainingTherm: number, taxSaved: number) {
        this.currentInv = currentInv;
        this.invOpportunity = invOpportunity;
        this.completeTherm = completeTherm;
        this.remainingTherm = remainingTherm;
        this.taxSaved = taxSaved;

    }


}