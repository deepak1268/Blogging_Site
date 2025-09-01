import axios from "axios"
import { BlogCard } from "../components/BlogCard"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useEffect, useState } from "react"
import { Plus } from "../components/Icons"
import { useNavigate } from "react-router-dom"

export const Home = () => {
   const navigate = useNavigate();
    const [blogs,setBlogs] = useState([]);
    const [loading,setLoading] = useState(true);
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/blog/",{withCredentials: true})
            .then((res) => (setBlogs(res.data.blogs)))
            .catch((err) => (console.error("Error fetching blogs: ",err)))
            .finally(()=>(setLoading(false)));
    },[]);

    if(loading){
        return <div className="text-center mt-20">
            Loading Blogs...
        </div>
    }

    function createBlog(){
        navigate("/createBlog")
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <main className="flex-grow bg-gray-50">
                <div className="flex  justify-center mt-10 ">
                    <button onClick={createBlog} className="text-xl font-medium bg-orange-500 p-3 rounded-3xl flex items-center gap-1 cursor-pointer hover:opacity-90">
                        <Plus></Plus>
                        Create New Blog
                    </button>
                </div>
                
                <div className="mb-10 mt-10 pl-16 pr-16 flex flex-col gap-10 ">
                    {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog}/>
                    ))}
                </div>
            </main>
            <Footer></Footer>
        </div>
    ) 
}