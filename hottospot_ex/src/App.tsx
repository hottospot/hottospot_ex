
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Top from './pages/Top'
import MapPage from './pages/MapPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
