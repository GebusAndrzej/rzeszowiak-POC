import { AHttpClient } from "@/http/AxiosAbstract";
import {
    QUERY_KEY,
    SITE_URL,
} from "./common";
import {
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { parseHTMLResponse } from "@/lib/helpers/HTMLhelpers";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "@/components/DataLoader/DataLoader";
import ListViewSkeleton from "@/components/Skeletons/ListViewSkeleton/ListViewSkeleton";
import MenuWrapper from "./components/MenuWrapper/MenuWrapper";
import OffersList from "./components/OffersList/OffersList";
import SiteWrapper from "@/components/SiteWrapper/SiteWrapper";

const Brzozowiak = () => {
    const { search } = useLocation();

    const {
        data,
        ...queryData
    } = useQuery({
        queryFn: () => AHttpClient.GetPagePost({ q: SITE_URL }),
        queryKey: [ QUERY_KEY.MAIN_PAGE ],
        refetchOnWindowFocus: false,
    });

    const html = useMemo(() => parseHTMLResponse(data), [ data ]);

    const menuElement = useMemo(
        () => html.querySelector<HTMLDivElement>('.ulMenu')?.innerHTML,
        [ html ],
    );

    return (
        <SiteWrapper
            menuElement={<MenuWrapper originalElement={menuElement} />}
        >
            <DataLoader
                {...queryData}
                skeleton={<ListViewSkeleton />}
            >
                <Routes>
                    <Route
                        element={<OffersList mainPageHtml={search.length ? html : undefined} />}
                        index
                    />

                    <Route
                        element={<div>offer</div>}
                        path="ogloszenia/:slug"
                    />

                    <Route
                        element={<OffersList />}
                        path=":slug"
                    />
                </Routes>
            </DataLoader>
        </SiteWrapper>
    );
};

export default Brzozowiak;
