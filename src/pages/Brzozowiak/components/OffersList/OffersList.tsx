import { AHttpClient } from "@/http/AxiosAbstract";
import { APP_ROUTE } from "app/appConsts";
import {
    QUERY_KEY,
    SITE_URL,
} from "../../common";
import { parseHTMLResponse } from "@/lib/helpers/HTMLhelpers";
import {
    useCallback,
    useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "@/components/DataLoader/DataLoader";
import ListViewSkeleton from "@/components/Skeletons/ListViewSkeleton/ListViewSkeleton";
import Pagination from "@/components/Pagination/Pagination";
import ListOfferWrapper from "./components/ListOfferWrapper/ListOfferWrapper";
import styles from './OffersList.module.css';

type Props = {
    mainPageHtml?: Document;
};

const OffersList = ({ mainPageHtml }: Props) => {
    const location = useLocation();

    const page = useMemo(
        () => `${location.pathname.replace(`/${APP_ROUTE.BRZOZOWIAK}/`, '')}${location.search}`,
        [ location ],
    );

    const {
        data,
        ...queryData
    } = useQuery({
        enabled: !mainPageHtml,
        queryFn: () => AHttpClient.GetPagePost({ q: `${SITE_URL}/${page}` }),
        queryKey: [
            QUERY_KEY.PAGE,
            page,
        ],
        refetchOnWindowFocus: false,
    });

    const html = useMemo(
        () => mainPageHtml ? mainPageHtml : parseHTMLResponse(data),
        [
            data,
            mainPageHtml,
        ],
    );

    const contentWrappers = useMemo(
        () => html.querySelectorAll<HTMLDivElement>('.list')
        ,
        [ html ],
    );

    const announcementsList = useMemo(
        () => {
            const ret: Element[] = [];
            if (!contentWrappers.length) return ret;

            for (let i = 0; i < contentWrappers.length; i++) {
                const element = contentWrappers[i];
                const offers = element.querySelectorAll('.listRow');

                if (offers?.length) {
                    ret.push(...offers);
                }
            }

            return ret;
        },
        [ contentWrappers ],
    );

    const paginationData = useMemo(
        () => {
            const map: Record<string, string> = {};

            const wrapper = html?.querySelector('.paginator');
            const anchors = wrapper?.querySelectorAll<HTMLAnchorElement>('a') || [];
            const current = Number(wrapper?.querySelector('div')?.textContent);

            for (let i = 0; i < anchors?.length; i++) {
                const textContent = anchors[i].textContent;

                if (textContent === "<"
                || textContent === ">"
                || textContent === "<<"
                || textContent === ">>") continue;

                const pageNo = Number(anchors[i]?.textContent) || '';
                const href = anchors[i]?.getAttribute('href') || '';
                map[pageNo] = `/${APP_ROUTE.BRZOZOWIAK}/${href}`;
            }

            const keys = Object.keys(map);

            return {
                current,
                getLink: (pageNumber: string) => map[pageNumber],
                max: Math.max(+keys[keys.length - 1], current),
            };
        },
        [ html ],
    );

    const scrollTop = useCallback(
        () => window.scrollTo({
            behavior: 'smooth',
            top: 0,
        }),
        [],
    );

    return (
        <div>
            <DataLoader
                {...queryData}
                skeleton={<ListViewSkeleton />}
            >
                <div className={styles.offerList}>
                    {announcementsList.map((announcement, index) => (
                        <ListOfferWrapper 
                            key={index} 
                            offer={announcement}
                        />
                    ))}
                </div>

                {!!paginationData.current && (
                    <Pagination
                        currentPage={paginationData.current}
                        linkGenerator={paginationData.getLink}
                        onPageChange={scrollTop}
                        pages={paginationData.max}
                    />
                )}
            </DataLoader>
        </div>
    );
};

export default OffersList;
