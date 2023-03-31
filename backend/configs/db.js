const mongoose = require('mongoose');

const express=require("express");

mongoose.set('strictQuery', false);

require("dotenv").config()

const connection  =async()=>{await mongoose.connect(process.env.mongoURL)
}

module.exports = {connection}