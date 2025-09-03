import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home } from "./Icons";
import { LogoutButton } from "./Logout";
import { ManagePosts } from "./ManagePosts";

export const Header = () => {
  const [isAuth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/check-auth", { withCredentials: true })
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
    <header className="h-20 sticky z-50 top-0 shadow bg-[#22223B]">
      {isAuth ? <LoggedinHeader /> : <LoggedoutHeader />}
    </header>
  );
};

const LoggedinHeader = () => {
    
    const [user,setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/me",{withCredentials: true})
            .then((res)=>{
                setUser(res.data.firstName)
            })
            .catch(()=>(setUser(null)))
    },[])

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center gap-4">
        <div className="text-3xl mt-3 ml-4 font-semibold p-1">
          <Link to="/">Chai & Chatter</Link>
        </div>
        <div className="mt-3 flex justify-center items-center hover:bg-gray-300 p-1 rounded-xl">
            <Home></Home>
            <span className="font-semibold text-lg">
                <Link to='/home'>
                    Home
                </Link>
            </span>
        </div>
      </div>
      <div className="mt-3 mr-4 flex justify-center items-center gap-1 text-lg font-semibold">
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
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center">
        <div className="text-3xl text-white mt-4 pl-4 font-semibold flex justify-center items-center gap-2">
          <img src="https://imgs.search.brave.com/GyZvFA4bE7zKoc3R9XWnT_132ZwuFCdNLX1Yjr6-fSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzE4LzQ3LzQ1/LzM2MF9GXzE1MTg0/NzQ1NzZfb0Y0QUZH/OWhETnN4UUdwbnl1/R2FKVnZNWkVrZEZI/U1ouanBn" alt="" className="size-12 rounded-xl"/>
          <Link to="/">Chai & Chatter</Link>
        </div>
      </div>
      <div className="flex justify-center items-center mr-5 mt-4 gap-4">
        <div className="hover:text-blue-300 hover:underline text-white text-lg">
          <Link to="/login">Log In</Link>
        </div>
        <div className="bg-blue-600 rounded-3xl text-white p-2 w-35 text-center hover:bg-blue-500">
          <Link to="/signup">Get Started</Link>
        </div>
      </div>
    </div>
  );
};
