const mongoose = require("mongoose")

const cartSchema  = mongoose.Schema({
image:{type:String,required:true},
title:{type:String,required:true},
discount:{type:String,required:true},
price:{type:Number,required:true},
quantity:{type:Number,required:true},
user:{type:String,required:true},
},{
    versionKey:false
})

const CartModel = mongoose.model("cartproduct",cartSchema)

module.exports = {
    CartModel
}