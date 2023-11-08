const express = require("express");
const { userSingup, userLogin } = require("../../Controller/auth Login/authController");
const { userCheckToken } = require("../../middleware/jsonwebtoken");
const Router = express.Router();

//User Login Route/API
Router.post("/signup",userSingup);
Router.post("/login",userLogin);


//Signle Product Route/API:-
//Router.podt







module.exports =Router;