const express=require("express")
let jwt = require("jsonwebtoken")

let authorization = (req, res, next)=>{
    const token = req.headers.authorization //.split(" ")[1]
    console.log(token)
    if(token){
        const decoded = jwt.verify(token, "mahendra")

        if(decoded){
            console.log(decoded)
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }else{
            res.status(400).send({"msg":"please login first"})
        }
    }else{
        res.send({msg:"please login first"})
    }
}

module.exports = {authorization};
