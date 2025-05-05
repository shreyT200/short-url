const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    require:true,
    unique:true,
},
password:{
    type:String,
    require:true,
},
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
},


}, {timestamps: true})

const User= mongoose.model("user", userSchema)
module.exports = User;