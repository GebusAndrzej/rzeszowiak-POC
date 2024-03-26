import { useMemo } from 'react';

type Props = {
    body: HTMLElement;
};

const OfferWrapper = ({ body }: Props) => {

    const content = useMemo(
        () => body.querySelector<HTMLDivElement>('#content-center'),
        [ body ],
    );

    const contentss = useMemo(
        () => {
            const contents = [ ...content?.querySelectorAll('.ogloszeniebox-content') || [] ];

            const baseData = contents.splice(0, 5);
            const textContent = contents.splice(0, 1);
            const otherAnnouncements: Element[] = [];
            let photoElement: Element = undefined;

            contents.forEach((element, index) => {
                const other_ad = element.querySelector('.content_other');
                const photos = element.querySelector('#photos');

                if (other_ad) {
                    otherAnnouncements.push(other_ad);
                    delete contents[index];
                    // continue;
                }

                if (photos) {
                    photoElement = photos;
                    delete contents[index];
                }
            });

            console.log({
                baseData,
                otherAnnouncements,
                photoElement,
                textContent,
            });

            console.log(contents.map(x => x.outerHTML));

        },
        [ content ],
    );

    return (
        <div>
            <div
                dangerouslySetInnerHTML={{ __html: content?.outerHTML }}
            />
        </div>
    );
};

export default OfferWrapper;
