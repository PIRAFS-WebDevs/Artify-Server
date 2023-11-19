const express = require("express");
const {
  userSignup,
  userLogin,
  ChangePassword,
} = require("../../Controller/auth Login/authController");
const { userCheckToken } = require("../../middleware/jsonwebtoken");
const { cart } = require("../../Controller/cartController");
const {
  ProductShowForUser,
  SingleProduct,
  BuyProduct,
} = require("../../Controller/product/productController");
const { getCategory } = require("../../Controller/categoriesController");
const Router = express.Router();

//User Login Route/API
Router.post("/signup", userSignup);
// Router.post("/login",userLogin);

//User Change Password Route/API:-
Router.post("/user/change-pass", ChangePassword);

//Cart Product Route/API:-
Router.post("/user/cart", cart);
//User Proced to pay Route:-
Router.get("/user/proced-to-pay", BuyProduct);

//Signle Product Route/API:-
Router.get("/product/:prod_id", SingleProduct);
//All Product Route/API:-
Router.get("/user/all-product", ProductShowForUser);

//All category show Route:-
Router.get("/all-category", getCategory);

module.exports = Router;
