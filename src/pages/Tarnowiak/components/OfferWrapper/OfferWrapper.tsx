import { AHttpClient } from "@/http/AxiosAbstract";
import { APP_ROUTE } from "app/appConsts";
import {
    QUERY_KEY,
    SITE_URL,
} from "../../commom";
import { parseHTMLResponse } from "@/lib/helpers/HTMLhelpers";
import { processBody } from "./helpers";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import OfferDetails from "@/components/OfferDetails/OfferDetails";
import DataLoader from "@/components/DataLoader/DataLoader";
import OfferDetailsSkeleton from "@/components/Skeletons/OfferDetailsSkeleton/OfferDetailsSkeleton";

const OfferWrapper = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0 });

        return;
    },[]);

    const url = useMemo(
        () => location.pathname.replace(`/${APP_ROUTE.TARNOWIAK}/`, ''),
        [ location.pathname ],
    );

    const { data, ...queryData } = useQuery({
        queryFn: () => AHttpClient.GetPagePost({ q: `${SITE_URL}${url}` }),
        queryKey: [
            QUERY_KEY.PAGE,
            url,
        ],
        refetchOnWindowFocus: false,
    });

    const html = useMemo(() => parseHTMLResponse(data), [ data ]);

    const content = useMemo(
        () => html.querySelector<HTMLDivElement>('.oview'),
        [ html ],
    );

    const contentData = useMemo(
        () => processBody(content),
        [ content ],
    );

    return (
        <DataLoader
            {...queryData}
            skeleton={<OfferDetailsSkeleton />}
        >
            <OfferDetails
                baseData={contentData.baseData}
                description={(
                    <div dangerouslySetInnerHTML={{ __html: contentData.description }} />
                )}
                images={contentData.images}
            />

            {/* <div
                dangerouslySetInnerHTML={{
                    __html: content?.outerHTML || '',
                }}
                /> */}
        </DataLoader>
    );
};

export default OfferWrapper;
