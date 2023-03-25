const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    category: String,
    title: String,
    content: String,
    author: String,
    views: Number,
    date: { type: Date, default: Date.now },
    Comment: Array,
  },
  {
    versionKey: false,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
