const router = require("express").Router();
const { createPayment } = require("../Controller/paymentController");

// create a payment
router.post("/", createPayment);

module.exports.PaymentRoute = router;
