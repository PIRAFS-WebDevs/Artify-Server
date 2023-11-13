const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    details:{
        type:String,
        require:true,

    },
    image:{
        type:String,

    },
    slug:{
        type:String,

    }
})

module.exports = mongoose.model("category",categoriesSchema);