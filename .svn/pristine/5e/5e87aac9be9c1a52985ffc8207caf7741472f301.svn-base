import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CheckoutLZeroLOne} from "../checkout-l-zero-l-one";
import {LOneLZeroBankInfo} from "../models/l-zero-l-one-bank-info";
import {BseBank} from "../models/bse-bank";

@Injectable()
export class LZeroLOneService{

    public lZeroLOneDetailsSubject:BehaviorSubject<LOneLZeroBankInfo>;

    constructor(){
        this.lZeroLOneDetailsSubject = new BehaviorSubject<LOneLZeroBankInfo>(new LOneLZeroBankInfo([],[]))
    }

    setlOneLZeroDetais(checkoutLZeroLOne:CheckoutLZeroLOne[], bseBank:BseBank[]){
        this.lZeroLOneDetailsSubject.next(new LOneLZeroBankInfo(checkoutLZeroLOne,bseBank))
    }
}