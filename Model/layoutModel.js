const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
  },
  details: {
    type: String,
  },
});

module.exports = mongoose.model("layout", layoutSchema);
