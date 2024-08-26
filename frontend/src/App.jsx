
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './pages/Header'
import Footer from './pages/Footer'

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
