const express = require("express");
const { createProduct, GetAllProduct, productUpdate, ProductDelete } = require("../../Controller/product/productController");
const { category, updateCategory, categoriesDelete, getCategory } = require("../../Controller/categoriesController");
const { gettags, tagsDelete, updatetags, tags } = require("../../Controller/tagsController");
const { layout, updatelayout, layoutDelete, getlayout } = require("../../Controller/layoutController");
const Router = express.Router();




// Create product Route/API:-
Router.post("/admin/product/create-product",createProduct);
//Get All Product Data Route/API:-
Router.get("/admin/product/all-product", GetAllProduct);
//Update product Data Route/API:-
Router.get("/admin/product/product-update",productUpdate);
//Delate product Data Route/API:-
Router.post("/admin/product/product-delate",ProductDelete);


//Create a Category
Router.post("/admin/category/create-category",category);
//update a category
Router.post("/admin/category/category-update",updateCategory);
//delate a category
Router.post("/admin/category/category-delate",categoriesDelete);
//show all category
Router.get("/admin/category/all-category",getCategory);



//Create a tags
Router.post("/admin/tags/create-tags",tags);
//update a tags
Router.post("/admin/tags/tags-update",updatetags);
//delate a tags
Router.post("/admin/tags/tags-delate",tagsDelete);
//show all tags
Router.get("/admin/tags/all-tags",gettags);



//Create a layout
Router.post("/admin/layout/create-layout",layout);
//update a layout
Router.post("/admin/layout/layout-update",updatelayout);
//delate a layout
Router.post("/admin/layout/layout-delate",layoutDelete);
//show all layout
Router.get("/admin/layout/all-layout",getlayout);


module.exports =Router