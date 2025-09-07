import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Plus } from "../components/Icons";
import { BlogCard } from "../components/BlogCard";
import config from "../config";

export const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get(`${config.apiBaseUrl}/api/v1/blog/user`, {
          withCredentials: true,
        });
        setBlogs(res.data.blogs || []);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching blogs", err);
      }
    }
    fetchBlogs();
  }, []);

  async function handleDelete(Blogid){
    try{
      await axios.delete(`${config.apiBaseUrl}/api/v1/blog/${Blogid}`,{withCredentials: true});
      window.location.reload();
    } catch(err){
      console.error("Error occured while deleting")
    }
    
  } 

  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex-grow p-6 bg-[#284b63]" style={{backgroundImage: `url(https://imgs.search.brave.com/Bo7Ilk04Sf5bOBIWipgakR_GtIF5ne38NsAapi7g9kA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAw/NzE3OTc0NC92ZWN0/b3IvYmx1ZS1hYnN0/cmFjdC1iYWNrZ3Jv/dW5kLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1ZV1NOR2ha/RndLLUtUWWQ5czly/dG9uTmxLMEp1WG9k/d196MlZHb3MwVWFN/PQ)`}}>
        <div className="max-w-5xl mx-auto bg-[#edede9] shadow-lg rounded-2xl p-6 mt-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold font-mono italic"> 📤 Manage Your Posts</h1>
            <button
              onClick={() => navigate("/createBlog")}
              className="bg-[#4A4E69] text-white px-4 py-2 rounded-lg hover:opacity-80 transition flex justify-center items-center gap-1 cursor-pointer"
            >
              <Plus></Plus>
              
              New Blog
            </button>
          </div>

            {loading ? (
                <p className="text-center">Loading Blogs...</p>
            ): blogs.length === 0 ? (
                <p className="text-center">You haven't written any blogs yet.</p>
            ) : (
                <div className="space-y-4">
                    {blogs.map((blog) => (
                        <BlogCard 
                            key={blog._id}
                            blog={blog}
                            onEdit={()=> navigate(`/blog/edit/${blog._id}`)}
                            onDelete={() => handleDelete(blog._id)}
                        />
                    ))}
                </div>
            )}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};
