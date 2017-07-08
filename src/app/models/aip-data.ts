export class AIPData {
    constructor(public soptRfnum: number,
                public frequency: string,
                public dates: string,
                public minAmount: number,
                public maxAmount: number,
                public minNoOfInstallment: number,
                public maxNoOfInstallment: number,
                public multiplier: number) {
    }

}