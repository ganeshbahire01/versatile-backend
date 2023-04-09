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

module.exports = qnaRouter;
