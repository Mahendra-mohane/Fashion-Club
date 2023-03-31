const mongoose = require("mongoose")

const menSchema  = mongoose.Schema({
image:{type:String,required:true},
title:{type:String,required:true},
discount:{type:String,required:true},
price:{type:Number,required:true}
})

const MenModel = mongoose.model("men",menSchema)

module.exports = {
    MenModel
}