const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    full_name:{
        type:String,
        require:true,
    },
    user_name:{
        type:String,
        require: true,
        unique:true,

    },
    email:{
        type:String,
        require:true,

    },
    phoneNumber:{
        type:String,
        require:true,

    },
    countryName:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},
{ timestamps: true }
)

module.exports= mongoose.model("User",userSchema);