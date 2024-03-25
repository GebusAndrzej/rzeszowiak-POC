import styles from './LandingPage.module.css'
import PageCard from './components/PageCard/PageCard'
import { pages } from './consts'

const LandingPage = () => {
  return (
    <main className={styles.wrapper}>
      <h2>Portale w jednym miejscu</h2>

      <div className={styles.pages}>
        {pages.map(page => (
          <PageCard 
            name={page.name}
            url={page.url}
          />
        ))}
      </div>
    </main>
  )
}

export default LandingPage