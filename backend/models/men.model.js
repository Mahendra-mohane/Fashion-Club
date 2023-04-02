const mongoose = require("mongoose")

const menSchema  = mongoose.Schema({
image:{type:String},
title:{type:String},
discount:{type:String},
price:{type:String},
})

const MenModel = mongoose.model("men",menSchema)

module.exports = {
    MenModel
}