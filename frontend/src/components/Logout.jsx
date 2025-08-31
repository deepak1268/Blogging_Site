import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LogoutButton = () => {

    const navigate = useNavigate();
    async function logout (){

        try{
            await axios.post("http://localhost:3000/logout",{},{withCredentials: true});
            window.location.href = "/";
        } catch(err) {
            console.error("Logout failed:", err.response?.data || err.message);
        }
         
    }

    return <div>
        <button onClick={logout} className="p-1 w-22 text-lg font-semibold rounded-2xl bg-red-800 hover:opacity-90 cursor-pointer">
                Logout
            </button>
    </div>
}