export class SummaryFund {
    constructor(public soptRfnum: number,
                public name: string,
                public plan: string,
                public option: string,
                public investmentMode: string,
                public aIPFrequency: string,
                public deductionDate: number,
                public noOfInstallment: number,
                public amount: number) {
    }
}