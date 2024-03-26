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

const numberRegex = /\d+/g;

const Page = () => {
    const { slug } = useParams();

    const pageType = useMemo(
        () => {
            const numbers = slug?.match(numberRegex) || [];

            return {
                list: numbers[0]?.length === 10,
                offer: numbers[0]?.length === 8,
            };
        },
        [ slug ],
    );

    const { data } = useQuery({
        queryFn: () => AHttpClient.getPage(`${SITE_URL}/${slug}`),
        queryKey: [
            QUERY_KEY.PAGE,
            slug,
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
