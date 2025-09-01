const express = require("express");
const authRouter = express.Router();
const {userAuth} = require("../middleware/userAuth");
const {UserModel} = require("../db");

authRouter.get("/check-auth",userAuth,function(req,res){
    res.status(200).json({
        authenticated: true
    })
})

authRouter.post("/logout",async function(req,res){
    res.clearCookie("token",{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    });
    res.status(200).json({
        message: "Logged out successfully"
    });
});

authRouter.get("/me",userAuth,async function(req,res){
    
    const user = await UserModel.findOne({
        _id: req.userid
    });
    
    res.status(200).json({
        _id: req.userid,
        firstName: user.firstName,
        lastName: user.lastName
    });
})

module.exports = {
    authRouter
};