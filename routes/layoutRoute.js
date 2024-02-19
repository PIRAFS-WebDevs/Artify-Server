const router = require("express").Router();
const {
  layout,
  updateLayout,
  deleteLayout,
  getLayouts,
  getLayoutById,
} = require("../Controller/layoutController");

// create a layout
router.post("/", layout);
// update a layout
router.patch("/:_id", updateLayout);
// delate a layout
router.delete("/:_id", deleteLayout);
//get all layouts
router.get("/", getLayouts);
// get layout by id
router.get("/:_id", getLayoutById);

module.exports.LayoutRoute = router;
