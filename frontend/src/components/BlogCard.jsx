import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Delete } from "./Icons";

export const BlogCard = ({ blog, onEdit, onDelete }) => {
  const [userid, setUserid] = useState(null);

  // we have to see that if the user is the author of the blog then we have to give the edit and delete button

  useEffect(() => {
    async function fetchUserId() {
      try {
        const res = await axios.get("http://localhost:3000/me", {
          withCredentials: true,
        });
        setUserid(res.data._id);
      } catch (err) {
        console.error("Some error occured while fetching user id", err);
      }
    }
    fetchUserId();
  }, []);

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{blog.title}</h2>
        {userid === blog.author._id && (
          <div className="flex gap-2">
            <button onClick={onEdit} className="bg-gray-400 px-2 py-1 text-sm border rounded hover:bg-gray-300 cursor-pointer">
              <Edit></Edit>
            </button>
            <button onClick={onDelete} className="bg-red-400 px-2 py-1 text-sm border rounded hover:bg-red-300 cursor-pointer">
              <Delete></Delete>
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-700 text-sm mb-3 whitespace-pre-line line-clamp-3">
        {blog.content}...
      </p>
      <p className="text-gray-500 text-xs mb-3">
        By {blog.author.firstName} {blog.author.lastName}
      </p>
      <Link
        to={`/blog/${blog._id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        Read More →
      </Link>
    </div>
  );
};
