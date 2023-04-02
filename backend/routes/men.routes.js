const express = require("express");
const { MenModel } = require("../models/men.model");

const menRouter = express.Router();

menRouter.post("/create",async(req,res)=>{
    const payload = req.body;
    // let men = new MenModel(payload)
   await MenModel.insertMany(payload)
    // await men.save()
    res.send({"msg":"New data has been registered"})
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
    
    
    menRouter.get("/filteredprice",async(req,res)=>{
        console.log(req.query)
        let [ab,bb] =req.query.price
        let a = +ab
        let b = +bb

        let data = await MenModel.find({$and:[{price:{$gte:a}},{price:{$lte:b}}]})
            res.send(data)

        })

module.exports = {
   menRouter,
  };