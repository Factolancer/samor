import {Fund} from "./fund";
export class Cart {
    id: string;
    funds: Fund[];

    constructor(id?: string,
                funds?: Fund[]) {

        this.id = id || "";
        this.funds = funds || [];
    }
}
