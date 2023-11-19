const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
name:{
        type:String,
        require: true,
        unique:true,

    },
    email:{
        type:String,
        require:true,
        unique:true,

    },
    phoneNumber:{
        type:String,

    },
    countryName:{
        type:String,
    },
    address:{
        type:String,
    },
    password:{
        type:String,
    },
    imgURL:{
        type:String,
        
    },
    role:{
        type:String,
        default:"User",
    }
},
{ timestamps: true }
)

module.exports= mongoose.model("User",userSchema);