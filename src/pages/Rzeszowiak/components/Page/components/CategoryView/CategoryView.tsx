import React, { useMemo } from 'react'
import ListOfferWrapper from './components/ListOffer/ListOfferWrpper';
import styles from './CategoryView.module.css'

type Props = {
    body: HTMLElement;
}

const CategoryView = ({body}: Props) => {

    const content = useMemo(
        () => body.querySelector<HTMLDivElement>("#content-center"),
        [body]
    )

    const contentHeader = useMemo(
        () => content?.querySelector<HTMLDivElement>(".box-header"),
        [content]
    )

    const announcements = useMemo(
        () => {
            const ret: Element[] = [];
            const promoOffersNodeList = content?.querySelectorAll(".promobox")
            const normalOffersNodeList = content?.querySelectorAll(".normalbox")

            if (promoOffersNodeList?.length) {
                ret.push(...promoOffersNodeList)
            }

            if (normalOffersNodeList?.length ) {
                ret.push(...normalOffersNodeList)
            }

            return ret;
        },
        [content]
    )

    console.log(content)
    console.log(announcements)
    

  return content && (
    <div>
        <div
            dangerouslySetInnerHTML={{__html: contentHeader?.outerHTML}}
        />

        <div className={styles.offerList}>
            {announcements.map((announcement, index) => (
                <ListOfferWrapper offer={announcement} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default CategoryView