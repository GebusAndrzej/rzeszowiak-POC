import { AHttpClient } from '@/http/AxiosAbstract';
import {
    QUERY_KEY,
    SITE_URL,
} from './common';
import {
    Route,
    Routes,
} from 'react-router-dom';
import { parseHTMLResponse } from '@/lib/helpers/HTMLhelpers';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import MenuWrapper from './components/Menu/MenuWrapper';
import Page from './components/Page/Page';
import SiteWrapper from '@/components/SiteWrapper/SiteWrapper';
import DataLoader from '@/components/DataLoader/DataLoader';
import ListViewSkeleton from '@/components/Skeletons/ListViewSkeleton/ListViewSkeleton';

const Rzeszowiak = () => {
    const {
        data,
        ...queryData
    } = useQuery({
        queryFn: () => AHttpClient.GetPagePost({
            fromCharset: "ISO8859_2",
            q: SITE_URL,
        }),
        queryKey: [ QUERY_KEY.MAIN_PAGE ],
        refetchOnWindowFocus: false,
    });

    const html = useMemo(
        () => parseHTMLResponse(data),
        [ data ],
    );

    const menuElement = useMemo(
        () => html.querySelector<HTMLDivElement>('.menu-left-middle')?.outerHTML,
        [ html ],
    );

    return (
        <SiteWrapper menuElement={<MenuWrapper originalElement={menuElement} />}>
            <DataLoader 
                {...queryData}
                skeleton={<ListViewSkeleton />}
            >
                <Routes>
                    <Route
                        element={<Page mainPageHtml={html} />}
                        index
                    />

                    <Route
                        element={<Page />}
                        path=":slug"
                    />
                </Routes>
            </DataLoader>
        </SiteWrapper>
    );
};

export default Rzeszowiak;
