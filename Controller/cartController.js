const cartModel = require("../Model/cartModel");

const cart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    console.log(items);
    //const userId = req.params._id;
    const previousCart = await cartModel.findOne({ user_id: userId });

    if (!previousCart) {
      const newCart = new cartModel({
        user_id: userId,
        item: items,
      });
      await newCart.save();
      res.status(200).send({ message: "Cart data saved successfully." });
    } else {
      console.log("cartsss");
      // const mergedCart = mergeCarts(previousCart.item, items);
      // previousCart.item = mergedCart;
      // console.log(mergedCart);
      // console.log("hellow");
      // await previousCart.save();

      const mergedCart = mergeCarts(previousCart.item, items);
      previousCart.item = mergedCart;
      console.log("he");
      console.log(mergedCart);
      await previousCart.save();
      console.log("hellow");

      res
        .status(200)
        .send({ message: "Cart data merged and saved successfully." });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

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
  //console.log(mergeCarts)
  return mergedCart;
}
const getCart = async (req, res) => {
  try {
    const _id = req.params._id;
    //console.log("🚀 ~ file: cartController.js:55 ~ getCart ~ _id:", _id);

    const data = await cartModel.findOne({ user_id: _id }).populate('User');
    if (data) {
      res.status(200).send({ success: true, data });
    } else {
      res.status(404).send({ success: false, masaage: "cart not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, masaage: "internal server error" });
  }
};
module.exports = {
  cart,
  getCart,
};
