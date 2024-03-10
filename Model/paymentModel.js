const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("payment", paymentSchema);
