const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    layout: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    sale_price: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Published", "Draft"],
    },
    images: {
      type: [String],
    },
    activity: {
      ratings: [
        {
          user_id: {
            type: mongoose.ObjectId,
            ref: "User",
          },
          number: {
            type: Number,
          },
        },
      ],
      comment: [
        {
          user_id: {
            type: mongoose.ObjectId,
            ref: "User",
          },
          text: {
            type: String,
          },
        },
      ],
    },
    preview_url: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
