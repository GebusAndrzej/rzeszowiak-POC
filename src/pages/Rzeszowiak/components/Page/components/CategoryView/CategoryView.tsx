import { useMemo } from 'react';
import ListOfferWrapper from './components/ListOffer/ListOfferWrapper';
import styles from './CategoryView.module.css';

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
        </div>
    );
};

export default CategoryView;
