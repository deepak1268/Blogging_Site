import { useEffect } from "react";
import { useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios";
import config from "../config";

export const ProtectedRoute = ({children}) => {
    const [isAuth,setAuth] = useState(null); // null means still checking 
    const [loading,setLoading] = useState(true);

    // useEffect hook with empty dependency array will run each time ProtectedRoute parent component is rendered
    useEffect(()=>{
        axios.get(`${config.apiBaseUrl}/check-auth`,{withCredentials: true})
            .then((res) => {
                if(res.data.authenticated){
                    setAuth(true);
                }
                else{
                    setAuth(false);
                }
            })
            .catch(() => (setAuth(false)))
            .finally(() => (setLoading(false)));
    },[])

    if(loading){
        return <div className="text-center mt-20">
            Checking Authentication
        </div>
    }
    if(!isAuth){
        return <Navigate to='/login' replace />
    }
    else{
        return children
    }
    
}