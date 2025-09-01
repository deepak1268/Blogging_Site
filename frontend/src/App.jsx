import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from "./pages/Signup"
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { LandingPage } from './pages/LandingPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import { CreateBlog } from './pages/CreateBlog'
import { UserBlogs } from './pages/UserBlogs'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<PublicRoute> <Signup /> </PublicRoute>}></Route>
        <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute>}></Route>
        <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>}></Route>
        <Route path='/createBlog' element={<ProtectedRoute> <CreateBlog /> </ProtectedRoute>}></Route>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/userBlogs' element={<ProtectedRoute> <UserBlogs /> </ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
