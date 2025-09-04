const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const Router = express.Router;
const { UserModel } = require("../db");
const { userAuth } = require("../middleware/userAuth");
const { JWT_USER_SECRET } = require("../config");

const userRouter = Router();
userRouter.use(express.json());
userRouter.use(cookieParser());

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;

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
      message: "Signed Up Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      message: "This user already exists.",
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

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
