import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

export const LogoutButton = () => {

    const navigate = useNavigate();
    async function logout (){

        try{
            await axios.post(`${config.apiBaseUrl}/logout`,{},{withCredentials: true});
            window.location.href = "/";
        } catch(err) {
            console.error("Logout failed:", err.response?.data || err.message);
        }
         
    }

    return <div>
        <button onClick={logout} className="p-1 w-22 text-lg font-semibold rounded-2xl bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Logout
            </button>
    </div>
}