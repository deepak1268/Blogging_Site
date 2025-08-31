import { Link } from "react-router-dom";

export const BlogCard = ({ blog }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-700 text-sm mb-3 whitespace-pre-line line-clamp-3">
        {blog.content}... 
      </p>
      <p className="text-gray-500 text-xs mb-3">
        By {blog.author.firstName} {blog.author.lastName}
      </p>
      <Link
        to={`/blogs/${blog._id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        Read More →
      </Link>
    </div>
  );
};
