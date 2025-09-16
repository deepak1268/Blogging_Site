import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

export const LogoutButton = () => {

    const navigate = useNavigate();
    async function logout (){
        const toastId = toast("Logging Out...")
        try{
            await axios.post(`${config.apiBaseUrl}/logout`,{},{withCredentials: true});
            toast.update(toastId,{
                render: "Logged Out Successfully",
                type: "success",
                autoClose: 3000,
                isLoading: false
            });
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/";
        } catch(err) {
            toast.update(toastId,{
                render: "Some Error Occured",
                type: "error",
                autoClose: 3000,
                isLoading: false
            });
            console.error("Logout failed:", err.response?.data || err.message);
        }
         
    }

    return <div>
        <button onClick={logout} className="p-1 w-22 text-lg font-semibold rounded-2xl bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Logout
            </button>
    </div>
}