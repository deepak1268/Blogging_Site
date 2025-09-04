const express = require("express");
const Router = express.Router;
const { BlogModel, UserModel } = require("../db");
const { userAuth } = require("../middleware/userAuth");
const blogRouter = Router();

blogRouter.use(express.json());

blogRouter.post("/", userAuth, async function (req, res) {
  const { title, content, tags, category } = req.body;
  const userid = req.userid;
  try {
    await BlogModel.create({
      title,
      content,
      author: userid,
      tags,
      category,
    });

    res.status(201).json({
      message: "Blog created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occured while creating blog.",
    });
  }
});

blogRouter.put("/:id", userAuth, async function (req, res) {
  // we need to update/edit blog

  const _id = req.params.id; // this is the blogId
  const { title, content, tags, category } = req.body;

  try {
    await BlogModel.updateOne(
      {
        _id,
      },
      {
        $set: { title, content, tags, category },
      }
    );
    res.status(200).json({
      message: "Blog successfully updated.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occured while updating.",
    });
  }
});

blogRouter.delete("/:id", userAuth, async function (req, res) {
  const _id = req.params.id;

  try {
    await BlogModel.deleteOne({
      _id,
    });
    res.status(200).json({
      message: "Blog deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occured while deleting.",
    });
  }
});

blogRouter.get("/user", userAuth, async function (req, res) {
  const userid = req.userid;

  try {
    const blogs = await BlogModel.find({
      author: userid,
    }).populate("author", "firstName lastName");

    res.status(200).json({
      blogs,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occured while fetching blog.",
    });
  }
});

blogRouter.get("/:id", async function (req, res) {
  const blogid = req.params.id;
  try {
    const blog = await BlogModel.findOne({
      _id: blogid,})
      .populate("author", "firstName lastName")
      .populate("comments.user", "firstName lastName");
    res.status(200).json({ blog });
  } catch (err) {
    res.status(500).json({
      message: "Error occured while fetching blog.",
    });
  }
});

blogRouter.get("/", async function (req, res) {
  try {
    const blogs = await BlogModel.find()
      .populate("author", "firstName lastName")
      .sort({createdAt: -1});
    res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).json({
      message: "Error occured while fetching blogs.",
    });
  }
});

module.exports = {
  blogRouter,
};
