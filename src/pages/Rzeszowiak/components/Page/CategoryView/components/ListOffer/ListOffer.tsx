import { useMemo } from "react";

type Props = {
    offer: Element;
}

const ListOffer = ({offer}: Props) => {

    const offerData = useMemo(
        () => {
            const anchorElement = offer.querySelector('a') as HTMLAnchorElement

            const href = anchorElement.getAttribute('href') || '';
            const title = anchorElement.textContent
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

    console.log(offerData)
    
  return (
    <div>
        {offerData.title}
        {offerData.href}
        <img src={`https://www.rzeszowiak.pl/img/ogl/${offerData.pre}/${offerData.offerId}_0.jpg`} />

        {/* <div
            dangerouslySetInnerHTML={{__html: offer?.outerHTML}}
        /> */}
    </div>
  )
}

export default ListOffer