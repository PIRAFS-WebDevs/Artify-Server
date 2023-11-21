const express = require("express");
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
const Router = express.Router();

//All user
//Router.get("/admin/user/all-user", AllUser);
//Change user role Route/API:-
Router.patch("/admin/user/change-role",UserRoleChange);
//single user
Router.get("/admin/user/single-user/:email", Singleuser);
//Admin user Delete Route/API:-
Router.delete("/admin/user/delete-user/:_id",UserDelete);
//Search user Route/API:-
Router.get("/admin/user/all-user/:text",SearchUser);



// Create product Route/API:-
Router.post("/admin/product/create-product", createProduct);
//Get All Product Data Route/API:-
Router.get("/admin/product/all-product", GetAllProduct);
//Update product Data Route/API:-
Router.get("/admin/product/product-update/:_id", productUpdate);
//Delate product Data Route/API:-
Router.delete("/admin/product/product-delate/:_id", ProductDelete);

//Create a Category
Router.post("/admin/category/create-category", category);
//update a category
Router.post("/admin/category/category-update/:_id", updateCategory);
//delate a category
Router.post("/admin/category/category-delate/:_id", categoriesDelete);
//show all category
Router.get("/admin/category/all-category", getCategory);

//Create a tags
Router.post("/admin/tags/create-tags", tags);
//update a tags
Router.post("/admin/tags/tags-update/:_id", updatetags);
//delate a tags
Router.post("/admin/tags/tags-delate/:_id", tagsDelete);
//show all tags
Router.get("/admin/tags/all-tags", gettags);

//Create a layout
Router.post("/admin/layout/create-layout", layout);
//update a layout
Router.post("/admin/layout/layout-update/:_id", updatelayout);
//delate a layout
Router.post("/admin/layout/layout-delate/:_id", layoutDelete);
//show all layout
Router.get("/admin/layout/all-layout", getlayout);

module.exports = Router;
