const express = require("express");
const BlogModel = require("../models/blog.model");
const jwt = require("jsonwebtoken");

const blogRouter = express.Router();

// Create

blogRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const blog = new BlogModel(payload);
    await blog.save();
    res.status(200).send({ message: "Comment is posted" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Read
blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.status(200).send(blogs);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Update
blogRouter.patch("/update/:id", async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated blog");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Delete
blogRouter.delete("/delete/:id", async (req, res) => {
  const blog = await BlogModel.findByIdAndDelete(req.params.id);
  res.send("Delete blog");
  try {
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = blogRouter;
