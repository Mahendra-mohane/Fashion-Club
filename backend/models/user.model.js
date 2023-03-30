const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const userSchema  = mongoose.Schema({
name:String,
email:String,
phone:Number,
password:String

})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}