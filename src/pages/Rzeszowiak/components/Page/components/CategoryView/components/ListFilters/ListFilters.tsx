import { APP_ROUTE } from 'app/appConsts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    NavLink,
    useSearchParams,
} from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { constructCategoryUrl } from '@/pages/Rzeszowiak/helpers/rzeszowiakHelpers';
import {
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import Pagination from '@/components/Pagination/Pagination';
import styles from './ListFilters.module.css';
import useQueryParams from '@/lib/hooks/useQueryParams';
import useRzeszowiakCategoryPageController from '../../hooks/useRzeszowiakCategoryPageController';
import { SiteContext } from '@/components/SiteWrapper/SiteWrapper';
import clsx from 'clsx';

type Props = {
    paginationLinkGenerator: ((number: string) => string) | undefined;
    pageInfo: {
        current: number;
        max: number;
    };
};

const ListFilters = ({
    pageInfo,
    paginationLinkGenerator,
}: Props) => {
    const {
        slugUrlParams,
        slugWithCategory,
    } = useRzeszowiakCategoryPageController();
    const [ params ] = useSearchParams();
    const { queryParamsObject } = useQueryParams();
    const {menuCollapsed} = useContext(SiteContext)

    const defaultValues = useMemo(
        () => ({
            max: params.get('max') || undefined,
            min: params.get('min') || undefined,
            size: slugUrlParams.size,
            sort: slugUrlParams.sort,
            time: slugUrlParams.time,
            z: params.get('z') || undefined,
        }),
        [
            params,
            slugUrlParams,
        ],
    );

    const [ searchState, setSearchState ] = useState(defaultValues);

    const handleSetFilter = useCallback(
        (key: string, value: string) => {
            setSearchState(prev => ({
                ...prev,
                [key]: value,
            }));
        },
        [],
    );

    const preparedSearchUrl = useMemo(
        () => {
            const {
                size,
                sort,
                time,
                ...rest
            } = searchState;

            const createdUrl = constructCategoryUrl(
                slugWithCategory,
                {
                    page: '001',
                    size,
                    sort,
                    time,
                },
            );

            const paramsArray = Object
                .entries({
                    ...queryParamsObject,
                    ...rest,
                })
                .filter(param => param[1])
                .map(param => `${param[0]}=${param[1]}`);

            const queryParams = paramsArray.length
                ? `?${paramsArray.join('&')}`
                : '';

            return `/${APP_ROUTE.RZESZOWIAK}/${createdUrl}${queryParams}`;
        },
        [
            searchState,
            slugWithCategory,
            queryParamsObject,
        ],
    );

    return (
        <nav className={clsx(
            styles.filtersBar,
            menuCollapsed && styles.menuCollapsed
        )}>
            <div className={styles.row}>
                <Input
                    className="max-w-72"
                    onChange={event => handleSetFilter('z', event.target.value)}
                    placeholder="Szukany tekst"
                    value={searchState.z}
                />

                <Input
                    className="max-w-32"
                    onChange={event => handleSetFilter('min', event.target.value)}
                    placeholder="Cena od"
                    value={searchState.min}
                />

                <Input
                    className="max-w-32"
                    onChange={event => handleSetFilter('max', event.target.value)}
                    placeholder="Cena do"
                    value={searchState.max}
                />

                <Select
                    onValueChange={event => handleSetFilter('sort', event)}
                    value={searchState.sort}
                >
                    <SelectTrigger className="max-w-40">
                        <SelectValue placeholder="Wybierz sortowanie" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">Data malejąco</SelectItem>
                            <SelectItem value="2">Data rosnąco</SelectItem>
                        </SelectGroup>

                        <SelectGroup>
                            <SelectItem value="3">Cena malejąco</SelectItem>
                            <SelectItem value="4">Cena rosnąco</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={event => handleSetFilter('time', event)}
                    value={searchState.time}
                >
                    <SelectTrigger className="max-w-32">
                        <SelectValue placeholder="Z ostatnich" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">24 Godzin</SelectItem>
                            <SelectItem value="2">3 Dni</SelectItem>
                            <SelectItem value="3">7 Dni</SelectItem>
                            <SelectItem value="4">14 Dni</SelectItem>
                            <SelectItem value="5">30 Dni</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={event => handleSetFilter('size', event)}
                    value={searchState.size}
                >
                    <SelectTrigger className="max-w-32">
                        <SelectValue placeholder="Ilośc na stronie" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <NavLink to={preparedSearchUrl}>
                    <Button>
                    Szukaj
                    </Button>
                </NavLink>

                <Pagination
                    className="ml-auto"
                    currentPage={pageInfo.current}
                    linkGenerator={paginationLinkGenerator}
                    pages={pageInfo.max}
                />
            </div>
        </nav>
    );
};

export default ListFilters;
