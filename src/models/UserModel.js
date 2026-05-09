const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    role:{
        type:String,
        enum:["customer","admin" ],
        default:"customer"
    },
},{
    timestamps:true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;