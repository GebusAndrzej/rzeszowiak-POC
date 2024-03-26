import { AHttpClient } from '@/http/AxiosAbstract';
import { parseHTMLResponse } from '@/lib/helpers/HTMLhelpers';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryView from './components/CategoryView/CategoryView';
import useConstructRzeszowiakUrl from './hooks/useConstructRzeszowiakUrl';

type Props = {};

const Page = (props: Props) => {
    const {
        isCategoryPage,
        slug,
    } = useConstructRzeszowiakUrl();

    const { data } = useQuery({
        queryFn: () => AHttpClient.getPage(`https://www.rzeszowiak.pl/${slug}`),
        queryKey: [
            'rzeszowiak.page',
            slug,
        ],
    });

    const html = useMemo(() => parseHTMLResponse(data), [ data ]);

    return (
        <div>
            {slug}

            {isCategoryPage
                ? (
                    <CategoryView
                        body={html.body}
                        key={slug}
                    />
                )
                : (
                    'offer'
                )
            }
        </div>
    );
};

export default Page;
