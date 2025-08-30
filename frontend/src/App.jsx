import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from "./pages/Signup"
import { Login } from './pages/Login'
import { BlogList } from './pages/BlogList'
import { Home } from './pages/Home'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/blogs' element={<BlogList />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
