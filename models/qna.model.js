const mongoose = require("mongoose");

const QuaSchema = mongoose.Schema(
  {
    Question: "String",
    Ans: Array,
  },
  {
    versionKey: false,
  }
);

const QnaModel = mongoose.model("qna", QuaSchema);

module.exports = QnaModel;
