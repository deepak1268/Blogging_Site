import { useState } from "react";
import axios from "axios"

export const Signup = () => {
    const [form,setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    };

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await axios.post("http://localhost:3000/api/v1/user/signup",form);
            alert("Signup Successful");
        } catch(err){
            console.log(err);
            alert("Try Again")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="firstName" type="text" placeholder="First Name" onChange={handleChange}/>
                <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange}/>
                <input name="email" type="text" placeholder="Email" onChange={handleChange}/>
                <input name="password" type="text" placeholder="Password" onChange={handleChange}/>
                <button type="sumbit">Submit</button>
            </form>
        </div>
    )
}