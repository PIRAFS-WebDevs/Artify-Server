const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    item:[ 
        {
        id: {
            type: mongoose.ObjectId,
            ref: "Product",
            required: true,
          },
        quantity: {
          type: Number,
          required: true,
      },
        }
    ]
})

module.exports = mongoose.model("Cart",cartSchema);