const express = require("express");
const { createProduct, GetAllProduct } = require("../../Controller/product/productController");
const Router = express.Router();




// Create product Route/API:-
Router.post("/admin/create-product",createProduct);

//Get All Product Data Route/API:-
Router.get("/admin/all-product", GetAllProduct)



module.exports =Router