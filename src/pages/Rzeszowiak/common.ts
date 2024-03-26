export enum TIME {
    '24H' = 1,
    '3D' = 2,
    '7D' = 3,
    '14D' = 4,
    '30D' = 5,
}

export enum SORT {
    DATE_DESC = 1,
    DATE_ASC = 2,
    PRICE_DESC = 3,
    PRICE_ASC = 4,
}

export enum PAGE_SIZE {
    '15_ITEMS' = 15,
    '25_ITEMS' = 25,
    '50_ITEMS' = 50,
}

export const SITE_URL = 'https://www.rzeszowiak.pl' as const;

export enum QUERY_KEY {
    MAIN_PAGE = 'rzeszowiak.main',
    PAGE = 'rzeszowiak.page'
}
