import {BasicFactSheet} from "../models/basic-factsheet";
import {FundVsBenchmark} from "./fund-vs-benchmark";
import {Fund} from "../models/fund";
export class DebtAdvancedFactsheet {
    constructor(public basicFactsheet: BasicFactSheet,
                public sinceInceptionCmp: FundVsBenchmark,
                public annualReturns: FundVsBenchmark,
                public quarterlyReturns: FundVsBenchmark,
                public monthlyReturns: FundVsBenchmark,
                public peerComparison: Fund[],
                public topHoldings: {
                    asOfDate: string,
                    holdings: any
                },
                public fundHoldings: {
                    asOfDate: string,
                    dataMap: any
                },) {

    }
}