const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    products: {
      type: [mongoose.ObjectId],
      ref: "Product",
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    subtotal: {
      type: String,
      required: true,
    },
    tax: {
      type: String,
      required: true,
    },
    total_item: {
      type: String,
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
