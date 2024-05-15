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
import DataLoader from '@/components/DataLoader/DataLoader';
import ListViewSkeleton from '@/components/Skeletons/ListViewSkeleton/ListViewSkeleton';
import MenuWrapper from './components/Menu/MenuWrapper';
import OfferWrapper from './components/OfferWrapper/OfferWrapper';
import OffersList from './components/OffersList/OffersList';
import SearchWrapper from './components/SearchWrapper/SearchWrapper';
import SiteWrapper from '@/components/SiteWrapper/SiteWrapper';

const Tarnowiak = () => {
    const {
        data,
        ...queryData
    } = useQuery({
        queryFn: () => AHttpClient.GetPagePost({ q: SITE_URL }),
        queryKey: [ QUERY_KEY.MAIN_PAGE ],
        refetchOnWindowFocus: false,
    });

    const html = useMemo(() => parseHTMLResponse(data), [ data ]);

    const menuElement = useMemo(
        () => html.querySelector<HTMLDivElement>('.column_box')?.outerHTML,
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
                        element={<OffersList mainPageHtml={html} />}
                        index
                    />

                    <Route
                        element={<OfferWrapper />}
                        path={`/ogloszenie/:announcementId/:announcementText`}
                    />

                    <Route
                        element={<OffersList />}
                        path={`/ostatnio-dodane/*`}
                    />

                    <Route
                        element={<OffersList />}
                        path={`/ogloszenia/*`}
                    />

                    <Route
                        element={<SearchWrapper />}
                        path={`/szukaj/`}
                    />
                </Routes>
            </DataLoader>
        </SiteWrapper>
    );
};

export default Tarnowiak;
