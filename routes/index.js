const router = require("express").Router();
const { CartRoute } = require("./cartRoute");
const { CategoryRoute } = require("./categoryRoute");
const { LayoutRoute } = require("./layoutRoute");
const { ProductRoute } = require("./productRoute");
const { TagRoute } = require("./tagRoute");
const { UserRoute } = require("./userRoute");

router.use("/categories", CategoryRoute);
router.use("/layouts", LayoutRoute);
router.use("/tags", TagRoute);
router.use("/users", UserRoute);
router.use("/products", ProductRoute);
router.use("/cart", CartRoute);

module.exports = router;