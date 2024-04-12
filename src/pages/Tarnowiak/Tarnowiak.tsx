import { AHttpClient } from '@/http/AxiosAbstract';
import { QUERY_KEY } from './commom';
import { parseHTMLResponse } from '@/lib/helpers/HTMLhelpers';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import MenuWrapper from './components/Menu/Menu';

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
        <MenuWrapper originalElement={menuElement} />
    );
};

export default Tarnowiak;
