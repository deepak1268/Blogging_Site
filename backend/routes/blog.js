const express = require("express");
const Router = express.Router;
const { BlogModel, UserModel } = require("../db");
const { userAuth } = require("../middleware/userAuth");
const blogRouter = Router();

blogRouter.use(express.json());

blogRouter.post("/createBlog", userAuth, async function (req, res) {
  const { title, content } = req.body;
  const userid = req.userid;
  try {
    await BlogModel.create({
      title,
      content,
      author: userid,
    });

    res.status(200).json({
      message: "Blog Created Successfully",
    });
  } catch (err) {
    res.status(401).json({
      message: "Some Error Occured",
    });
  }
});

blogRouter.put("/editBlog/:id", userAuth, async function (req, res) {
  // we need to update/edit blog

  const userid = req.userid;
  const _id = req.params.id; // this is the blogId
  const { title, content } = req.body;

  try {
    await BlogModel.updateOne(
      {
        author: userid,
        _id,
      },
      {
        $set: { title, content },
      }
    );
  } catch (err) {
    res.status(400).json({
      message: "Some error occured while updating",
    });
  }

  res.status(400).json({
    message: "Blog Updated Successfully",
  });
});

blogRouter.delete("/deleteBlog/:id", userAuth, async function (req, res) {
  const userid = req.userid;
  const _id = req.params.id;

  try {
    await BlogModel.deleteOne({
      _id,
      author: userid,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error Occured while deleting",
    });
  }

  res.status(200).json({
    message: "Blog Deleted Successfully",
  });
});

blogRouter.get("/userBlogs", userAuth, async function (req, res) {
  const userid = req.userid;

  const blogs = await BlogModel.find({
    author: userid,
  });

  res.status(200).json({
    blogs,
  });
});

blogRouter.get("/blogs",async function(req,res){
  try{
    const blogs = await BlogModel.find();
    res.status(200).json({blogs});
  } catch(err){
    res.status(500).json({
      message: "Error Occured"
    })
  }
})

module.exports = {
  blogRouter,
};
