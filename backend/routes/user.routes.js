const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, pass , phone} = req.body;


  let checkuser =  await UserModel.find({email:email})


  if(checkuser.length>0){
    res.send({"msg":"User already exist, please login"})
  }
  else{
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: "Something went wrong", error: err.message });
      } else {
        const user = new UserModel({ name, email, pass: hash ,phone});
        await user.save();
        res.send({ msg: "New Users has been registered" });
      }
    });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }

}

});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          let token = jwt.sign({userID:user[0]._id}, "masai");
          res.send({ msg: "Logged in ", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = {
  userRouter,
};
