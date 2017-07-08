import {FilterData} from "./filters/filter-data";


export class FundSearchFacets {
    constructor(public ratingFilterData?: FilterData[],
                public aumFilterData?: FilterData[],
                public amcFilterData?: FilterData[],
                public ageFilterData?: FilterData[],
                public categoryFilterData?: FilterData[],
                public subCategoryFilterData?: FilterData[]) {
    }
}