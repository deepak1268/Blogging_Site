import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home } from "./Icons";
import { LogoutButton } from "./Logout";
import { ManagePosts } from "./ManagePosts";
import config from "../config";

export const Header = () => {
  const [isAuth, setAuth] = useState(null);

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

  return (
    <header className="h-20 sticky z-50 top-0 shadow bg-[#000000]">
      {isAuth ? <LoggedinHeader /> : <LoggedoutHeader />}
    </header>
  );
};

const LoggedinHeader = () => {
    
    const [user,setUser] = useState(null);

    useEffect(() => {
        axios.get(`${config.apiBaseUrl}/me`,{withCredentials: true})
            .then((res)=>{
                setUser(res.data.firstName)
            })
            .catch(()=>(setUser(null)))
    },[])

  return (
    <div className="flex justify-between items-center text-white">
      <div className="flex justify-center items-center gap-4">

        <div className="text-lg mt-4 pl-4 font-semibold flex justify-center items-center gap-2 font-mono sm:text-xl md:text-2xl lg:text-3xl">
          <img src="https://imgs.search.brave.com/GyZvFA4bE7zKoc3R9XWnT_132ZwuFCdNLX1Yjr6-fSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzE4LzQ3LzQ1/LzM2MF9GXzE1MTg0/NzQ1NzZfb0Y0QUZH/OWhETnN4UUdwbnl1/R2FKVnZNWkVrZEZI/U1ouanBn" alt="" className="size-12 rounded-xl"/>
          <Link to="/">Chai & Chatter</Link>
        </div>

        <div className="mt-4 flex justify-center items-center hover:opacity-75 p-1 rounded-xl">
            <Link to='/home'>
              <Home></Home>
            </Link>
        </div>

      </div>

      <div className="mt-3 mr-4 justify-center items-center gap-2 text-xl font-semibold hidden lg:flex">
        <span>
            👋 Welcome 
        </span>
        <span>
            {user}
        </span>
      </div>

      <div className="mt-3 mr-4 flex justify-center items-center gap-4">
        <div >
            <ManagePosts />
        </div>
        <div>
            <LogoutButton />
        </div>
      </div>

    </div>
  );
};

const LoggedoutHeader = () => {
  return (
    <div className="flex justify-center items-center sm:justify-between">
      <div className="flex justify-center items-center">
        <div className="text-3xl text-white mt-4 pl-4 font-semibold flex justify-center items-center gap-2 font-mono">
          <img src="https://imgs.search.brave.com/GyZvFA4bE7zKoc3R9XWnT_132ZwuFCdNLX1Yjr6-fSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzE4LzQ3LzQ1/LzM2MF9GXzE1MTg0/NzQ1NzZfb0Y0QUZH/OWhETnN4UUdwbnl1/R2FKVnZNWkVrZEZI/U1ouanBn" alt="" className="size-12 rounded-xl"/>
          <Link to="/">Chai & Chatter</Link>
        </div>
      </div>
      <div className="justify-center items-center mr-5 mt-4 gap-5 hidden sm:flex">
        <div className="hover:text-blue-300 hover:underline text-white text-lg">
          <Link to="/login">Log In</Link>
        </div>
        <div className="bg-blue-600 rounded-3xl text-white p-2 w-35 text-center hover:bg-blue-700">
          <Link to="/signup">Get Started</Link>
        </div>
      </div>
    </div>
  );
};
