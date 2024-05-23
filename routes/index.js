const router = require("express").Router();
const { BlogRoute } = require("./blogRoute");
const { CartRoute } = require("./cartRoute");
const { CategoryRoute } = require("./categoryRoute");
const { LayoutRoute } = require("./layoutRoute");
const { PaymentRoute } = require("./paymentRoute");
const { ProductRoute } = require("./productRoute");
const { RecommendedRoute } = require("./recommendedRoute");
const { TagRoute } = require("./tagRoute");
const { UserRoute } = require("./userRoute");

router.use("/categories", CategoryRoute);
router.use("/layouts", LayoutRoute);
router.use("/tags", TagRoute);
router.use("/users", UserRoute);
router.use("/products", ProductRoute);
router.use("/cart", CartRoute);
router.use("/payment", PaymentRoute);
router.use("/blogs", BlogRoute);
router.use("/recommended", RecommendedRoute);

module.exports = router;
