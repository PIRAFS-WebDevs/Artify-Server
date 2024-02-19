const router = require("express").Router();
const { CategoryRoute } = require("./categoryRoute");
const { LayoutRoute } = require("./layoutRoute");
const { TagRoute } = require("./tagRoute");

router.use("/categories", CategoryRoute);
router.use("/layouts", LayoutRoute);
router.use("/tags", TagRoute);

module.exports = router;
