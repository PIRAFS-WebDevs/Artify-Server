const cartModel = require("../Model/cartModel");

function mergeCarts(previousCart, newCart) {
  const mergedCart = [...previousCart];
  newCart.forEach((newCartItem) => {
    const existingItem = mergedCart.find((item) =>
      item.id.equals(newCartItem.id)
    );

    if (existingItem) {
      // If the item already exists in the cart, increase the quantity
      existingItem.quantity += newCartItem.quantity;
    } else {
      // If the item is not in the cart, add it
      mergedCart.push(newCartItem);
    }
  });

  return mergedCart;
}

const cart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    const previousCart = await cartModel.findOne({ user_id: userId });

    if (!previousCart) {
      const newCart = new cartModel({
        user_id: userId,
        item: items,
      });
      await newCart.save();
      res
        .status(200)
        .send({ success: true, message: "Cart data saved successfully." });
    } else {
      const mergedCart = mergeCarts(previousCart.item, items);
      previousCart.item = mergedCart;
      await previousCart.save();

      res.status(200).send({
        success: true,
        message: "Cart data merged and saved successfully.",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const _id = req.params._id;

    const data = await cartModel.findOne({ user_id: _id }).populate("User");
    if (data) {
      res.status(200).send({ success: true, data });
    } else {
      res.status(404).send({ success: false, message: "cart not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "internal server error" });
  }
};

module.exports = {
  cart,
  getCart,
};
