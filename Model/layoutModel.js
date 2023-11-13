const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    icon:{
        type:String,
    }
})

module.exports = mongoose.model("layout",layoutSchema)