const express = require("express");
const { userSingup, userLogin } = require("../../Controller/auth Login/authController");
const { userCheckToken } = require("../../middleware/jsonwebtoken");
const { cart } = require("../../Controller/cartController");
const Router = express.Router();

//User Login Route/API
Router.post("/signup",userSingup);
Router.post("/login",userLogin);


//Cart Product Route/API:-
Router.post("/cart",cart)

//Signle Product Route/API:-
//Router.podt







module.exports =Router;