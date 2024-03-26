import { useMemo } from 'react';
import ListOfferWrapper from './components/ListOffer/ListOfferWrapper';
import styles from './CategoryView.module.css';
import Pagination from '@/components/Pagination/Pagination';

type Props = {
    body: HTMLElement;
};

const CategoryView = ({ body }: Props) => {

    const content = useMemo(
        () => body.querySelector<HTMLDivElement>('#content-center'),
        [ body ],
    );

    const contentHeader = useMemo(
        () => content?.querySelector<HTMLDivElement>('.box-header'),
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

    return content && (
        <div>
            <div
                dangerouslySetInnerHTML={{ __html: contentHeader?.outerHTML }}
            />

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
                onPageChange={console.log}
                linkGenerator={(number) => `#hello${number}-x`}
            />
        </div>
    );
};

export default CategoryView;
