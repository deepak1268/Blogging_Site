import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Delete } from "./Icons";
import config from "../config";

export const BlogCard = ({ blog, onEdit, onDelete }) => {
  const [userid, setUserid] = useState(null);

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
    <div className="flex flex-row border-2 rounded-lg shadow-2xl p-4 bg-white hover:shadow-xl border hover:border-gray-100 transition">
      {blog.imageURL && (
        <div className="flex justify-center items-center md:w-1/3 w-full flex-shrink-0 p-4">
          <img
            src={blog.imageURL}
            alt={blog.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}

      <div className="flex flex-col p-2 flex-grow">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold font-mono italic">{blog.title}</h2>
          {userid === blog.author._id && (
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="bg-[#C9ADA7] px-2 py-1 text-sm border rounded hover:opacity-75 cursor-pointer"
              >
                <Edit></Edit>
              </button>
              <button
                onClick={onDelete}
                className="bg-red-400 px-2 py-1 text-sm border rounded hover:opacity-75 cursor-pointer"
              >
                <Delete></Delete>
              </button>
            </div>
          )}
        </div>

        <div className="text-lg font-medium font-sans mt-5 mb-2 italic">
          Category : {blog.category}
        </div>

        <div className="bg-gray-900 h-[4px] w-14"></div>

        <p className="text-gray-700 mt-2 mb-8 whitespace-pre-line line-clamp-8 font-serif">
          {blog.content}...
        </p>

        <div className="flex justify-between">
          <p className="text-yellow-800 italic font-medium">
            By {blog.author.firstName} {blog.author.lastName}
          </p>

          <p className="text-yellow-800 italic font-medium">
            {new Date(blog.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="flex justify-end mt-2">
          <Link
            to={`/blog/${blog._id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};
