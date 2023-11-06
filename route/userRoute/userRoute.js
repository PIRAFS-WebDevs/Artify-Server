const express = require("express");
const { userSingup, userLogin } = require("../../Controller/auth Login/authController");
const Router = express.Router();

Router.post("/signup",userSingup);
Router.post("/login",userLogin);







module.exports =Router;