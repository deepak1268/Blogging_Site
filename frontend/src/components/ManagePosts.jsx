import { useNavigate } from "react-router-dom"

export const ManagePosts = () => {

    const navigate = useNavigate();

    function manageposts(){
        navigate("/userBlogs");
    }

    return (

        <button onClick={manageposts} className="p-1 text-lg font-semibold rounded-2xl  hover:opacity-75 cursor-pointer lg:text-xl">
            Manage Your Posts
        </button>
    )
}