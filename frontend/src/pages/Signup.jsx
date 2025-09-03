import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { InputBox } from "../components/InputBox";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const refs = useRef([]);

  const [message, setMessage] = useState("");

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
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setMessage("Please fill in all the fields");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        formData
      );
      setMessage(res.data.message);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
      refs.current[0].focus();
    } catch (err) {
      setMessage(err.response.data.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow flex justify-center items-center px-4 bg-[#284b63]">
        <div className="bg-[#F2E9E4] rounded-2xl shadow-2xl p-10 w-full max-w-md">
          <div className="text-4xl font-bold text-center mb-8 text-gray-800">
            Sign Up
          </div>

          {message && (
            <div className={`mb-5 text-center text-lg font-semibold ${message==="Please fill in all the fields" ? "text-red-500" : "text-green-500"}`}>
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center gap-6"
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
            <InputBox
              reference={(el) => (refs.current[1] = el)}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
            <InputBox
              reference={(el) => (refs.current[2] = el)}
              name="email"
              value={formData.email}
              type="text"
              placeholder="Email"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 2)}
            />
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

            <button
              type="submit"
              className="mt-4 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>

          <div className="flex justify-center mt-6 gap-1 text-sm">
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
