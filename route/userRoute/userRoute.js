const express = require("express");
const { userSingup, userLogin, ChangePassword } = require("../../Controller/auth Login/authController");
const { userCheckToken } = require("../../middleware/jsonwebtoken");
const { cart } = require("../../Controller/cartController");
const { ProductShowForUser } = require("../../Controller/product/productController");
const Router = express.Router();

//User Login Route/API
Router.post("/signup",userSingup);
Router.post("/login",userLogin);


//User Change Password Route/API:-
Router.post("/user/change-pass/:_id",ChangePassword)


//Cart Product Route/API:-
Router.post("/user/cart/:_id",cart)

//Signle Product Route/API:-
//Router.get("/product/:prod_id")

//All Product Route/API:-
Router.get("/user/all-product",ProductShowForUser)







module.exports =Router;