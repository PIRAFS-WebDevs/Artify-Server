const router = require("express").Router();
const { cart, getCart } = require("../Controller/cartController");

router.post("/", cart);
router.get("/:_id", getCart);

module.exports.CartRoute = router;
