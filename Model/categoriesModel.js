const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
});

module.exports = mongoose.model("category", categoriesSchema);
