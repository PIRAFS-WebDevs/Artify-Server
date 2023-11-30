const express = require("express");
const multer = require("multer");
const {
  createProduct,
  GetAllProduct,
  productUpdate,
  ProductDelete,
} = require("../../Controller/product/productController");
const {
  category,
  updateCategory,
  categoriesDelete,
  getCategory,
} = require("../../Controller/categoriesController");
const {
  gettags,
  tagsDelete,
  updatetags,
  tags,
} = require("../../Controller/tagsController");
const {
  layout,
  updatelayout,
  layoutDelete,
  getlayout,
} = require("../../Controller/layoutController");
const {
  AllUser,
  Singleuser,
  UserRoleChange,
  UserDelete,
  SearchUser,
} = require("../../Controller/auth Login/authController");
const { findProducts } = require("../../Controller/product/searchProduct");

const Router = express.Router();

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Photo/productPhoto");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const productUpload = multer({ storage: productStorage });

//All user
//Router.get("/admin/user/all-user", AllUser);
//Change user role Route/API:-
Router.patch("/admin/user/change-role", UserRoleChange);
//single user
Router.get("/admin/user/single-user/:email", Singleuser);
//Admin user Delete Route/API:-
Router.delete("/admin/user/delete-user/:_id", UserDelete);
//Search user Route/API:-
Router.get("/admin/user/all-user/", SearchUser);

// Create product Route/API:-
Router.post(
  "/admin/product/create-product",
  productUpload.array("images"),
  createProduct
);
//Get All Product Data Route/API:-
Router.get("/admin/product/all-product/", findProducts);
//Update product Data Route/API:-
Router.patch("/admin/product/product-update/:_id", productUpdate);
//Delate product Data Route/API:-
Router.delete("/admin/product/product-delate/:_id", ProductDelete);

//Create a Category
Router.post("/admin/category/create-category", category);
//update a category
Router.patch("/admin/category/category-update/:_id", updateCategory);
//delate a category
Router.delete("/admin/category/category-delate/:_id", categoriesDelete);
//show all category
Router.get("/admin/category/all-category", getCategory);

//Create a tags
Router.post("/admin/tags/create-tags", tags);
//update a tags
Router.patch("/admin/tags/tags-update/:_id", updatetags);
//delate a tags
Router.delete("/admin/tags/tags-delate/:_id", tagsDelete);
//show all tags
Router.get("/admin/tags/all-tags", gettags);

//Create a layout
Router.post("/admin/layout/create-layout", layout);
//update a layout
Router.patch("/admin/layout/layout-update/:_id", updatelayout);
//delate a layout
Router.delete("/admin/layout/layout-delate/:_id", layoutDelete);
//show all layout
Router.get("/admin/layout/all-layout", getlayout);

module.exports = Router;
