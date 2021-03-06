import {BasicFactSheet} from "./basic-factsheet";
import {Product} from "./product";
export class Fund {
    constructor(public id: string,
                public name: string,
                public age: number,
                public rating: number,
                public aum: number,
                public amcid: number,
                public amc: string,
                public cid: number,
                public category: string,
                public scid: number,
                public subCategory: string,
                public basicFactsheet: BasicFactSheet,
                public selected: boolean = false,
                public investmentMode: string,
                public isFincashProduct: boolean,
                public sipAllowed: boolean,
                public productObj?: Product,
                public defaultSopt?: number) {
    }

}