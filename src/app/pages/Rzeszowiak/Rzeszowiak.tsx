import styles from './Rzeszowiak.module.css'
import Menu from './components/Menu/Menu'

type Props = {}

const Rzeszowiak = (props: Props) => {
  return (
    <div className={styles.wrapper}>
        <Menu />

        <div>
            Page
        </div>
    </div>
  )
}

export default Rzeszowiak