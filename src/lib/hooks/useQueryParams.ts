import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
    const [searchParams] = useSearchParams();

    const queryParamsArray = useMemo(
        () => {
            const params = [];

            for (const entry of searchParams.entries()) {
                params.push(`${entry[0]}=${entry[1]}`)
            }

            return params;
        },
        [searchParams]
    )

    const queryParamsUrl = useMemo(
        () =>  queryParamsArray.length
                ? `?${queryParamsArray.join('&')}`
                : '',
        [queryParamsArray]
    )
    
    return {
        queryParamsArray,
        queryParamsUrl,
    }
}

export default useQueryParams