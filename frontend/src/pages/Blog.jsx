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
  const [comment, setComment] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
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

  async function handleCommentSubmit(e) {
    e.preventDefault();
    setLoadingComment(true);
    try {
      
      const res = await axios.post(`${config.apiBaseUrl}/api/v1/comment/addComment/${id}`, {text: comment}, {
        withCredentials: true,
      });
      setBlog((prev) => ({
        ...prev,
        comments: [...(prev.comments || []),res.data.comment]
      }));
      
      setComment("");
    } catch (err) {
      console.error("Error while posting comment", err);
    } finally{
      setLoadingComment(false);
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

          <p className="text-sm text-gray-700 mb-2">
            <strong>Category:</strong> {blog.category}
          </p>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#4A4E69] text-white text-sm px-2 py-1 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-yellow-800 text-xl mb-6 italic font-medium">
            - By {blog.author?.firstName} {blog.author?.lastName} Created on{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
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

        {/* Comments Section */}
        
          <div className="mt-8 bg-[#F2E9E4] shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Comments</h2>

            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                rows="3"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none mb-2"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                type="submit"
                disabled={loadingComment}
                className={`px-4 py-2 rounded-lg font-medium ${
                  loadingComment
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#4A4E69] text-white hover:opacity-80"
                }`}
              >
                {loadingComment ? "Posting..." : "Post Comment"}
              </button>
            </form>

            {/* Comments List */}
            {blog.comments && blog.comments.length > 0 ? (
              <ul className="space-y-4">
                {blog.comments.map((c, index) => (
                  <li
                    key={index}
                    className="border rounded-lg p-3 bg-gray-50 shadow-sm"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium text-[#284b63]">
                      {c.user?.firstName} {c.user?.lastName}
                    </span>
                    <span className="font-medium text-[#284b63]">
                      
            {new Date(c.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
                    </span>
                    </div>
                    
                    <p className="text-gray-800 mt-1">{c.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No comments yet.</p>
            )}
          </div>
        
      </main>
      <Footer />
    </div>
  );
};
