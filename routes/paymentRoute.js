const router = require("express").Router();
const {
  createPayment,
  getPaymentByEmail,
  getAllPayment,
} = require("../Controller/paymentController");

// create a payment
router.post("/", createPayment);
router.get("/", getAllPayment);
router.get("/:email", getPaymentByEmail);

module.exports.PaymentRoute = router;
