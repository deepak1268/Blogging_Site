import axios from "axios"
import { BlogCard } from "../components/BlogCard"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useEffect, useState } from "react"

export const Home = () => {
   
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

    return (
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <main className="flex-grow">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog}/>
                ))}
            </main>
            <Footer></Footer>
        </div>
    ) 
}