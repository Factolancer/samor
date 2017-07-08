export class ExploreFundConstants {

    /* Solr Constants*/
    public static get SEARCH_QUERY(): string {
        return "search";
    }

    public static get FILTER_QUERY(): string {
        return "filter";
    }

    public static get SORT_QUERY(): string {
        return "sort";
    }

    public static get PAGE_QUERY(): string {
        return "page";
    }

    public static get SORT_ASC(): string {
        return "asc";
    }

    public static get SORT_DESC(): string {
        return "desc";
    }

    public static get SORT_NUETRAL(): string {
        return "nuetral";
    }

    /* Search type constants */
    public static get SIP_FUNDS(): string {
        return "sip";
    }

    public static get OTHER_SEARCH(): string {
     return "o";
     }

    /* public static get ALL_FUNDS(): string {
     return "all";
     }*/

    public static get RATING_FILTER(): string {
        return "rating";
    }


    public static get AUM_FILTER(): string {
        return "aum";
    }


    public static get AMC_FILTER(): string {
        return "am";
    }


    public static get CATEGORY_FILTER(): string {
        return "c";
    }


    public static get SUBCATEGORY_FILTER(): string {
        return "sc";
    }


    public static get AGE_FILTER(): string {
        return "ag";
    }

    public static get KEYWORD_SEARCH(): string {
        return "q";
    }
}
