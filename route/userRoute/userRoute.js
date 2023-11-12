const express = require("express");
const { userSingup, userLogin } = require("../../Controller/auth Login/authController");
const { userCheckToken } = require("../../middleware/jsonwebtoken");
const { cart } = require("../../Controller/cartController");
const { ProductShowForUser } = require("../../Controller/product/productController");
const Router = express.Router();

//User Login Route/API
Router.post("/signup",userSingup);
Router.post("/login",userLogin);


//User Change 


//Cart Product Route/API:-
Router.post("/cart",cart)

//Signle Product Route/API:-
//Router.podt

//All Product Route/API:-
Router.get("/user/all-product",ProductShowForUser)







module.exports =Router;