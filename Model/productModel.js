const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        "type": "String",
        "required": true
    },
    name: {
        "type": "String",
        "required": true
    },
    slug: {
        "type": "String",
        "required": true
    },
    description: {
        "type": "String",
    },
    type_id: {
        "type": "String",
    },
    price: {
        "type": "String",
        "required": true
    },
    shop_id: {
        "type": "String",
        "required": true
    },
    sale_price: {
        "type": "String",
        "required": true
    },
    min_price: {
        "type": "String",
        "required": true
    },
    max_price: {
        "type": "String",
        "required": true
    },
    quantity: {
        "type": "String",
        "required": true
    },
    in_stock: {
        "type": "String",
        "required": true
    },
    status: {
        "type": "String",
        "required": true
    },
    image: {
        "type": "String",
        "required": true
    },
    video: {
        "type": "String",
        "required": true
    },
    gallery: {
        "type": "String",
        "required": true
    },
    deleted_at: {
        "type": "String",
        "required": true
    },
    created_at: {
        "type": "String",
        "required": true
    },
    updated_at: {
        "type": "String",
        "required": true
    },
    author_id: {
        "type": "String",
        "required": true
    },
    manufacturer_id: {
        "type": "String",
        "required": true
    }
}
,{timestamps:true})

module.exports = mongoose.model("Product",productSchema);