import { AHttpClient } from '@/http/AxiosAbstract';
import {
    Route,
    Routes,
} from 'react-router-dom';
import { parseHTMLResponse } from '@/lib/helpers/HTMLhelpers';
import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import Menu from './components/Menu/Menu';
import Page from './components/Page/Page';
import styles from './Rzeszowiak.module.css';

const Rzeszowiak = () => {
    const bodyRef = useRef<HTMLElement>();
    const [ menuElement, setMenuElement ] = useState<string>();

    const {
        data,
        isLoading,
    } = useQuery({
        queryFn: () => AHttpClient.getPage('https://www.rzeszowiak.pl/'),
        queryKey: [ 'rzeszowiak' ],
    });

    const html = useMemo(() => parseHTMLResponse(data), [ data ]);

    useEffect(
        () => {
            const body = html.body;
            const menu = html.querySelector<HTMLDivElement>('.menu-left-middle');

            // setBodyElement(body.outerHTML)
            setMenuElement(menu?.outerHTML);
            bodyRef.current = body;
        },
        [ html ],
    );

    return (
        <div className={styles.wrapper}>
            <Menu originalElement={menuElement} />

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
