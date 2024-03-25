import { useMemo } from "react";
import ListOffer, { TListOffer } from "@/components/ui/ListOffer/ListOffer";
import { APP_ROUTE } from "app/appConsts";

type Props = {
    offer: Element;
}

const ListOfferWrapper = ({offer}: Props) => {

    const anchorData = useMemo(
        () => {
            const anchorElement = offer.querySelector('a') as HTMLAnchorElement

            const href = anchorElement.getAttribute('href') || '';
            const title = anchorElement.textContent?.split('.')[1].substring(1)
            const numbersInLink = href.match(/\d+/g);
            const offerId = numbersInLink?.[numbersInLink?.length -1];
            const pre = offerId?.substr(0,3)

            return {
                title,
                href,
                offerId,
                pre,
            }
        },
        [offer]
    )

    const priceData = useMemo(
        () => {
            const priceBox = offer.querySelector('strong');

            return priceBox?.textContent || 'brak'
        },
        [offer]
    )

    const descriptionData = useMemo(
        () => {
            const promoDescBox = offer.querySelector('.promobox-body-right');
            const normalDescBox = offer.querySelector('.normalbox-body-right');

            return promoDescBox?.textContent || normalDescBox?.textContent || ''
        },
        [offer]
    )

    const dateData = useMemo(
        () => {
            const dateBox = offer.querySelector('.dodane');
            const text = dateBox?.querySelector('b');

        return text?.textContent || '';
        },
        [offer]
    )

    const props: TListOffer = useMemo(
        () => ({
            imageUrl: `https://www.rzeszowiak.pl/img/ogl/${anchorData.pre}/${anchorData.offerId}_0.jpg`,
            title: anchorData.title || '',
            description: descriptionData,
            localUrl: `/${APP_ROUTE.RZESZOWIAK}${anchorData.href}`,
            meta: {
                price: priceData,
                place: "",
                date: dateData,
                phone: "",
                originalUrl: `https://www.rzeszowiak.pl${anchorData.href}`,
            }
        }),
        [anchorData, priceData]
    )
    
  return (
    <ListOffer {...props} />
  )
}

export default ListOfferWrapper