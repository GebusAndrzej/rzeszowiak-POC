import styles from './ListFilters.module.css'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/Pagination/Pagination';
import useRzeszowiakCategoryPageController from '../../hooks/useRzeszowiakCategoryPageController';

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
    const {slugUrlParams} = useRzeszowiakCategoryPageController();

  return (
    <nav className={styles.filtersBar}>
        <div className={styles.row}>
            <Input placeholder='Szukany tekst' className='max-w-72'/>
            <Input placeholder='Cena od' className='max-w-32'/>
            <Input placeholder='Cena do' className='max-w-32'/>

            <Select value={slugUrlParams.sort}>
                <SelectTrigger className='max-w-40'>
                    <SelectValue placeholder="Wybierz sortowanie" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="1">Data Rosnąco</SelectItem>
                    <SelectItem value="2">Data Majeląco</SelectItem>
                    <SelectItem value="3">Cena rosnąco</SelectItem>
                    <SelectItem value="4">Cena malejąco</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select value={slugUrlParams.time}>
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

            <Select value={slugUrlParams.size}>
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