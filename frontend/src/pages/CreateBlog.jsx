import { useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
    const refs = useRef([]);
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);

        try{
            
            const res = await axios.post("http://localhost:3000/api/v1/blog/",{title,content},{withCredentials: true});
            alert("Blog Created");
            navigate("/home")

        } catch(err){
            console.error("Failed to create Blog",err);
        }
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center bg-[#8DA9C4] p-6">
        <div className="w-full max-w-3xl bg-[#EEF4ED] shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl text-center font-bold mb-6">✍️ Create a New Blog</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium mb-2">Title</label>
              <input
                ref={(el)=>{refs.current[0] = el}}
                type="text"
                placeholder="Enter blog title"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={title}
                onChange={(e) => (setTitle(e.target.value))}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        refs.current[1].focus();
                    }
                }}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Content</label>
              <textarea
                ref={(el)=>{refs.current[1] = el}}
                rows="10"
                placeholder="Write your blog here..."
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={content}
                onChange={(e) => (setContent(e.target.value))}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              Publish Blog
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};
