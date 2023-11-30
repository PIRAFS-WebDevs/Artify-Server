const layoutModel = require("../Model/layoutModel");

const layout = async (req, res) => {
  try {
    const { name, slug, details } = req.body;
    try {
      const checkdata = await layoutModel.findOne({ name: name });
      if (!checkdata) {
        await layoutModel({
          name,
          slug,
          details,
        }).save();
        res.status(200).send({ success: true, massage: "layout Uploaded" });
      } else {
        res
          .status(404)
          .send({ success: false, massage: "layout all ready exists" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ success: false, massage: "Internal server error" });
    }
  } catch (error) {
    res.status(501).send({ success: false, massage: "fatching value error" });
  }
};

const updatelayout = async (req, res) => {
  try {
    let _id = req.params._id;
    let body = req.body;
    const { name, slug, details } = req.body;
    console.log("req.body:", req.body);
    if (!_id || !name || !slug || !details) {
      res.status(401).send({ success: false, massage: "fill proper data" });
    } else {
      const checkdata = await layoutModel.findById({ _id: _id });

      if (checkdata) {
        await layoutModel.findByIdAndUpdate(_id, body, { new: true });
        res
          .status(200)
          .send({ success: true, massage: "update succesfully", data: body });
      } else {
        res.status(404).send({ success: false, massage: "layout not found" });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const getlayout = async (req, res) => {
  try {
    const data = await layoutModel.find();
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};
const getLayoutById = async (req, res) => {
  const _id = req.params._id;
  try {
    const data = await layoutModel.findById({ _id: _id });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const layoutDelete = async (req, res) => {
  try {
    let _id = req.params._id;
    const checkdata = await layoutModel.findOne({ _id: _id });
    if (checkdata) {
      await layoutModel.findByIdAndDelete({ _id: _id });
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ success: false, massage: "layout not found" });
    }
  } catch (error) {
    res.status(404).send({ success: false, massage: "internal server error" });
  }
};

module.exports = {
  layout,
  updatelayout,
  getlayout,
  getLayoutById,
  layoutDelete,
};
