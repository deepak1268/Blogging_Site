import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

export const EditBlog = () => {
  const refs = useRef([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`${config.apiBaseUrl}/api/v1/blog/${id}`, {
          withCredentials: true,
        });
        const blog = res.data.blog;
        setFormData({
          title: blog.title,
          content: blog.content,
          category: blog.category,
          tags: blog.tags ? blog.tags.join(" ") : "",
        });
        console.log(formData.tags);
      } catch (err) {
        console.error("Error while fetching blog", err);
      }
    }
    fetchBlog();
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const toastId = toast("Updating");
    setUpdating(true);
    try {
      formData.tags = formData.tags
        .trim()
        .split(" ")
        .filter((tag) => tag.trim() != "");
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("content", formData.content);
      payload.append("category", formData.category);
      payload.append("tags", formData.tags);
      payload.append("image", image);
      await axios.put(`${config.apiBaseUrl}/api/v1/blog/${id}`, payload, {
        withCredentials: true,
      });
      toast.update(toastId,{
        render: "Blog Updated Successfully.",
        type: "success",
        autoclose: 3000,
        isLoading: false
      });
      setUpdating(false);
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error("Error while updating blog", err);
      setUpdating(false);
      toast.update(toastId,{
        render: "Some error occured.",
        type: "error",
        autoclose: 3000,
        isLoading: false
      });
    } finally {
      setUpdating(false);
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
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-3xl text-center font-mono font-bold mb-6 italic">
            Edit Blog
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium mb-2">Title</label>
              <input
                name="title"
                ref={(el) => {
                  refs.current[0] = el;
                }}
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
                name="content"
                ref={(el) => {
                  refs.current[1] = el;
                }}
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
                Update Image
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                name="image"
                placeholder="No File Chosen"
                onChange={(e) => setImage(e.target.files[0])}
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
              disabled={updating}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
                updating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4A4E69] text-white hover:opacity-80"
              }`}
            >
              {updating ? "Updating..." : "Update Blog"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};
