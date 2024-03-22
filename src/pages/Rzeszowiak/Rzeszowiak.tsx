import { Button } from '@/components/ui/button'
import styles from './Rzeszowiak.module.css'
import { AHttpClient } from '@/http/AxiosAbstract'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import Menu from './components/Menu/Menu'
import { Route, Routes } from 'react-router-dom'

type Props = {}

const domSanitize = (content: string, config: {
  ADD_URI_SAFE_ATTR?: string[];
  FORBID_TAGS?: string[];
}): string =>
  DOMPurify.sanitize(content, config);

const Rzeszowiak = ({}: Props) => {
  const bodyRef = useRef<HTMLElement>()
  // const [bodyElement, setBodyElement] = useState<string>('')
  const [menuElement, setMenuElement] = useState<string>()

  const {data,isLoading, failureCount} = useQuery({
    queryFn: AHttpClient.getPost,
    queryKey: ['rzeszowiak'],
  })

  useEffect(
    () => {

    const sanitizedResponse = domSanitize(
        data, 
        {
          ADD_URI_SAFE_ATTR: [ 'src', 'href' ],
          FORBID_TAGS: ['style', 'width', 'height']
        }
      )

      const html = new DOMParser().parseFromString(sanitizedResponse, "text/html")

      const body = html.body;
      const menu = html.querySelector<HTMLDivElement>(".menu-left-middle");

      // setBodyElement(body.outerHTML)
      setMenuElement(menu?.outerHTML)
      bodyRef.current = body;
    },
    [data]
  )

  return (
    <div className={styles.wrapper}>
      <Menu originalElement={menuElement} />


        <div>
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
                element={"some category/item"}
              />
            </Routes>
        </div>
    </div>
  )
}

export default Rzeszowiak