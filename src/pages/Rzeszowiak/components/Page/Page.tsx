import { AHttpClient } from "@/http/AxiosAbstract"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { parseHTMLResponse } from "@/lib/helpers/HTMLhelpers"
import useConstructRzeszowiakUrl from "./hooks/useConstructRzeszowiakUrl"
import CategoryView from "./CategoryView/CategoryView"

type Props = {}

const Page = (props: Props) => {
    const {slug,constructURL, isCategoryPage} = useConstructRzeszowiakUrl()

    const {data} = useQuery({
        queryFn: () => AHttpClient.getPage(constructURL),
        queryKey: ['rzeszowiak.page', slug]
    })

    const html = useMemo(() => parseHTMLResponse(data), [data])

    return (
        <div>
            {slug}
            
            {isCategoryPage
                ? (
                    <CategoryView body={html.body} key={slug}/>
                )
                : (
                    "offer"
                )
            }
        </div>
    )
}

export default Page