const mongoose = require("mongoose")

const cartSchema  = mongoose.Schema({
image:{type:String},
title:{type:String},
discount:{type:String},
price:{type:Number},
quantity:{type:Number},
user:{type:String},
})

const CartModel = mongoose.model("cartproduct",cartSchema)

module.exports = {
    CartModel
}