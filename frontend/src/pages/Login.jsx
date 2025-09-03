import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState();
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
    if (!formData.email || !formData.password) {
      setMessage("Please fill in all the fields");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        formData,
        { withCredentials: true }
      );
      setMessage(res.data.message);
      navigate("/home");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow flex justify-center items-center px-4 bg-[#4A4E69]">
        <div className="bg-[#F2E9E4] rounded-2xl shadow-2xl p-10 w-full max-w-md ">
          <div className="text-4xl font-bold text-center mb-8 text-gray-800">
            Log In
          </div>

          {message && (
            <div
              className={`mb-5 text-center text-lg font-semibold ${
                message === "Please fill in all the fields"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center gap-6"
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
