import { pages } from './consts';
import PageCard from './components/PageCard/PageCard';
import styles from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <main className={styles.wrapper}>
            <h2>Portale w jednym miejscu</h2>

            <div className={styles.pages}>
                {pages.map(page => (
                    <PageCard
                        key={page.name}
                        name={page.name}
                        url={page.url}
                    />
                ))}
            </div>
        </main>
    );
};

export default LandingPage;
