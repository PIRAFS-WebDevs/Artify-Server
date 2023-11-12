const express = require("express");
const { createProduct, GetAllProduct } = require("../../Controller/product/productController");
const Router = express.Router();




// Create product Route/API:-
Router.post("/admin/product/create-product",createProduct);

//Get All Product Data Route/API:-
Router.get("/admin/product/all-product", GetAllProduct);

//Update product Data Route/API:-
Router.get("/admin/product/product-update")



module.exports =Router