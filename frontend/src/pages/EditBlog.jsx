import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import config from "../config";

export const EditBlog = () => {
    const refs = useRef([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        title: "",
        content: ""
    })
    const [message,setMessage] = useState("")

    useEffect(() => {
        async function fetchBlog(){
            try{
                const res = await axios.get(`${config.apiBaseUrl}/api/v1/blog/${id}`,{withCredentials: true});
                setFormData({
                    title: res.data.blog.title,
                    content: res.data.blog.content
                });
            } catch(err){
                console.error("Error while fetching blog",err);
                setMessage("Failed to load blog.")
            }
        }
        fetchBlog();
    },[id])

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await axios.put(`${config.apiBaseUrl}/api/v1/blog/${id}`,formData,{withCredentials: true});
            navigate(`/blog/${id}`);
        } catch(err){
            console.error("Error while updating blog",err);
            setMessage("Failed to update blog.");
        }
    }

    return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center bg-[#284b63] p-6">
        <div className="w-full max-w-3xl bg-[#F2E9E4] shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl text-center font-bold mb-6">Edit Blog</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium mb-2">Title</label>
              <input
                name="title"
                ref={(el)=>{refs.current[0] = el}}
                type="text"
                placeholder="Enter blog title"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.title}
                onChange={handleChange}
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
                name="content"
                ref={(el)=>{refs.current[1] = el}}
                rows="10"
                placeholder="Write your blog here..."
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.content}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4A4E69] text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
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
