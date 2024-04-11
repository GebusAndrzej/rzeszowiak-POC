// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import { APP_ROUTE } from './appConsts';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import LandingPage from '@/pages/LandingPage/LandingPage';
import Rzeszowiak from '@/pages/Rzeszowiak/Rzeszowiak';
import Tarnowiak from '@/pages/Tarnowiak/Tarnowiak';
import styles from './App.module.css';

function App() {
    const queryClient = new QueryClient();

    return (
        <div className={styles.app}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter basename={'/rzeszowiak-POC/'}>
                    <Routes>
                        <Route
                            element={<LandingPage />}
                            index
                        />

                        <Route
                            element={<Rzeszowiak />}
                            path={`${APP_ROUTE.RZESZOWIAK}/*`}
                        />

                        <Route
                            element={<Tarnowiak />}
                            path={`${APP_ROUTE.TARNOWIAK}/*`}
                        />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}

export default App;
