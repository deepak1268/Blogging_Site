import { useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { toast } from "react-toastify";

export const CreateBlog = () => {
  const refs = useRef([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const toastId = toast("Creating Blog...")
    // add a check so that user has to fill all the fields
    if (
      !formData.title ||
      !formData.content ||
      !formData.category ||
      !formData.tags ||
      !image
    ) {
      toast.update(toastId,{
        render: "Please fill in all the fields",
        type: "error",
        autoClose: 3000,
        isLoading: false
      });
      return;
    }

    setLoading(true);
    try {
      formData.tags = formData.tags
          .trim()
          .split(" ")
          .filter((tag) => tag.trim() != "");
      const payload = new FormData();
      payload.append("title",formData.title);
      payload.append("content",formData.content);
      payload.append("category",formData.category);
      payload.append("tags",formData.tags);
      payload.append("image",image);
      
      const res = await axios.post(
        `${config.apiBaseUrl}/api/v1/blog/`,
        payload,
        { withCredentials: true }
      );
      toast.update(toastId,{
        render: "Blog Created Successfully",
        type: "success",
        autoClose: 3000,
        isLoading: false
      });
      setFormData({ title: "", content: "", category: "", tags: "" });
      navigate("/home");
    } catch (err) {
      toast.update(toastId,{
        render: "Some Error Occured",
        type: "error",
        autoClose: 3000,
        isLoading: false
      });
      
      console.error("Failed to create Blog", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="flex-grow flex justify-center items-center bg-[#284b63] p-6"
        style={{
          backgroundImage: `url(https://imgs.search.brave.com/Bo7Ilk04Sf5bOBIWipgakR_GtIF5ne38NsAapi7g9kA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAw/NzE3OTc0NC92ZWN0/b3IvYmx1ZS1hYnN0/cmFjdC1iYWNrZ3Jv/dW5kLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1ZV1NOR2ha/RndLLUtUWWQ5czly/dG9uTmxLMEp1WG9k/d196MlZHb3MwVWFN/PQ)`,
        }}
      >
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl text-center font-bold font-mono italic mb-6">
            ✍️ Create a New Blog
          </h1>

          {message && (
            <div className="text-red-500 text-center text-lg font-semibold">
              {message}
            </div>
          )}

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

            <div>
              <label className="block text-lg font-medium mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e)=>(setImage(e.target.files[0]))}
                className="block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:font-semibold
             file:bg-gray-300 file:text-gray-800
             hover:file:bg-gray-400"
              />
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
