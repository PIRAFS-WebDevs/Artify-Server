const express = require("express");
const multer = require("multer");
const {
  createProduct,
  GetAllProduct,
  productUpdate,
  ProductDelete,
} = require("../../Controller/product/productController");

const {
  gettags,
  tagsDelete,
  updatetags,
  tags,
  getTagById,
} = require("../../Controller/tagsController");
const {
  layout,
  updatelayout,
  layoutDelete,
  getlayout,
  getLayoutById,
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

module.exports = Router;
