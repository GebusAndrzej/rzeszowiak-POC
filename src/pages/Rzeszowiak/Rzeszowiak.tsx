import { Button } from '@/components/ui/button'
import styles from './Rzeszowiak.module.css'
import Menu from './components/Menu/Menu'
import { useEffect } from 'react'
import { AHttpClient } from '@/http/AxiosAbstract'

type Props = {}

const Rzeszowiak = ({}: Props) => {

  useEffect(
    () => {
      AHttpClient.getPost().then(console.log)
    }
  )

  return (
    <div className={styles.wrapper}>
        <Menu />

        <div>
            Page
            <Button>
              hello
            </Button>
        </div>
    </div>
  )
}

export default Rzeszowiak