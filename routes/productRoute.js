const router = require("express").Router();
const {
  CreateProduct,
  GetAllProduct,
  SingleProduct,
  UpdateProduct,
  PublishedProduct,
  BuyProduct,
  ProductDelete,
  ProductRatings,
} = require("../Controller/product/productController");
const { SearchProducts } = require("../Controller/product/searchProduct");

// create a product
router.post("/", CreateProduct);
// get a product
router.get("/:_id", SingleProduct);
// delete a product
router.delete("/:_id", ProductDelete);
// update a product
router.patch("/:_id", UpdateProduct);
// get all products
router.get("/", GetAllProduct);
// search products
router.get("/search/:text", SearchProducts);
// get published products
router.get("/published", PublishedProduct);
// buy a product
router.post("/buy-product", BuyProduct);
// product ratings
router.patch("/update-rating/:id", ProductRatings);

module.exports.ProductRoute = router;
