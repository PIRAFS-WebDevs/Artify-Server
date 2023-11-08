const cartModel = require("../Model/cartModel");

const cart = async (req,res)=>{

    try {
        const cartData = req.data;
        const userId = req.params.userId;
        const precart = await cartModel.findOne({ user_id: userId });
    } catch (error) {
        
    }
}