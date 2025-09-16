import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { InputBox } from "../components/InputBox";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import config from "../config";
import { toast } from "react-toastify";

export const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const refs = useRef([]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index + 1 < refs.current.length) {
        refs.current[index + 1].focus(); // move to next
      } else {
        e.target.form.requestSubmit(); // last field → submit
      }
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const toastId = toast("Loading");
    try {
      const res = await axios.post(`${config.apiBaseUrl}/api/v1/user/signup`, formData);
      toast.update(toastId, {
        render: res.data.message,
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });
      setErrors({}); // clear old errors
      setFormData({
        email: "",
        password: "",  
        firstName: "",
        lastName: "",
      });
      refs.current[0].focus();
    } catch (err) {
      if (err.response.data.errors) {
        const fieldErrors = {};
        err.response.data.errors.forEach((e) => {
          fieldErrors[e.field] = e.message;
        });
        setErrors(fieldErrors);
        toast.dismiss(toastId);
      } else {
        toast.update(toastId, {
        render: err.response.data.message,
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });
        setFormData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main
        className="md:justify-start justify-center flex-grow flex items-center px-4 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(https://imgs.search.brave.com/sT4KBtW6WPG_2SAqbrfXzKKcxC-XP11wQMo-F8nzSfU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZGFy/ay13b3Jrc3BhY2Ut/YmxvZ2dpbmctYmFj/a2Ryb3AtYWNxb3Nz/NHJ5M2k3aWp5bC5q/cGc)`,
        }}
      >
        <div className="relative absolute inset-0 bg-black opacity-70"></div>
        <div className="bg-gray-100 rounded-2xl shadow-2xl p-10 w-full max-w-md md:ml-20">
          <div className="text-4xl font-bold text-center mb-8 text-gray-800">
            Sign Up
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-start gap-2"
          >
            <InputBox
              reference={(el) => (refs.current[0] = el)}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            <InputBox
              reference={(el) => (refs.current[1] = el)}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}

            <InputBox
              reference={(el) => (refs.current[2] = el)}
              name="email"
              value={formData.email}
              type="text"
              placeholder="Email"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 2)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <InputBox
              reference={(el) => (refs.current[3] = el)}
              name="password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 3)}
            >
              <button
                type="button"
                onClick={() => setShowPassword((prevValue) => !prevValue)}
                className="ml-2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </InputBox>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <button
              type="submit"
              className="mt-4 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="flex justify-center mt-6 gap-1 text-md">
            <span>Already have an account?</span>
            <Link
              to={"/login"}
              className="text-blue-600 hover:underline font-medium"
            >
              Log In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
