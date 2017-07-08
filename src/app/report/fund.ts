export class Fund {

    constructor(public fundId: number,
                public fundName: string,
                public plan?: string,
                public divFreq?: string,
                public divOption?: string) {
    }
}
