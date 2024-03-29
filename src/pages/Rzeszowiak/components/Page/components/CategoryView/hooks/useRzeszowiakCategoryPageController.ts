import useQueryParams from "@/lib/hooks/useQueryParams"
import { useMemo } from "react";
import { useParams } from "react-router-dom"

const numberRegex = /\d+/g;

const useRzeszowiakCategoryPageController = () => {
    const {slug} = useParams() as {slug: string}
    const {queryParamsUrl} = useQueryParams()

    const slugUrlParams = useMemo(
        () => {
            const numbersMatched = slug?.match(numberRegex) || []
            const numbers = numbersMatched[numbersMatched.length - 1]

            return {
                categoryNumber: numbers.substring(0,3),
                page: numbers.substring(3,6),
                sort: numbers.substring(6,7),
                size: numbers.substring(7,9),
                time: numbers.substring(9, 10),
            }
        }, [slug]
    )

    const slugWithCategory = useMemo(
        () => {
            const str = slug?.substring(0, slug.length - 7)
            return str;
        },
        [slug]
    )

    return {
        slugUrlParams,
        slugWithCategory,
        queryParamsUrl,
    }
}

export default useRzeszowiakCategoryPageController