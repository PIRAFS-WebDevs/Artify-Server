const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    slug:{
        type:String
    }
})

module.exports = mongoose.model("tags",tagsSchema);