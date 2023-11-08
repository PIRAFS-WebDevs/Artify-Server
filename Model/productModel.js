const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id:{
        type:String,
        require:true,
    },
    product_name:{
        type:String,
        require:true,
    },
    product_price:{
        type:String,
        require:true,
    },
    product_owner:{
        type:String,
        require:true,
    }

},{timestamps:true})

module.exports = mongoose.model("Product",productSchema);