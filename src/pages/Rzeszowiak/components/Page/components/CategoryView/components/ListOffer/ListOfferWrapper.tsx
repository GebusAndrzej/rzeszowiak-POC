import { APP_ROUTE } from 'app/appConsts';
import { SITE_URL } from '@/pages/Rzeszowiak/common';
import { useMemo } from 'react';
import ListOffer, { TListOffer } from '@/components/ui/ListOffer/ListOffer';

type Props = {
    offer: Element;
};

const fileExtensionRegex = /\.([0-9a-z]+)(?:[?#]|$)/i;

const ListOfferWrapper = ({ offer }: Props) => {

    const anchorData = useMemo(
        () => {
            const anchorElement = offer.querySelector('a') as HTMLAnchorElement;

            const href = anchorElement.getAttribute('href') || '';
            const [ , ...titleArr ] = anchorElement.textContent?.split('.') as string[];
            const numbersInLink = href.match(/\d+/g);
            const offerId = numbersInLink?.[numbersInLink?.length - 1];
            const pre = offerId?.substr(0, 3);

            return {
                href,
                offerId,
                pre,
                title: titleArr.join(),
            };
        },
        [ offer ],
    );

    const imageExtension = useMemo(
        () => {
            const imageElement = offer.querySelector('img');
            const imageSrc = imageElement?.getAttribute('src');
            const extension = imageSrc?.match(fileExtensionRegex)?.[1];

            return extension;
        },
        [ offer ],
    );

    const priceData = useMemo(
        () => {
            const priceBox = offer.querySelector('strong');

            return priceBox?.textContent || 'brak';
        },
        [ offer ],
    );

    const descriptionData = useMemo(
        () => {
            const promoDescBox = offer.querySelector('.promobox-body-right');
            const normalDescBox = offer.querySelector('.normalbox-body-right');

            return promoDescBox?.textContent || normalDescBox?.textContent || '';
        },
        [ offer ],
    );

    const dateData = useMemo(
        () => {
            const dateBox = offer.querySelector('.dodane');
            const text = dateBox?.querySelector('b');

            return text?.textContent || '';
        },
        [ offer ],
    );

    const props: TListOffer = useMemo(
        () => ({
            description: descriptionData,
            imageUrl: `${SITE_URL}/img/ogl/${anchorData.pre}/${anchorData.offerId}_0.${imageExtension}`,
            localUrl: `/${APP_ROUTE.RZESZOWIAK}${anchorData.href}`,
            meta: {
                date: dateData,
                originalUrl: `${SITE_URL}${anchorData.href}`,
                phone: '',
                place: '',
                // price: priceData,
                price: Intl.NumberFormat('pl-PL', { currency: 'PLN', maximumFractionDigits: 0, style: 'currency' }).format(parseInt(priceData)),
            },
            title: anchorData.title || '',
        }),
        [
            anchorData.href,
            anchorData.offerId,
            anchorData.pre,
            anchorData.title,
            dateData,
            descriptionData,
            imageExtension,
            priceData,
        ],
    );

    return (
        <ListOffer {...props} />
    );
};

export default ListOfferWrapper;
