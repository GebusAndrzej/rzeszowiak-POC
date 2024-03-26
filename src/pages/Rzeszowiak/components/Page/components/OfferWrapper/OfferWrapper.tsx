import { useEffect, useMemo } from 'react';
import { processBody } from './helpers';
import { SITE_URL } from '@/pages/Rzeszowiak/common';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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

    console.log(content.baseData)
    console.log(content.rest.map(x => x.outerHTML))

    return (
        <div>
            <Carousel>
                <CarouselContent>
                    {content.photos.map(url => 
                    <CarouselItem key={url}>
                        <img src={`${SITE_URL}${url}`} key={url}/>
                    </CarouselItem>
                    )}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div
                dangerouslySetInnerHTML={{ __html: content?.description }}
            />
        </div>
    );
};

export default OfferWrapper;
