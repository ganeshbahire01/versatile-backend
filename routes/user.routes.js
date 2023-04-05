const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const adminauth = require("../middlewares/adminauth.middleware");

userRouter.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, mobile, course, score } =
    req.body;
  try {
    const isEmail = await UserModel.find({ email: email });
    if (isEmail.length > 0) {
      res.status(400).send({ message: "Email already exists" });
    } else {
      bcrypt.hash(password, 4, async (err, hash) => {
        const payload = {
          firstname,
          lastname,
          email,
          password: hash,
          mobile,
          isLogin: false,
          course,
          score,
        };
        const user = new UserModel(payload);
        await user.save();
        res.status(200).send({ message: "Registration successful" });
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email: email });
    if (user.length > 0) {
      if (user[0].isLogin) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          //         if(user[0].isAdmin&&result){
          //              res.status(200).send({
          //             message: "Login successful",
          //             token: (token = jwt.sign({ userID: user[0]._id }, "somesh")),
          //             owner:"edith"
          //           });
          //         }else
          if (result) {
            res.status(200).send({
              message: "Login successful",
              token: (token = jwt.sign({ userID: user[0]._id }, "somesh")),
              owner: user[0],
            });
          } else {
            res.status(400).send({ message: "Invalid password" });
          }
        });
      } else {
        res
          .status(400)
          .send({ message: "Please wait registration is in process" });
      }
    } else {
      res.status(400).send({ message: "Invalid email" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// GET ALL USERS
userRouter.get("/allusers", async (req, res) => {
  try {
    let users = await UserModel.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// DELETE User only by admin

userRouter.delete("/delete/:id", async (req, res) => {
  try {
    let user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Delete Successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// To approve the user account patching the isLogin status (admin authorization)

userRouter.patch("/approve/:id", adminauth, async (req, res) => {
  try {
    let user = await UserModel.findByIdAndUpdate(req.params.id, {
      isLogin: true,
    });
    res.status(200).send("Update Successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = userRouter;
