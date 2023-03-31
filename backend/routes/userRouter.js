const express = require("express");
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
const userRouter = express.Router();
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



// register user here

userRouter.post("/register", async (req, res) => {
  const { name, email, password , phone} = req.body;


  let checkuser =  await UserModel.find({email:email})


  if(checkuser.length>0){
    res.send({msg:"User already exist, please login"})
  }
  else{
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: "Something went wrong", error: err.message });
      } else {
        const user = new UserModel({ name, email, password: hash ,phone});
        await user.save();
        res.send({ "msg": "New Users has been registered" });
      }
    });
  } catch (err) {
    res.send({ "msg": "Something went wrong", error: err.message });
  }

}

});

// log-in routes here//

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email })
    console.log(user);

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        console.log(err)
        console.log(password)



        if (result) {

          let token = jwt.sign({"userID":user[0]._id}, "mahendra",{expiresIn:"3hr"});

          res.status(200).send({ "msg": "Logged in successfull ", "token": token });
        } else {
          res.status(400).send({msg:"Wrong Credentials"})
        }
        
      });
    } else {
      res.send({msg:"user not found"});
    }
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = {
  userRouter,
};
