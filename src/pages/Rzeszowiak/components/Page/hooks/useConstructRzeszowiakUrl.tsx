import {
    PAGE_SIZE,
    SORT,
    TIME,
} from '@/pages/Rzeszowiak/common';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export const useConstructRzeszowiakUrl = (url?: string) => {
    const { slug } = useParams();

    const isCategoryPage = useMemo(
        // ends with 8 digits - offert 10 -category??
        () => true,
        [],
    );

    const defaultPage = '001';
    const defaultSort = SORT.DATE_DESC;
    const pageSize = PAGE_SIZE[15];
    const timeline = TIME['30D'];

    //
    //               |=sortowanie
    //               |  |=ostatnie: 1-24h, 2 - 3h...
    //  INFO : 2800011505
    //category-xxx||| ||=ilość na stronie
    //            |||= strona

    const urlFromQueryString = useMemo(
        () => `https://www.rzeszowiak.pl/${slug}${defaultPage}${defaultSort}${pageSize}${timeline}`,
        [
            defaultSort,
            pageSize,
            slug,
            timeline,
        ],
    );

    const createLocalUrl = useMemo(
        () => `${url}${defaultPage}${defaultSort}${pageSize}${timeline}`,
        [
            defaultSort,
            pageSize,
            timeline,
            url,
        ],
    );

    return {
        createLocalUrl,
        isCategoryPage,
        slug,
        urlFromQueryString,
    };
};

export default useConstructRzeszowiakUrl;
