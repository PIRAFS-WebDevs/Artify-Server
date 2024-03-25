const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    products: {
      type: [mongoose.ObjectId],
      ref: "Product",
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      default: "STRIPE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
