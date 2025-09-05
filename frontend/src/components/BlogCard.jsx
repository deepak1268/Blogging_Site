import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Delete } from "./Icons";
import config from "../config";

export const BlogCard = ({ blog, onEdit, onDelete }) => {
  const [userid, setUserid] = useState(null);

  // we have to see that if the user is the author of the blog then we have to give the edit and delete button

  useEffect(() => {
    async function fetchUserId() {
      try {
        const res = await axios.get(`${config.apiBaseUrl}/me`, {
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
    <div className="border-2 rounded-lg shadow-2xl p-4 bg-[#F2E9E4] hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-mono">{blog.title}</h2>
        {userid === blog.author._id && (
          <div className="flex gap-2">
            <button onClick={onEdit} className="bg-[#C9ADA7] px-2 py-1 text-sm border rounded hover:opacity-75 cursor-pointer">
              <Edit></Edit>
            </button>
            <button onClick={onDelete} className="bg-red-400 px-2 py-1 text-sm border rounded hover:opacity-75 cursor-pointer">
              <Delete></Delete>
            </button>
          </div>
        )}
      </div>
      <br />
      <div className="font-medium mb-3">
        Category : {blog.category}
      </div>

      <p className="text-gray-700 text- mb-3 whitespace-pre-line line-clamp-3 font-sans">
        {blog.content}...
      </p>
      <div className="flex justify-between">
        <p className="text-yellow-800 text-sm italic font-medium">
          By {blog.author.firstName} {blog.author.lastName}
        </p>
        <p className="text-yellow-800 text-sm italic font-medium">
          {new Date(blog.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
        </p>
      </div>
      
      <Link
        to={`/blog/${blog._id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        Read More →
      </Link>
    </div>
  );
};
