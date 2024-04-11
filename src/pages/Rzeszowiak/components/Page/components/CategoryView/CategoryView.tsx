import { useCallback, useMemo } from 'react';
import ListOfferWrapper from './components/ListOffer/ListOfferWrapper';
import styles from './CategoryView.module.css';
import Pagination from '@/components/Pagination/Pagination';
import useRzeszowiakCategoryPageController from './hooks/useRzeszowiakCategoryPageController';
import { constructCategoryUrl } from '@/pages/Rzeszowiak/helpers/rzeszowiakHelpers';
import { APP_ROUTE } from 'app/appConsts';
import ListFilters from './components/ListFilters/ListFilters';

type Props = {
    body: HTMLElement;
};

const CategoryView = ({ body }: Props) => {
    const {queryParamsUrl,slugUrlParams,slugWithCategory} = useRzeszowiakCategoryPageController();

    const content = useMemo(
        () => body.querySelector<HTMLDivElement>('#content-center'),
        [ body ],
    );

    const contentHeader = useMemo(
        () => content?.querySelector<HTMLDivElement>('.box-header')?.textContent,
        [ content ],
    );

    const announcementsList = useMemo(
        () => {
            const ret: Element[] = [];
            const promoOffersNodeList = content?.querySelectorAll('.promobox');
            const normalOffersNodeList = content?.querySelectorAll('.normalbox');

            if (promoOffersNodeList?.length) {
                ret.push(...promoOffersNodeList);
            }

            if (normalOffersNodeList?.length ) {
                ret.push(...normalOffersNodeList);
            }

            return ret;
        },
        [ content ],
    );

    const pageInfo = useMemo(
        () => {
            const textValue = content?.querySelector('#oDnns')?.textContent;
            const s = textValue?.replace('Strona', '')
                .split("z");

            return {
                current: +(s?.[0] || 0),
                max: +(s?.[1] || 0),
            }
        },
        [content]
    )

    const generatePaginationUrl = useCallback(
        (pageNumber: string) => {
            const page = `${pageNumber}`.padStart(3, '0')
            
            const categoryUrl = constructCategoryUrl(
                slugWithCategory,
                {
                   page,
                   size: slugUrlParams.size,
                   sort: slugUrlParams.sort,
                   time: slugUrlParams.time
                }
            );
            
            return `/${APP_ROUTE.RZESZOWIAK}/${categoryUrl}${queryParamsUrl}`
        },
        [queryParamsUrl,slugUrlParams,slugWithCategory]
    )

    const scrollTop = useCallback(
        () => window.scrollTo({
            top: 0,
            behavior: 'smooth',
        }),
        []
    )

    return content && (
        <>
            <ListFilters 
                pageInfo={pageInfo}
                paginationLinkGenerator={generatePaginationUrl}
            />

            <div className={styles.wrapper}>
                <div>
                    {contentHeader}
                </div>

                <div className={styles.offerList}>
                    {announcementsList.map((announcement, index) => (
                        <ListOfferWrapper
                            key={index}
                            offer={announcement}
                        />
                    ))}
                </div>

                <Pagination
                    currentPage={pageInfo.current} 
                    pages={pageInfo.max}
                    onPageChange={scrollTop}
                    linkGenerator={generatePaginationUrl}
                />
            </div>
        </>
    );
};

export default CategoryView;
