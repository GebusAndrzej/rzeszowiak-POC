import { Button } from '@/components/ui/button'
import styles from './Rzeszowiak.module.css'
import Menu from './components/Menu/Menu'
import { AHttpClient } from '@/http/AxiosAbstract'
import { useQuery } from '@tanstack/react-query'

type Props = {}

const Rzeszowiak = ({}: Props) => {

  const {data,isLoading, failureCount} = useQuery({
    queryFn: AHttpClient.getPost,
    queryKey: ['rzeszowiak'],
  })

  console.log(data)

  return (
    <div className={styles.wrapper}>
        <Menu />

        <div>
            {isLoading && (
              "Loading..."
            )}
            Page
            <Button>
              hello
              {failureCount}
            </Button>
        </div>
    </div>
  )
}

export default Rzeszowiak