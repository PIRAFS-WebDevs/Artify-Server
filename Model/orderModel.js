const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
}) 