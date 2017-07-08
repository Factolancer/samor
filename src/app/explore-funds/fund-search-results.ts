import {Fund} from "../models/fund";


export class FundSearchResults {

    numFound: number;
    funds: Fund[];

    constructor(numFound?: number,
                funds?: Fund[]) {

        this.numFound = numFound || 0;
        this.funds = funds || [];
    }
}