import { useEffect, useMemo } from 'react';
import { processBody } from './helpers';
import { SITE_URL } from '@/pages/Rzeszowiak/common';
import OfferDetails from '@/components/OfferDetails/OfferDetails';
import styles from './OfferWrapper.module.css'
import './OfferWrapper.css'

type Props = {
    body: HTMLElement;
};

const OfferWrapper = ({ body }: Props) => {
    useEffect(
        () => {
            window.scrollTo({top: 0})
            return;
        },
        []
    )

    const content = useMemo(
        () => processBody(body),
        [ body ],
    );

    console.log('rest:',content.rest.map(x => x.outerHTML))

    const images = useMemo(
        () => content.photos.map(url => `${SITE_URL}${url}`),
        [content.photos]
    )

    return (
        <div className={styles.wrapper}>
            <OfferDetails
                images={images}
                baseData={content.baseData}
                description={(
                    <div dangerouslySetInnerHTML={{ __html: content.description }}/>
                )}
                additionalData={(
                    <>
                        {content.rest.map(data => (
                            <div dangerouslySetInnerHTML={{ __html: data.outerHTML }}/>
                        ))}
                    </>
                )}
            />
        </div>
    );
};

export default OfferWrapper;
