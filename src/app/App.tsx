// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import LandingPage from '@/pages/LandingPage/LandingPage'
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Rzeszowiak from '@/pages/Rzeszowiak/Rzeszowiak'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <div className={styles.app}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={<LandingPage />}
              />

            <Route
              path='rzeszowiak'
              element={<Rzeszowiak />}
              />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
