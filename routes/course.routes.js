const express = require("express");
const CourseModel = require("../models/course.model.js");

const courseRoute = express.Router();

courseRoute.get("/topic", async (req, res) => {
  const { module, topic, points } = req.query;
  const query = {};
  if (module) {
    query.module = module;
  }
  if (topic) {
    query.topic = topic;
  }
  if (points) {
    query.points = points;
  }
  try {
    const data = await CourseModel.find(query);
    res.status(200).send({ message: data });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

courseRoute.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let data = await CourseModel.findById({ _id: id });
    res.status(200).send({ message: data });
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
});
courseRoute.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const data = new CourseModel(payload);
    await data.save();
    res.status(200).send({ message: "New data has been added", result: data });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

courseRoute.patch("/update", async (req, res) => {
  const { module, topic, points } = req.query;
  try {
    if (!module && !topic && !points) {
      return res
        .status(500)
        .send({ message: "Please provide at least one parameter" });
    }
    const query = {};
    if (module) query.module = module;
    if (topic) query.topic = topic;
    if (points) query.points = points;
    const result = await CourseModel.updateOne(query, req.body);
    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "No matching documents found" });
    }

    res.status(200).send({ message: "Data updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

courseRoute.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await CourseModel.findByIdAndUpdate({ _id: id }, payload);
    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "No matching documents found" });
    }

    res
      .status(200)
      .send({ message: `${result.deletedCount} documents have been updated` });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while updating the data" });
  }
});

courseRoute.delete("/delete", async (req, res) => {
  const { module, topic, points } = req.query;

  try {
    if (!module && !topic && !points) {
      return res
        .status(500)
        .send({ message: "Please provide at least one parameter" });
    }

    const query = {};
    if (module) query.module = module;
    if (topic) query.topic = topic;
    if (points) query.points = points;

    const result = await CourseModel.deleteMany(query);

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "No matching documents found" });
    }

    res
      .status(200)
      .send({ message: `${result.deletedCount} documents have been deleted` });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while deleting the data" });
  }
});

courseRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await CourseModel.findByIdAndDelete({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "No matching documents found" });
    }
    res
      .status(200)
      .send({ message: `${result.deletedCount} documents have been deleted` });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while deleting the data" });
  }
});

module.exports = courseRoute;
