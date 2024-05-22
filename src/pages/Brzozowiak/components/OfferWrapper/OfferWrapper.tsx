import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { APP_ROUTE } from "app/appConsts";
import { QUERY_KEY, SITE_URL } from "../../common";
import { useQuery } from "@tanstack/react-query";
import { AHttpClient } from "@/http/AxiosAbstract";
import { parseHTMLResponse } from "@/lib/helpers/HTMLhelpers";
import { processBody } from "./utils/helpers";
import DataLoader from "@/components/DataLoader/DataLoader";
import OfferDetailsSkeleton from "@/components/Skeletons/OfferDetailsSkeleton/OfferDetailsSkeleton";
import OfferDetails from "@/components/OfferDetails/OfferDetails";

const OfferWrapper = () => {
  const location = useLocation();

  useEffect(() => {
      window.scrollTo({ top: 0 });

      return;
  },[]);

  const url = useMemo(
      () => location.pathname.replace(`/${APP_ROUTE.BRZOZOWIAK}/`, ''),
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
      () => html.querySelector<HTMLDivElement>('.stdBxC'),
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
            additionalData={(
              <div dangerouslySetInnerHTML={{ __html: contentData.additionalInfo }} />
            )}
            images={contentData.images}
        />
    </DataLoader>
  )
}

export default OfferWrapper