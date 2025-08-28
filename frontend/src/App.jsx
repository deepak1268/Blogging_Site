import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from "./pages/Signup"
import { Login } from './pages/Login'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
