const express = require("express");
const Router = express.Router;
const { BlogModel, UserModel } = require("../db");
const { userAuth } = require("../middleware/userAuth");
const {cloudinary} = require("../config");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const blogRouter = Router();
blogRouter.use(express.json());

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_images",
    allowed_formats: ["jpg","png","jpeg","webp"]
  }
});
const upload = multer({storage});

blogRouter.post("/", userAuth, upload.single("image"), async function (req, res) {
  const { title, content, tags, category } = req.body;
  const userid = req.userid;
  try {
    await BlogModel.create({
      title,
      content,
      author: userid,
      tags,
      category,
      imageURL: req.file ? req.file.path : null
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

blogRouter.put("/:id", userAuth, upload.single("image"), async function (req, res) {
  // we need to update/edit blog

  const _id = req.params.id; // this is the blogId
  const { title, content, tags, category } = req.body;

  try {
    const updateData = { title, content, tags, category };

    if (req.file) {
      updateData.imageURL = req.file.path;
    }

    await BlogModel.updateOne({ _id }, { $set: updateData });
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
