import { AHttpClient } from '@/http/AxiosAbstract'
import { parseHTMLResponse } from '@/lib/helpers/HTMLhelpers'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'

type Props = {}

const Tarnowiak = (props: Props) => {
  const [menuElement, setMenuElement] = useState<string>()

    const {data, isLoading} = useQuery({
        queryFn: () => AHttpClient.getPage('https://www.tarnowiak.pl/'),
        queryKey: ['tarnowiak'],
    })

  const html = useMemo(() => parseHTMLResponse(data), [data])

  useEffect(
    () => {
      const menuWrapper = html.querySelector<HTMLDivElement>(".column.leftb");
      const menuElement = menuWrapper?.querySelector<HTMLDivElement>('.column_box')

      console.log(menuElement)

      setMenuElement(menuElement?.outerHTML)
    },
    [html]
  )

  return (
    <div>
        Tarnowiak

        <div
            dangerouslySetInnerHTML={{__html: menuElement}}
        />
    </div>
  )
}

export default Tarnowiak