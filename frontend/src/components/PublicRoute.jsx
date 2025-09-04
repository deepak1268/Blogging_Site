import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export const PublicRoute = ({children}) => {
    const [isAuth, setAuth] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${config.apiBaseUrl}/check-auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.authenticated) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.error("some error occured", err));
  }, []);

    if(isAuth){
        navigate("/home");
    }
    return children
}