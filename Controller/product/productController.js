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
    const { user_id, number, comment } = req.body;
    const id = req.params.id;

    // Check if the product exists
    const existingProduct = await productModel.findById(id);

    if (!existingProduct) {
      return res.status(400).json({ message: "Error to find product" });
    }

    // Find and update the rating if it exists, or add a new rating if it doesn't
    const result = await productModel.findOneAndUpdate(
      { _id: id, "ratings.user_id": user_id },
      {
        $set: {
          "ratings.$.number": number,
          "ratings.$.comment": comment,
        },
      },
      {
        new: true,
        upsert: false, // Only update existing
      }
    );

    if (!result) {
      // If no existing rating was updated, add a new rating
      await productModel.findByIdAndUpdate(
        id,
        {
          $push: {
            ratings: {
              user_id,
              number,
              comment,
              date: Date.now(),
            },
          },
        },
        {
          new: true,
          upsert: true, // Create new entry if doesn't exist
        }
      );

      return res
        .status(200)
        .json({ success: true, message: "Rating is added" });
    }

    res.status(200).json({ success: true, message: "Rating is updated" });
  } catch (error) {
    res.status(400).json({ message: "Error to update rating", error });
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
