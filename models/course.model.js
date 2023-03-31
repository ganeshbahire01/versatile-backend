const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

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
