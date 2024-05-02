import { AHttpClient } from "@/http/AxiosAbstract";
import { APP_ROUTE } from "app/appConsts";
import {
    QUERY_KEY,
    SITE_URL,
} from "../../commom";
import { parseHTMLResponse } from "@/lib/helpers/HTMLhelpers";
import { processBody } from "./helpers";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import OfferDetails from "@/components/OfferDetails/OfferDetails";

const OfferWrapper = () => {
    const location = useLocation();

    const url = useMemo(
        () => location.pathname.replace(`/${APP_ROUTE.TARNOWIAK}/`, ''),
        [ location.pathname ],
    );

    const { data } = useQuery({
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
        <div>
            <OfferDetails
                baseData={contentData.baseData}
                images={contentData.images} 
                description={(
                    <div dangerouslySetInnerHTML={{ __html: contentData.description }} />
                )}
            />
            {/* <div
                dangerouslySetInnerHTML={{
                    __html: content?.outerHTML || '',
                }}
                /> */}
        </div>
    );
};

export default OfferWrapper;
