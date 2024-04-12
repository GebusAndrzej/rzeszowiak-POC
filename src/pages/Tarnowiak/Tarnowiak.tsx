import { AHttpClient } from '@/http/AxiosAbstract';
import { QUERY_KEY } from './commom';
import { parseHTMLResponse } from '@/lib/helpers/HTMLhelpers';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import MenuWrapper from './components/Menu/MenuWrapper';
import { Route, Routes } from 'react-router-dom';
import styles from './Tarnowiak.module.css'

const Tarnowiak = () => {
    const { data } = useQuery({
        queryFn: () => AHttpClient.getPage('https://www.tarnowiak.pl/'),
        queryKey: [ QUERY_KEY.MAIN_PAGE ],
        refetchOnWindowFocus: false,
    });

    const html = useMemo(() => parseHTMLResponse(data), [ data ]);

    const menuElement = useMemo(
        () => html.querySelector<HTMLDivElement>('.column_box')?.outerHTML,
        [ html ],
    );

    return (
        <div className={styles.wrapper}>
            <MenuWrapper originalElement={menuElement} />

            <div className={styles.page}>
                <Routes>
                    <Route
                        element={"index"}
                        index
                    />

                    <Route
                        element={'list'}
                        path={`/ogloszenia/*`}
                    />

                    <Route
                        element={'single'}
                        path={`/ogloszenie/:announcementId/:announcementText`}
                    />

                    <Route
                        element={'szukaj'}
                        path={`/szukaj/`}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default Tarnowiak;
