import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from "./pages/Signup"
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { LandingPage } from './pages/LandingPage'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>}></Route>
        <Route path='/' element={<LandingPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
