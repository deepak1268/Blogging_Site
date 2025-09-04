import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { Edit, Delete } from "../components/Icons";
import config from "../config";

export const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        const res = await axios.get(`${config.apiBaseUrl}/api/v1/blog/${id}`, {
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
        const res = await axios.get(`${config.apiBaseUrl}/me`, {
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
      await axios.delete(`${config.apiBaseUrl}/api/v1/blog/${id}`, {
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
      <main className="flex-grow bg-[#284b63] p-6">
        <div className="mx-auto bg-[#F2E9E4] shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold font-mono">{blog.title}</h1>

            {currentUserId && blog.author?._id === currentUserId && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/blog/edit/${id}`)}
                  className="px-3 py-1 bg-[#C9ADA7] text-black rounded-md hover:opacity-75 transition"
                >
                  <Edit />
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-400 text-black rounded-md hover:opacity-75 transition"
                >
                  <Delete />
                </button>
              </div>
            )}
          </div>

          <p className="text-yellow-800 text-xl mb-6 italic font-medium">
            - By {blog.author?.firstName} {blog.author?.lastName}
          </p>
          <p className="whitespace-pre-line text-lg leading-relaxed mb-6">
            {blog.content}
          </p>

          <Link
            to="/home"
            className="inline-block px-4 py-2 bg-[#4A4E69] text-white rounded-lg hover:opacity-75 font-medium"
          >
            Back to Blogs
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
