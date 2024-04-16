import { AHttpClient } from '@/http/AxiosAbstract';
import {
    QUERY_KEY,
    SITE_URL,
} from '../../common';
import { parseHTMLResponse } from '@/lib/helpers/HTMLhelpers';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CategoryView from './components/CategoryView/CategoryView';
import OfferWrapper from './components/OfferWrapper/OfferWrapper';
import useQueryParams from '@/lib/hooks/useQueryParams';

const numberRegex = /\d+/g;

const Page = () => {
    const { slug } = useParams();
    const { queryParamsUrl } = useQueryParams();

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

    const { data, isLoading } = useQuery({
        queryFn: () => AHttpClient.getPage(`${SITE_URL}/${slug}${queryParamsUrl}`, "ISO8859_2"),
        queryKey: [
            QUERY_KEY.PAGE,
            slug,
            queryParamsUrl,
        ],
        refetchOnWindowFocus: false,
    });

    const html = useMemo(() => parseHTMLResponse(data), [ data ]);

    return (
        <div>
            {isLoading && (
                <div>
                    Loading...
                </div>
            )}

            {/* {slug} */}

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
