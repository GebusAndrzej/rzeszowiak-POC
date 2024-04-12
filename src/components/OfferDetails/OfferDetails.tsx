import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './OfferDetails.module.css';

export type OfferData = {
    label: string;
    value?: string | null;
};

type Props = {
    images: string[];
    baseData?: OfferData[];
    description: ReactNode;
    additionalData?: ReactNode;
};

const OfferDetails = ({
    additionalData,
    baseData,
    description,
    images,
}: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.firstRow}>
                {!!images.length && (
                    <Carousel className={styles.carousel}>
                        <CarouselContent>
                            {images.map(url =>
                                <CarouselItem
                                    className={styles.carouselItem}
                                    key={url}
                                >
                                    <img
                                        key={url}
                                        src={url}
                                    />
                                </CarouselItem>,
                            )}
                        </CarouselContent>

                        <CarouselPrevious style={{ left: 15 }} />
                        <CarouselNext style={{ right: 15 }} />
                    </Carousel>
                )}

                <div className={styles.mainData}>
                    {baseData?.map(item => (
                        <div
                            className={styles.grid}
                            key={item.label}
                        >
                            <span>{item.label}</span>
                            <span>{item.value}</span>
                        </div>
                    ))}

                    <div
                        className={clsx(
                            'additional-info',
                            styles.additionalInfo,
                        )}
                    >
                        {additionalData}
                    </div>
                </div>
            </div>

            <div className={styles.description}>
                {description}
            </div>
        </div>
    );
};

export default OfferDetails;
