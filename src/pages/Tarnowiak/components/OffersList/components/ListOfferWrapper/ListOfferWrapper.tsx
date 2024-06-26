import { APP_ROUTE } from "app/appConsts";
import { SITE_URL } from "@/pages/Tarnowiak/common";
import { useMemo } from "react";
import ListOffer, { TListOffer } from '@/components/ListOffer/ListOffer';

type Props = {
    offer: Element;
};

const ListOfferWrapper = ({ offer }: Props) => {
    const photoData = useMemo(
        () => {
            const container = offer.querySelector<HTMLDivElement>('.box_content_photo');
            const img = container?.querySelector<HTMLAnchorElement>('img');
            const src = img?.getAttribute('src');

            return {
                src,
            };
        },
        [ offer ],
    );

    const descriptionData = useMemo(
        () => {
            const offerWrapper = offer.querySelector<HTMLDivElement>('.box_content_info');
            const divs = offerWrapper?.querySelectorAll<HTMLDivElement>('div');

            const descriptionBox = offer.querySelector<HTMLDivElement>('.box_content_desc');
            const data = descriptionBox?.querySelectorAll('strong');
            const anchor = descriptionBox?.querySelector('a');

            const price = data?.[0].textContent || '';
            const [ , ...titleArr ] = data?.[1].textContent?.split('.') || '';

            const link = anchor?.getAttribute('href');
            const description = anchor?.textContent || '';
            const date = divs?.[divs?.length - 2].textContent || '';

            return {
                date: date.replace('Dodane: ', ''),
                description,
                link,
                price,
                title: titleArr.join(),
            };
        },
        [ offer ],
    );

    const props: TListOffer = useMemo(
        () => ({
            description: descriptionData.description,
            imageUrl: `${SITE_URL}${photoData.src}`,
            localUrl: `/${APP_ROUTE.TARNOWIAK}/${descriptionData.link}`,
            meta: {
                date: descriptionData.date,
                originalUrl: `${SITE_URL}${descriptionData.link}`,
                phone: '',
                place: '',
                price: descriptionData.price,
            },
            title: descriptionData.title,
        }),
        [
            descriptionData,
            photoData.src,
        ],
    );

    return (
        <ListOffer {...props} />
    );
};

export default ListOfferWrapper;
