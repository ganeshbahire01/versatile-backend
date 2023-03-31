const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    module: String,
    topic: String,
    points: String,
    content: String,
  },
  {
    versionKey: false,
  }
);

const CourseModel = mongoose.model("course", CourseSchema);

module.exports = CourseModel;

/*

{

   api/topic?q=frontend

_id: "randome3435435"

// module : "web developer"

// topic : "Frontend"

// points : "Welcome to react"

// content: "next js is a framework of react"

}


*/
