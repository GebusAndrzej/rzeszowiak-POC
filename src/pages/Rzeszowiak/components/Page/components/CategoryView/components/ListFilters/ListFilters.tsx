import styles from './ListFilters.module.css'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/Pagination/Pagination';
import useRzeszowiakCategoryPageController from '../../hooks/useRzeszowiakCategoryPageController';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { constructCategoryUrl } from '@/pages/Rzeszowiak/helpers/rzeszowiakHelpers';
import { APP_ROUTE } from 'app/appConsts';
import useQueryParams from '@/lib/hooks/useQueryParams';

type Props = {
    paginationLinkGenerator: ((number: string) => string) | undefined;
    pageInfo: {
        current: number;
        max: number;
    }
}

const ListFilters = ({
    pageInfo,
    paginationLinkGenerator
}: Props) => {
    const {slugUrlParams,slugWithCategory} = useRzeszowiakCategoryPageController();
    const [params] = useSearchParams()
    const {queryParamsObject} = useQueryParams()
    
    const defaultValues = useMemo(
        () => ({
            z: params.get('z') || undefined,
            min: params.get('min') || undefined,
            max: params.get('max') || undefined,
            size: slugUrlParams.size,
            sort: slugUrlParams.sort,
            time: slugUrlParams.time,
        }),
        [params, slugUrlParams]
    )
    
    const [searchState, setSearchState] = useState(defaultValues)

    const handleSetFilter = useCallback(
        (key: string, value: string) => {
            setSearchState(prev => ({
                ...prev,
                [key]: value,
            }))
        },
        []
    )

    const preparedSearchUrl = useMemo(
        () => {
            const {size, sort, time, ...rest} = searchState;

            const createdUrl = constructCategoryUrl(
                slugWithCategory,
                {
                   page: '001',
                   size,
                   sort,
                   time,
                }
            );

            const paramsArray = Object
                .entries({
                    ...queryParamsObject,
                    ...rest
                })
                .filter(param => param[1])
                .map(param => `${param[0]}=${param[1]}`)

            const queryParams = paramsArray.length
                ? `?${paramsArray.join('&')}`
                : ''

            return `/${APP_ROUTE.RZESZOWIAK}/${createdUrl}${queryParams}`
        },
        [searchState, constructCategoryUrl, queryParamsObject]
    )

  return (
    <nav className={styles.filtersBar}>
        <div className={styles.row}>
            <Input
                onChange={event => handleSetFilter('z', event.target.value)}
                placeholder='Szukany tekst' 
                className='max-w-72'
                value={searchState.z}
            />
            <Input 
                onChange={event => handleSetFilter('min', event.target.value)}
                placeholder='Cena od' 
                className='max-w-32'
                value={searchState.min}
            />
            <Input 
                onChange={event => handleSetFilter('max', event.target.value)}
                placeholder='Cena do' 
                className='max-w-32'
                value={searchState.max}
            />

            <Select 
                value={searchState.sort}
                onValueChange={event => handleSetFilter('sort', event)}
            >
                <SelectTrigger className='max-w-40'>
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
                value={searchState.time}
                onValueChange={event => handleSetFilter('time', event)}
            >
                <SelectTrigger className='max-w-32'>
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
                value={searchState.size}
                onValueChange={event => handleSetFilter('size', event)}
            >
                <SelectTrigger className='max-w-32'>
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
                currentPage={pageInfo.current} 
                pages={pageInfo.max}
                linkGenerator={paginationLinkGenerator}
                className='ml-auto'
            />
        </div>
    </nav>
  )
}

export default ListFilters