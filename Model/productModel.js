const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
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
    shop_id: {
        type: String,
        required: true
    },
    sale_price: {
        type: String,
        required: true
    },
    min_price: {
        type: String,
        required: true
    },
    max_price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    in_stock: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
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

    }
}
    , { timestamps: true })

module.exports = mongoose.model("Product", productSchema);