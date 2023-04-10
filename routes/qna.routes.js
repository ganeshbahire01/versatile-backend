const express = require("express");
const QnaModel = require("../models/qna.model");

const qnaRouter = express.Router();

qnaRouter.post("/add", async (req, res) => {
  try {
    let qna = new QnaModel(req.body);
    await qna.save();
    res.status(200).send("QNA added successfully");
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
});

qnaRouter.get("/get", async (req, res) => {
  const page = req.query.page;
  const pageNumber = page || 1;
  const pageLimit = 1;
  const pagination = pageNumber * pageLimit - pageLimit || 0;
  try {
    let qna = await QnaModel.find({}).skip(pagination).limit(pageLimit);
    res.status(200).send(qna);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
});
qnaRouter.get("/all", async (req, res) => {
  try {
    let qna = await QnaModel.find({});
    res.status(200).send(qna);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
});
qnaRouter.delete("/:id", async (req, res) => {
  try {
    let user = await QnaModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Delete Successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = qnaRouter;
