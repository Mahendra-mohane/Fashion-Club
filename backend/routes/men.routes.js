const express = require("express");
const { MenModel } = require("../models/men.model");

const menRouter = express.Router();

menRouter.post("/create",async(req,res)=>{
    const payload = req.body;
    let men = new MenModel(payload)
    await men.save()
    res.send({"msg":"New data registered"})
})

menRouter.get("/get",async(req,res)=>{
  
let data = await MenModel.find()
    res.send(data)
})


menRouter.get("/getbyprice",async(req,res)=>{
    console.log(req.query)
    let data = await MenModel.find().sort(req.query)
        res.send(data)
    })
    
    


module.exports = {
   menRouter,
  };