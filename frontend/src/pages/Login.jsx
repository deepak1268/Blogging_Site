import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import config from "../config";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState();
  const [errors,setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const refs = useRef([]);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleKeyDown(e, index) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index + 1 < refs.current.length) {
        refs.current[index + 1].focus();
      } else {
        e.target.form.requestSubmit();
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const res = await axios.post(
        `${config.apiBaseUrl}/api/v1/user/signin`,
        formData,
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setErrors({});
      alert("Logged in successfully")
      navigate("/home");
    } catch (err) {
      if(err.response.data.errors){
        const fieldErrors = {};
        err.response.data.errors.forEach((e) => {
          fieldErrors[e.field] = e.message;
        });
        setErrors(fieldErrors);
        setMessage("");
      }
      else{
        setMessage(err.response.data.message);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center px-4 bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url(https://imgs.search.brave.com/sT4KBtW6WPG_2SAqbrfXzKKcxC-XP11wQMo-F8nzSfU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZGFy/ay13b3Jrc3BhY2Ut/YmxvZ2dpbmctYmFj/a2Ryb3AtYWNxb3Nz/NHJ5M2k3aWp5bC5q/cGc)`}}>
        <div className="bg-gray-100 rounded-2xl shadow-2xl p-10 w-full max-w-md ml-24">
          <div className="text-4xl font-bold text-center mb-8 text-gray-800">
            Log In
          </div>

          {message && (
            <div
              className={`mb-5 text-center text-lg font-semibold ${
                message === "Incorrect Credentials" || message === "User does not exist."
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-start gap-6"
          >
            <InputBox
              reference={(el) => (refs.current[0] = el)}
              type="text"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <InputBox
              reference={(el) => (refs.current[1] = el)}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            >
              <button
                type="button"
                onClick={() => setShowPassword((prevValue) => !prevValue)}
                className="ml-2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </InputBox>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <button
              type="submit"
              className="mt-4 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>

          <div className="flex justify-center mt-6 gap-1 text-sm">
            <span>Don't have an account?</span>
            <Link
              to={"/signup"}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
