import React, { useMemo } from 'react'
import ListOffer from './components/ListOffer/ListOffer';

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
            const nl = content?.querySelectorAll(".normalbox")

            if (nl?.length) {
                return [...nl]
            }

            return []
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

        {announcements.map((announcement, index) => (
            <ListOffer offer={announcement} key={index}/>
        ))}
    </div>
  )
}

export default CategoryView