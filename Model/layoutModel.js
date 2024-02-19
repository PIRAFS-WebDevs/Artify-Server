const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
});

module.exports = mongoose.model("layout", layoutSchema);
