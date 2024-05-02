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

const Rzeszowiak = () => {
    const {
        data,
        isLoading,
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
            {isLoading && (
                'Loading...'
            )}

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
        </SiteWrapper>
    );
};

export default Rzeszowiak;
