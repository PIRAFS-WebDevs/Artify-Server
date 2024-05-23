const mongoose = require("mongoose");

const recommendedSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    category: { type: String, required: true },
    details: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommended", recommendedSchema);
