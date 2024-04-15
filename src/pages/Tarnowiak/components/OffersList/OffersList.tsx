import { useLocation } from "react-router-dom";
import { QUERY_KEY, SITE_URL } from "../../commom";
import { useCallback, useMemo } from "react";
import { APP_ROUTE } from "app/appConsts";
import { useQuery } from "@tanstack/react-query";
import { AHttpClient } from "@/http/AxiosAbstract";
import { parseHTMLResponse } from "@/lib/helpers/HTMLhelpers";
import styles from './OffersList.module.css'
import ListOfferWrapper from "./components/ListOfferWrapper/ListOfferWrapper";
import Pagination from "@/components/Pagination/Pagination";

const OffersList = () => {
    const location = useLocation()

    const page = useMemo(
        () => location.pathname.replace(`/${APP_ROUTE.TARNOWIAK}/`, ''),
        [location.pathname]
    )

    const { data, isLoading } = useQuery({
        queryFn: () => AHttpClient.getPage(`${SITE_URL}/${page}`),
        queryKey: [
            QUERY_KEY.PAGE,
            page
        ],
        refetchOnWindowFocus: false,
    });

    const html = useMemo(() => parseHTMLResponse(data), [data]);

    const contentWrapper = useMemo(
        () => html.querySelector<HTMLDivElement>('#content'),
        [html]
    )

    const announcementsList = useMemo(
        () => {
            const ret: Element[] = [];
  
            if (!contentWrapper) return ret;
            
            const promoOffers = contentWrapper.querySelectorAll('.box_content_featured')
            const normalOffers = contentWrapper.querySelectorAll('.box_content_plain')

            if (promoOffers?.length) {
                ret.push(...promoOffers);
            }

            if (normalOffers?.length ) {
                ret.push(...normalOffers);
            }

            return ret;
        },
        [contentWrapper]
    )

    const paginationData = useMemo(
        () => {
            let length = 0;
            const map: Record<string,string> = {}

            const wrapper = contentWrapper?.querySelector('#paging')
            const anchors = wrapper?.querySelectorAll<HTMLAnchorElement>('a') || []
            
            const current = Number(wrapper?.querySelector('.current')?.textContent)

            for (let i = 0; i< anchors?.length; i++) {
                if (anchors[i].nextSibling?.nodeType === 3 && anchors[i].previousSibling?.nodeType === 3) {
                    continue;
                }

                if (!anchors[i]) {
                    continue;
                }

                const pageNo = Number(anchors[i]?.textContent) || ''
                const href = anchors[i]?.getAttribute('href') || ''
                map[pageNo] = `/${APP_ROUTE.TARNOWIAK}/${href}`;
                length++;
            }

            return {
                current: current,
                max: length,
                getLink: (page: string) => map[page]
            }
        },
        [contentWrapper]
    )

    const scrollTop = useCallback(
        () => window.scrollTo({
            behavior: 'smooth',
            top: 0,
        }),
        [],
    );

    return (
        <div>
            {isLoading && (
                <span>Loading...</span>
            )}

            <div className={styles.wrapper}>

                <div className={styles.offerList}>
                    {announcementsList.map((announcement, index) => (
                        <ListOfferWrapper
                            key={index}
                            offer={announcement}
                        />
                    ))}
                </div>
            </div>

            {paginationData.current && (
                <Pagination
                    currentPage={paginationData.current}
                    linkGenerator={paginationData.getLink}
                    onPageChange={scrollTop}
                    pages={paginationData.max}
                />
            )}
        </div>
    )
}

export default OffersList