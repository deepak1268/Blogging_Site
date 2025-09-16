import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import { LandingPage } from './pages/LandingPage'
import { Signup } from "./pages/Signup"
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Blog } from './pages/Blog'
import { CreateBlog } from './pages/CreateBlog'
import { UserBlogs } from './pages/UserBlogs'
import { EditBlog } from './pages/EditBlog'
import { ToastContainer, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        <Route path='/blog/edit/:id' element={<ProtectedRoute> <EditBlog /> </ProtectedRoute>}></Route>
        <Route path='/blog/:id' element={<ProtectedRoute> <Blog /> </ProtectedRoute>}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />
    </BrowserRouter>
  )
}

export default App
