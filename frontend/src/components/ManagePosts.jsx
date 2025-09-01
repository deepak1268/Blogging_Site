import { useNavigate } from "react-router-dom"

export const ManagePosts = () => {

    const navigate = useNavigate();

    function manageposts(){
        navigate("/userBlogs");
    }

    return (

        <button onClick={manageposts} className="p-1 w-50 text-lg font-semibold rounded-2xl  hover:bg-gray-300 cursor-pointer">
            Manage Your Posts
        </button>
    )
}