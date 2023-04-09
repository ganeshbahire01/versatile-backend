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
  try {
    let qna = await QnaModel.find({});
    res.status(200).send(qna);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = qnaRouter;