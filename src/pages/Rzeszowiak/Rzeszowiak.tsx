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
import Page from './components/Page/Page';
import styles from './Rzeszowiak.module.css';
import MenuWrapper from './components/Menu/MenuWrapper';

const Rzeszowiak = () => {
    const {
        data,
        isLoading,
    } = useQuery({
        queryFn: () => AHttpClient.getPage(SITE_URL),
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
        <div className={styles.wrapper}>
            <MenuWrapper originalElement={menuElement} />

            <div className={styles.page}>
                {isLoading && (
                    'Loading...'
                )}

                <Routes>
                    <Route
                        element={'index'}
                        index
                    />

                    <Route
                        element={<Page />}
                        path=":slug"
                    />
                </Routes>
            </div>
        </div>
    );
};

export default Rzeszowiak;
