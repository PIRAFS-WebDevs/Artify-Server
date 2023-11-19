const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    categories:{
        type:[String],
    },
    tags:{
        type:[String],
    },
    layout:{
        type:String,
    },
    description: {
        type: String,
    },
    type_id: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    sale_price: {
        type: String,
    },
    max_price: {
        type: String,
    },  
    in_stock: {
        type: String,
    },
    status: {
        type: String,
        enum:["Published","Draft"]
    },
    image: {
        type: String
    }, activity: {
        ratings: [{
            user_id: {
                type: mongoose.ObjectId,
                ref: "User",
            },
            number:{
                type:Number,
            }
        }
        ],
        comment:[
            {
                user_id: {
                    type: mongoose.ObjectId,
                    ref: "User",
                },
                text:{
                    type:String,
                }  
            }
        ]

    },
    preview_url:{
        type:String,
    }
}
    , { timestamps: true })

module.exports = mongoose.model("Product", productSchema);