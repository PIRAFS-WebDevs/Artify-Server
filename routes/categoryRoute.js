const router = require("express").Router();
const {
  category,
  updateCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
} = require("../Controller/categoriesController");

// create a Category
router.post("/", category);
// update a category
router.patch("/:_id", updateCategory);
//delate a category
router.delete("/:_id", deleteCategory);
// get all categories
router.get("/", getCategories);
// get category by id
router.get("/:_id", getCategoryById);

module.exports.CategoryRoute = router;
