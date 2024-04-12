import './OfferWrapper.css';
import { SITE_URL } from '@/pages/Rzeszowiak/common';
import { processBody } from './helpers';
import {
    useEffect,
    useMemo,
} from 'react';
import OfferDetails from '@/components/OfferDetails/OfferDetails';
import styles from './OfferWrapper.module.css';

type Props = {
    body: HTMLElement;
};

const OfferWrapper = ({ body }: Props) => {
    useEffect(
        () => {
            window.scrollTo({ top: 0 });

            return;
        },
        [],
    );

    const content = useMemo(
        () => processBody(body),
        [ body ],
    );

    console.log('rest:', content.rest.map(x => x.outerHTML));

    const images = useMemo(
        () => content.photos.map(url => `${SITE_URL}${url}`),
        [ content.photos ],
    );

    return (
        <div className={styles.wrapper}>
            <OfferDetails
                additionalData={(
                    <>
                        {content.rest.map((data, index) => (
                            <div
                                dangerouslySetInnerHTML={{ __html: data.outerHTML }}
                                key={index}
                            />
                        ))}
                    </>
                )}
                baseData={content.baseData}
                description={(
                    <div dangerouslySetInnerHTML={{ __html: content.description }} />
                )}
                images={images}
            />
        </div>
    );
};

export default OfferWrapper;
