import { Button } from '@/components/ui/button'
import styles from './Rzeszowiak.module.css'
import Menu from './components/Menu/Menu'
import { AHttpClient } from '@/http/AxiosAbstract'
import { useQuery } from '@tanstack/react-query'

type Props = {}

const Rzeszowiak = ({}: Props) => {

  const {data} = useQuery({
    queryFn: AHttpClient.getPost,
    queryKey: ['rzeszowiak'],
  })

  console.log(data)

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