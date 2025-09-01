import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { Edit, Delete } from "../components/Icons";

export const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/blog/${id}`, {
          withCredentials: true,
        });
        setBlog(res.data.blog);
      } catch (err) {
        console.error("error while fetching blog", err);
        setMessage("Failed to load blog.");
      }
    }
    async function fetchCurrentUser() {
      try {
        const res = await axios.get("http://localhost:3000/me", {
          withCredentials: true,
        });
        setCurrentUserId(res.data._id);
      } catch (err) {
        console.error("error while fetching user", err);
      }
    }
    fetchBlogDetails();
    fetchCurrentUser();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/blog/${id}`, {
        withCredentials: true,
      });
      navigate("/home");
    } catch (err) {
      console.error("Error deleting blog:", err);
      setMessage("Failed to delete blog.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-[#F5F5F5] p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{blog.title}</h1>

            {currentUserId && blog.author?._id === currentUserId && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/blog/edit/${id}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  <Edit />
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  <Delete />
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-500 text-sm mb-6">
            By {blog.author?.firstName} {blog.author?.lastName}
          </p>
          <p className="whitespace-pre-line text-lg leading-relaxed mb-6">
            {blog.content}
          </p>

          <Link
            to="/home"
            className="inline-block px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Back to Blogs
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
