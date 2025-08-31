const express = require("express");
const authRouter = express.Router();
const {userAuth} = require("../middleware/userAuth");

authRouter.get("/check-auth",userAuth,function(req,res){
    res.status(200).json({
        authenticated: true
    })
})

module.exports = {
    authRouter
};