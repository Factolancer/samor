import {AIPData} from "./aip-data";
export class FundOption {
    constructor(public soptRfnum: number,
                public legalName: string,
                public schemePlan: string,
                public dividendFrequency: string,
                public dividendOption: string,
                public sipAllowed: boolean,
                public minLumpsum: number,
                public isDefault: boolean,
                public aipData: AIPData[],
                public minAddLumpSum: number,
                public minLumpsumMultiplier: number) {
    }

}