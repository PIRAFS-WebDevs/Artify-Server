const cartModel = require("../../Model/cartModel");
const productModel = require("../../Model/productModel");

const CreateProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      sale_price,
      status,
      categories,
      layout,
      tags,
      images,
      preview_url,
    } = req.body;
    try {
      const data = await new productModel({
        name,
        slug,
        description,
        price,
        sale_price,
        status,
        categories,
        layout,
        tags,
        images,
        preview_url,
      }).save();

      res.status(201).send({ success: true, data });
    } catch (error) {
      res
        .status(500)
        .send({ success: false, massage: "internal server error" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const GetAllProduct = async (req, res) => {
  try {
    const data = await productModel.find();
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(200).send({ success: false, message: "error get all products" });
  }
};

const SingleProduct = async (req, res) => {
  try {
    const _id = req.params._id;
    if (_id) {
      try {
        const data = await productModel.findById({ _id });
        if (data) {
          res.status(200).send({ success: true, data });
        } else {
          res
            .status(401)
            .send({ success: false, massage: "product not found" });
        }
      } catch (error) {
        console.log("error while search the product", error);
        res
          .status(500)
          .send({ success: false, massage: "internal server error" });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const _id = req.params._id;
    const body = req.body;
    const checkExist = await productModel.findById({ _id });

    if (checkExist) {
      try {
        const data = await productModel.findByIdAndUpdate({ _id }, body, {
          new: true,
        });

        res.status(200).send({ success: true, data });
      } catch (e) {
        res
          .status(404)
          .send({ success: false, massage: "internal server error" });
      }
    } else {
      res
        .status(404)
        .send({ success: false, massage: `Product with ID ${_id} not found` });
    }
  } catch (error) {
    res.status(404).send({ success: false, massage: "internal server error" });
  }
};

const PublishedProduct = async (req, res) => {
  try {
    const data = await productModel.find({ status: "Published" });
    res.status(200).send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, massage: "internal server error" });
  }
};

const BuyProduct = async (req, res) => {
  try {
    const _id = req.params._id;
    const cartData = await cartModel.findOne({ user_id: _id });
    const items = cartData.item;
    let totalPrice = 0;

    for (const item of items) {
      const product = await productModel.findById(item.id);
      if (!product) {
        res.status(404).send({
          success: false,
          massage: `Product with ID ${item.id} not found`,
        });
      }

      // Calculate the total price for the item
      const itemPrice = parseFloat(product.price) * item.quantity;
      totalPrice += itemPrice;

      // Decrease the stock of the product
      product.quantity -= item.quantity;
      await product.save();
    }
  } catch (error) {
    res.status(404).send({ success: false, massage: "internal server error" });
  }
};

const ProductDelete = async (req, res) => {
  try {
    const _id = req.params._id;
    const checkExist = await productModel.findOne({ _id });

    if (checkExist) {
      await productModel.findByIdAndDelete({ _id });
      res
        .status(200)
        .send({ success: true, message: "product deleted successfully" });
    } else {
      res.status(404).send({ success: false, massage: "product not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const ProductRatings = async (req, res) => {
  try {
    const { prod_id, user_id, number, text1 } = req.body;

    const text = {
      user_id: user_id,
      text: text1,
    };

    try {
      const checkExist = productModel.findOne({
        _id: prod_id,
        "activity.ratings.user_id": user_id,
      });

      if (checkExist) {
        Product.findOneAndUpdate(
          { _id: prod_id, "activity.ratings.user_id": user_id },
          {
            $set: { "activity.ratings.$.number": number },
            $push: { "activity.comment": text },
          },
          { new: true },
          (updateErr, updatedProduct) => {
            if (updateErr) {
              console.error("Error updating product:", updateErr);
            } else {
              console.log("Updated product:", updatedProduct);
            }
          }
        );
      } else {
        Product.findByIdAndUpdate(
          prod_id,
          {
            $push: {
              "activity.ratings.user_id": user_id,
              "activity.ratings.$.number": number,
              "activity.comment": text,
            },
          },
          { new: true },
          (updateErr, updatedProduct) => {
            if (updateErr) {
              console.error("Error updating product:", updateErr);
            } else {
              console.log("Updated product:", updatedProduct);
            }
          }
        );
      }
    } catch (error) {
      res
        .status(500)
        .send({ success: false, massage: "internal server error" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

module.exports = {
  CreateProduct,
  GetAllProduct,
  SingleProduct,
  UpdateProduct,
  PublishedProduct,
  BuyProduct,
  ProductDelete,
  ProductRatings,
};
