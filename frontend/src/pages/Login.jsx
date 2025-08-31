import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState();

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
    <div>
      <header className="mb-5 p-4 text-3xl font-semibold ">
        <Link to="/">The Daily Blog</Link>
      </header>
      <div className="flex flex-col justify-center items-center">
        <div className="text-5xl font-semibold mb-20">Log In</div>

        {message && <div className="mb-5 text-lg font-medium">{message}</div>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-10"
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
            type="text"
            name="password"
            value={formData.password}
            placeholder="Passowrd"
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          />
          <button
            type="submit"
            className="border-solid border-2 p-5 rounded-4xl w-50"
          >
            Submit
          </button>
        </form>
        <div className="flex mt-2 gap-1">
          <span>Don't have an account?</span>
          <Link
            to={"/signup"}
            className="text-blue-500 hover:underline tracking-wider"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
