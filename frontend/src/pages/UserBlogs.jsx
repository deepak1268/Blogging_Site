import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Plus } from "../components/Icons";
import { BlogCard } from "../components/BlogCard";

export const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/blog/user", {
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
      await axios.delete(`http://localhost:3000/api/v1/blog/${Blogid}`,{withCredentials: true});
      window.location.reload();
    } catch(err){
      console.error("Error occured while deleting")
    }
    
  } 

  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex-grow p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">📝 Manage Your Blogs</h1>
            <button
              onClick={() => navigate("/createBlog")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex gap-1 cursor-pointer"
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
