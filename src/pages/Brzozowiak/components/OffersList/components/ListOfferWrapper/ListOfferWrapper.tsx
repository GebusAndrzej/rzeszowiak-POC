import ListOffer, { TListOffer } from "@/components/ListOffer/ListOffer";
import { SITE_URL } from "@/pages/Brzozowiak/common";
import { APP_ROUTE } from "app/appConsts";
import { useMemo } from "react";

type Props = {
    offer: Element;
}

const ListOfferWrapper = ({
    offer,
}: Props) => {

    const offerData: TListOffer = useMemo(
        () => {
            const imageAnchor = offer.querySelector<HTMLAnchorElement>('.aImgT');
            const titleAnchor = offer.querySelector<HTMLAnchorElement>('h2')?.querySelector('a')

            const time = offer.querySelector('time')?.textContent;
            const address = offer.querySelector('address')?.textContent;
            const price = offer.querySelector('.price')?.querySelector('span')?.textContent;
            const desc = offer.querySelector('.short')?.textContent;
            const url = titleAnchor?.getAttribute('href');

            const imageSrc = imageAnchor?.style.backgroundImage
                .replace('url(\"', '')
                .replace('\")', '')
                .replace('mic', 'big')

            return {
                description: desc || '',
                imageUrl: `${imageSrc}`,
                localUrl: `/${APP_ROUTE.BRZOZOWIAK}/${url}`,
                meta: {
                    date: time || undefined,
                    originalUrl: `${SITE_URL}${url}`,
                    phone: '',
                    place: address || undefined,
                    price: price || '',
                },
                title: titleAnchor?.textContent || '',
            }
        },
        [offer]
    )

  return (
    <ListOffer {...offerData} />
  )
}

export default ListOfferWrapper