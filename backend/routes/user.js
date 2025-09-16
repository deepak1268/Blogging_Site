const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const Router = express.Router;
const { UserModel } = require("../db");
const { userAuth } = require("../middleware/userAuth");
const { JWT_USER_SECRET } = require("../config");
const { z } = require("zod"); 

const userRouter = Router();
userRouter.use(express.json());
userRouter.use(cookieParser());

userRouter.post("/signup", async function (req, res) {

  // input validation
  const requiredBody = z.object({
    firstName: z
      .string()
      .min(3,{message: "First name must be at least 3 characters long."})
      .max(20,{message: "First name cannot be more than 20 characters long."}),
    lastName: z
      .string()
      .min(3,{message: "Last name must be at least 3 characters long."})
      .max(20,{message: "Last name cannot be more than 20 characters long."}),
    email: z
      .string()
      .email({message: "Not a valid email."}),
    password : z
      .string()
      .min(6,{message: "Password must be at least 6 characters long."})
      .max(20,{message: "Password cannot be more than 20 characters long."})
      .refine((password) => /[A-Z]/.test(password),{
        message: "Password must contain at least one uppercase letter."
      })
      .refine((password) => /[a-z]/.test(password),{
        message: "Password must contain at least one lowercase letter."
      })
      .refine((password) => /[0-9]/.test(password),{
        message: "Password must contain at least one digit."
      })
      .refine((password) => /[!@#$%^&*]/.test(password),{
        message: "Password must contain at least one special letter."
      })
  })

  const result = requiredBody.safeParse(req.body);
  if (!result.success){
    return res.status(400).json({
      errors: result.error.issues.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    });
  }

  const { email, password, firstName, lastName } = result.data;

  // first we make the checks if the userame ans password are valid using zod library

  // now we check if the user already exists
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    await UserModel.create({
      email,
      password: hashedPass,
      firstName,
      lastName,
    });
    return res.status(201).json({
      message: "Signup Successful",
    });
  } catch (err) {
    return res.status(400).json({
      message: "This user already exists.",
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  
  // input validation
  const requiredBody = z.object({
    email: z.string().email({message: "Not a valid email."}),
    password: z.string().min(1,{message: "Password is required."})
  })
  const result = requiredBody.safeParse(req.body);
  if(!result.success){
    return res.status(400).json({
      errors: result.error.issues.map(err => ({
        field: err.path[0],
        message: err.message}))
    })
  }
  
  const { email, password } = result.data;

  // check is this user exists
  const user = await UserModel.findOne({
    email,
  });

  if (user) {
    // now since the user exists we check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password); // this will be either true or false
    if (passwordMatch) {
      // since the user is valid now we issue token using jwt
      const token = jwt.sign(
        {
          userid: user._id,
        },
        JWT_USER_SECRET,
        {
          expiresIn: "1h"
        }
      );
      res.cookie("token",token,{
        httpOnly: true,
        secure:true,
        sameSite: "None",
        path: "/",
        maxAge: 60*60*1000
      });
      res.status(200).json({
        message: "Login Successful"
      })
    } else {
      // if the password does not match we simply return that Incorrect Credentials
      return res.status(400).json({
        message: "Incorrect Credentials",
      });
    }
  } else {
    // now the user does not exist since we could not find the provided mail in the db
    return res.status(400).json({
      message: "User does not exist.",
    });
  }
});

module.exports = {
  userRouter,
};
