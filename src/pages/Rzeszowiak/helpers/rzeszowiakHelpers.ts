import {
    PAGE_SIZE,
    SORT,
    TIME,
} from '../common';

//
//               |=sortowanie
//               |  |=ostatnie: 1-24h, 2 - 3h...
//  INFO : 2800011505
//category-xxx||| ||=ilość na stronie
//            |||= strona

export const constructCategoryUrl = (
    url: string,
    options: {
        page?: string;
        sort?: SORT | string;
        size?: PAGE_SIZE | string;
        time?: TIME | string;
    } = {
        page: '001',
        size: PAGE_SIZE['15_ITEMS'],
        sort: SORT.DATE_DESC,
        time: TIME['30D'],
    },
) => {
    const [mainUrl, originalQueryString] = url.split('?');

    const queryString = originalQueryString
        ? `?${originalQueryString}`
        : ''
    
    return `${mainUrl}${options.page}${options.sort}${options.size}${options.time}${queryString}`
};
