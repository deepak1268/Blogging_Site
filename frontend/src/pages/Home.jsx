import axios from "axios";
import { BlogCard } from "../components/BlogCard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Plus } from "../components/Icons";
import { useNavigate } from "react-router-dom";
import config from "../config";

export const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCategory, setSearchCategory] = useState("");
  const categories = [
    "All",
    "Technology",
    "Lifestyle",
    "Food",
    "Travel",
    "Education",
    "Health",
    "News",
    "Entertainment",
    "Others",
  ];

  useEffect(() => {
    axios
      .get(`${config.apiBaseUrl}/api/v1/blog/`, { withCredentials: true })
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error("Error fetching blogs: ", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading Blogs...</div>;
  }

  function createBlog() {
    navigate("/createBlog");
  }

  async function handleDelete(Blogid) {
    try {
      await axios.delete(`${config.apiBaseUrl}/api/v1/blog/${Blogid}`, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (err) {
      console.error("Error occured while deleting");
    }
  }

  const filteredBlogs = blogs.filter((blog) =>
    searchCategory === "" ? true : blog.category === searchCategory
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex-grow bg-[#284b63]">
        <div className="flex justify-between mt-10 ml-16 mr-16">
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#353535]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === "All" ? "" : cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={createBlog}
            className="text-xl text-white font-medium bg-[#353535] p-3 rounded-3xl flex items-center gap-1 cursor-pointer hover:opacity-90"
          >
            <Plus></Plus>
            Create New Blog
          </button>
        </div>

        <div className="mb-10 mt-10 pl-16 pr-16 flex flex-col gap-10 ">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onDelete={() => handleDelete(blog._id)}
                onEdit={() => navigate(`/blog/edit/${blog._id}`)}
              />
            ))
          ) : (
            <p className="text-white text-lg text-center">No blogs found.</p>
          )}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};
