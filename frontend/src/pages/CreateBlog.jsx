import { useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

export const CreateBlog = () => {
  const refs = useRef([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => ({...prev,[e.target.name]: e.target.value}));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .trim()
          .split(" ")
          .filter((tag) => (tag.trim() != ""))
      }
      const res = await axios.post(
        `${config.apiBaseUrl}/api/v1/blog/`,
        payload,
        { withCredentials: true }
      );
      setFormData({ title: "", content: "", category: "", tags: "" });
      alert("Blog Created");
      navigate("/home");
      setLoading(false);
    } catch (err) {
      console.error("Failed to create Blog", err);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center bg-[#284b63] p-6">
        <div className="w-full max-w-4xl bg-[#F2E9E4] shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl text-center font-bold mb-6">
            ✍️ Create a New Blog
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium mb-2">Title</label>
              <input
                ref={(el) => {
                  refs.current[0] = el;
                }}
                name="title"
                type="text"
                placeholder="Enter blog title"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.title}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    refs.current[1].focus();
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Content</label>
              <textarea
                ref={(el) => {
                  refs.current[1] = el;
                }}
                name="content"
                rows="10"
                placeholder="Write your blog here..."
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.content}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="e.g. #coding #movie #chai"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Category</label>
              <select
                name="category"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="" disabled>
                  -- Select a category --
                </option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="News">News</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4A4E69] text-white hover:opacity-80"
              }`}
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};
