const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const Router = express.Router;
const commentRouter = Router();
const { BlogModel } = require("../db");

commentRouter.use(express.json());

commentRouter.post("/addComment/:id", userAuth, async function(req,res){
    const userid = req.userid;
    const blogId = req.params.id;
    const { text } = req.body;
    
    try{
        await BlogModel.updateOne({_id: blogId},{$push: {comments: {user: userid, text}}});
        res.status(201).json({
            message: "Commented successfully."
        })
    } catch(err){
        res.status(500).json({
            message: "Error occured while commenting."
        })
    }
})


module.exports = {
    commentRouter
};