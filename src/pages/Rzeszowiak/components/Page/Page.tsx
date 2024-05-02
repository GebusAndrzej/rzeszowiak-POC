import { AHttpClient } from '@/http/AxiosAbstract';
import {
    QUERY_KEY,
    SITE_URL,
} from '../../common';
import { parseHTMLResponse } from '@/lib/helpers/HTMLhelpers';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CategoryView from './components/CategoryView/CategoryView';
import DataLoader from '@/components/DataLoader/DataLoader';
import ListViewSkeleton from '@/components/Skeletons/ListViewSkeleton/ListViewSkeleton';
import OfferDetailsSkeleton from '@/components/Skeletons/OfferDetailsSkeleton/OfferDetailsSkeleton';
import OfferWrapper from './components/OfferWrapper/OfferWrapper';
import useQueryParams from '@/lib/hooks/useQueryParams';

const numberRegex = /\d+/g;

type Props = {
    mainPageHtml?: Document;
}

const Page = ({mainPageHtml} : Props) => {
    const { slug } = useParams();
    const { queryParamsUrl } = useQueryParams();

    const pageType = useMemo(
        () => {
            const numbers = slug?.match(numberRegex) || [];

            return {
                list: numbers[numbers.length - 1]?.length === 10,
                offer: numbers[numbers. length - 1]?.length === 8,
                index: !numbers.length
            };
        },
        [ slug ],
    );

    const {
        data,
        ...queryData
    } = useQuery({
        queryFn: () => AHttpClient.GetPagePost({
            fromCharset: "ISO8859_2",
            q: `${SITE_URL}/${slug}${queryParamsUrl}`,
        }),
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
            {pageType.index && mainPageHtml && (
                <CategoryView
                        body={mainPageHtml.body}
                        key={slug}
                    />
            )}

            {pageType.list && (
                <DataLoader
                    {...queryData}
                    skeleton={<ListViewSkeleton />}
                >
                    <CategoryView
                        body={html.body}
                        key={slug}
                    />
                </DataLoader>
            )}

            {pageType.offer && (
                <DataLoader
                    {...queryData}
                    skeleton={<OfferDetailsSkeleton />}
                >
                    <OfferWrapper
                        body={html.body}
                        key={slug}
                    />
                </DataLoader>
            )}
        </div>
    );
};

export default Page;
