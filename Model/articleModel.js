const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  id: Number,
  name: String,
  date: String,
  category: String,
  title1: String,
  details1: String,
  title2: String,
  details2: String,
});

module.exports = mongoose.model("Blog", blogSchema);
