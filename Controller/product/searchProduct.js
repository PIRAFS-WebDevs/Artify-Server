const productModel = require("../../Model/productModel");

const SearchProducts = async (req, res) => {
  try {
    const { text } = req.params;

    if (text) {
      try {
        const data = await productModel
          .find({
            $or: [
              { name: { $regex: new RegExp(text, "i") } },
              { categories: { $in: [text] } },
              { tags: { $in: [text] } },
              { layout: { $regex: new RegExp(text, "i") } },
            ],
          })
          .sort({ name: 1 });

        if (data.length != 0) {
          res.status(200).send({ success: true, data });
        } else {
          res
            .status(400)
            .send({ success: false, massage: "product not found" });
        }
      } catch (error) {
        res
          .status(500)
          .send({ success: false, massage: "internal server error" });
      }
    } else {
      try {
        const data = await productModel.find().sort({ name: 1 });

        if (data.length != 0) {
          res.status(200).send({ success: true, data });
        } else {
          res
            .status(400)
            .send({ success: false, massage: "product not found" });
        }
      } catch (error) {
        res
          .status(500)
          .send({ success: false, massage: "internal server error" });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

module.exports = {
  SearchProducts,
};
