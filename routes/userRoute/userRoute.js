const express = require("express");
const { cart, getCart } = require("../../Controller/cartController");
const {
  ProductShowForUser,
  SingleProduct,
  BuyProduct,
} = require("../../Controller/product/productController");
const { findProducts } = require("../../Controller/product/searchProduct");
const Router = express.Router();

//Cart Product Route/API:-
Router.post("/user/cart", cart);
//user get cart Route/API:-
Router.get("/user/get-cart/:_id", getCart);
//User Proced to pay Route:-
Router.get("/user/proced-to-pay", BuyProduct);

//Signle Product Route/API:-
Router.get("/product/:_id", SingleProduct);
//All Product Route/API:-
Router.get("/user/all-product", ProductShowForUser);
//search product
Router.post("/search-product", findProducts);

module.exports = Router;
