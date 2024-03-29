import { AHttpClient } from '@/http/AxiosAbstract';
import {
    QUERY_KEY,
    SITE_URL,
} from '../../common';
import { parseHTMLResponse } from '@/lib/helpers/HTMLhelpers';
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CategoryView from './components/CategoryView/CategoryView';
import OfferWrapper from './components/OfferWrapper/OfferWrapper';

const numberRegex = /\d+/g;

const Page = () => {
    const { slug } = useParams();
    const [queryParams] = useSearchParams();

    const constructQueryParams = useMemo(
        () => {
            const params = [];

            for (const entry of queryParams.entries()) {
                console.log(entry)
                params.push(`${entry[0]}=${entry[1]}`)
            }

            return `?${params.join('&')}`
        },
        [queryParams]
    )

    const pageType = useMemo(
        () => {
            const numbers = slug?.match(numberRegex) || [];

            return {
                list: numbers[numbers.length - 1]?.length === 10,
                offer: numbers[numbers. length - 1]?.length === 8,
            };
        },
        [ slug ],
    );

    const { data } = useQuery({
        queryFn: () => AHttpClient.getPage(`${SITE_URL}/${slug}${constructQueryParams}`),
        queryKey: [
            QUERY_KEY.PAGE,
            slug,
            constructQueryParams,
        ],
    });

    const html = useMemo(() => parseHTMLResponse(data), [ data ]);

    return (
        <div>
            {slug}

            {pageType.list && (
                <CategoryView
                    body={html.body}
                    key={slug}
                />
            )}

            {pageType.offer && (
                <OfferWrapper
                    body={html.body}
                    key={slug}
                />
            )}
        </div>
    );
};

export default Page;
