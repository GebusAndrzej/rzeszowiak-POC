// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import LandingPage from '@/pages/LandingPage/LandingPage'
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Rzeszowiak from '@/pages/Rzeszowiak/Rzeszowiak'

function App() {
  return (
    <div className={styles.app}>
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
    </div>
  )
}

export default App
