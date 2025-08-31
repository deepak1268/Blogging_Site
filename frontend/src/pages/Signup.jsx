import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { InputBox } from "../components/InputBox";

export const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

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
    <div>
      <header className="mb-5 p-4 text-3xl font-semibold ">
            <Link to="/">The Daily Blog</Link>
      </header>
      <div className="flex flex-col justify-center items-center">
        <div className="text-5xl font-semibold mb-20">Sign Up</div>

        {message && <div className="mb-5 text-lg font-medium">{message}</div>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-10"
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
            type="text"
            placeholder="Password"
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 3)}
          />
          <button
            type="submit"
            className="border-solid border-2 p-5 rounded-4xl w-50"
          >
            Submit
          </button>
        </form>
        <div className="flex mt-2 gap-1">
          <span>Already have an account?</span>
          <Link
            to={"/login"}
            className="text-blue-500 hover:underline tracking-wider"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
