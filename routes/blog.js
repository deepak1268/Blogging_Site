const express = require('express');
const Router = express.Router;
const{BlogModel} = require('../db');
const {userAuth} = require('../middleware/userAuth')
const blogRouter = Router();

blogRouter.use(express.json());

blogRouter.post("/createBlog",userAuth,async function(req,res){
    const {title,content} = req.body;
    const userid = req.userid;
    try{
        await BlogModel.create({
            title,
            content,
            author: userid
        });

        res.status(200).json({
            message: "Blog Created Successfully"
        })
    } catch(err){
        res.status(401).json({
            message: "Some Error Occured"
        })
    }

});

module.exports = {
    blogRouter
}