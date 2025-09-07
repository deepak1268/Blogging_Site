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
      <main className="flex-grow" style={{backgroundImage: `url(https://imgs.search.brave.com/Bo7Ilk04Sf5bOBIWipgakR_GtIF5ne38NsAapi7g9kA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAw/NzE3OTc0NC92ZWN0/b3IvYmx1ZS1hYnN0/cmFjdC1iYWNrZ3Jv/dW5kLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1ZV1NOR2ha/RndLLUtUWWQ5czly/dG9uTmxLMEp1WG9k/d196MlZHb3MwVWFN/PQ)`}}>
        <div className="flex justify-between mt-10 mx-10 ">
          <button
            onClick={createBlog}
            className="sm:text-xl text-white font-medium bg-[#353535] px-3 py-2 rounded-3xl flex items-center gap-1 cursor-pointer hover:opacity-90"
          >
            <Plus></Plus>
            Create New Blog
          </button>
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="px-2 py-2 rounded-2xl text-white focus:outline-none bg-[#353535]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === "All" ? "" : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="my-10 px-10 flex flex-col gap-10 ">
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
