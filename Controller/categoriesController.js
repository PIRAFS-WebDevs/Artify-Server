const categoriesModel = require("../Model/categoriesModel");

const category = async (req, res) => {
  try {
    const { name, details, slug } = req.body;
    try {
      const findCategory = await categoriesModel.findOne({ name: name });
      if (!findCategory) {
        await categoriesModel({
          name,
          details,
          slug,
        }).save();
        res.status(200).send({ success: true, massage: "categories Uploaded" });
      } else {
        res
          .status(404)
          .send({ success: false, massage: "categories all ready exists" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ success: false, massage: "Internal server error" });
    }
  } catch (error) {
    res.status(501).send({ success: false, massage: "fetching value error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const _id = req.params._id;
    const { name, details, slug } = req.body;

    if (!_id || !name || !details || !slug) {
      res.status(401).send({ massage: "fill proper data" });
    } else {
      const findCategory = await categoriesModel.findById({ _id: _id });
      if (findCategory) {
        await categoriesModel.findByIdAndUpdate(
          _id,
          { name, details, slug },
          { new: true }
        );
        res.status(200).send({ success: true, massage: "update successfully" });
      } else {
        res.status(404).send({ success: false, massage: "category not found" });
      }
    }
  } catch (error) {
    res.status(500).send({ massage: "internal server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const data = await categoriesModel.find();
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const getCategoryById = async (req, res) => {
  const _id = req.params._id;
  try {
    const data = await categoriesModel.findById({ _id: _id });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const _id = req.params._id;

    const findCategory = await categoriesModel.findOne({ _id });

    if (findCategory) {
      await categoriesModel.findByIdAndDelete({ _id });
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ success: false, massage: "category not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

module.exports = {
  category,
  updateCategory,
  getCategoryById,
  getCategories,
  deleteCategory,
};
