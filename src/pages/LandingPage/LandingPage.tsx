import { pages } from './consts';
import PageCard from './components/PageCard/PageCard';
import styles from './LandingPage.module.css';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';

const LandingPage = () => {
    const [search, setSearch] = useState('')

    const filteredPages = useMemo(
        () => pages.filter(page => 
            page.name.toLowerCase().includes(search.toLowerCase()) ||
            page.voivodeship.toLowerCase().includes(search.toLowerCase())
        ),
        [search]
    )

    return (
        <main className={styles.wrapper}>
            <div className={styles.titleContainer}>
                <h2>marketplace</h2>

                <Input 
                    onChange={event => setSearch(event.target.value)}
                    placeholder='Nazwa portalu lub województwa'
                />
            </div>

            <div className={styles.pages}>
                {filteredPages.map(page => (
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
