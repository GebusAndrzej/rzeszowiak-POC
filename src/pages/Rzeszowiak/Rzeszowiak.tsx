import styles from './Rzeszowiak.module.css'
import { AHttpClient } from '@/http/AxiosAbstract'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import Menu from './components/Menu/Menu'
import { Route, Routes } from 'react-router-dom'
import Page from './components/Page/Page'
import { domSanitize, parseHTMLResponse } from '@/lib/helpers/HTMLhelpers'

type Props = {}

const Rzeszowiak = ({}: Props) => {
  const bodyRef = useRef<HTMLElement>()
  const [menuElement, setMenuElement] = useState<string>()

  const {data, isLoading} = useQuery({
    queryFn: () => AHttpClient.getPage('https://www.rzeszowiak.pl/'),
    queryKey: ['rzeszowiak'],
  })

  const html = useMemo(() => parseHTMLResponse(data), [data])

  useEffect(
    () => {
      const body = html.body;
      const menu = html.querySelector<HTMLDivElement>(".menu-left-middle");

      // setBodyElement(body.outerHTML)
      setMenuElement(menu?.outerHTML)
      bodyRef.current = body;
    },
    [html]
  )

  return (
    <div className={styles.wrapper}>
      <Menu originalElement={menuElement} />

      <div className={styles.page}>
          {isLoading && (
            "Loading..."
          )}
          
          <Routes>
            <Route
              index
              element={"index"}
            />

            <Route
              path=':slug'
              element={<Page />}
            />
          </Routes>
      </div>
    </div>
  )
}

export default Rzeszowiak