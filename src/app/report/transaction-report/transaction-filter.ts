export class TransactionFilter {

    public startDate: string;
    public endDate: string;
    public fundId: number;
    public transType: string;
    public folioId: number;

    constructor() {
    }
}

export class FolioFilter {
    public folioId: number;
    public folioNo: string;
}
