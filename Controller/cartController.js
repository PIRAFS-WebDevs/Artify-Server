const cartModel = require("../Model/cartModel");

const cart = async (req, res) => {
    try {
        const {cartData} = req.data;
        const userId = req.params.userId;
        const previousCart = await cartModel.findOne({ user_id: userId });

        if (!previousCart) {
            const newCart = new cartModel({
                user_id: userId,
                cart: cartData,
            });
            await newCart.save();
            res.status(200).send({ message: "Cart data saved successfully." });
        } else {
            const mergedCart = mergeCarts(previousCart.item, cartData);
            previousCart.cart = mergedCart;
            await previousCart.save();

            res.status(200).send({ message: "Cart data merged and saved successfully." });
        }
    } catch (error) {   
        res.status(500).send({ error: "Internal server error" });
    }
};

function mergeCarts(previousCart, newCart) {
    const mergedCart = [...previousCart];
    newCart.forEach((newCartItem) => {
        const existingItem = mergedCart.find((item) => item.id.equals(newCartItem.id));

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
module.exports = {
    cart,
}