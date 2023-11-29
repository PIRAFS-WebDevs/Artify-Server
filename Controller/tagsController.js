const tagsModel = require("../Model/tagsModel");

const tags = async (req, res) => {
  try {
    const { name, slug, details } = req.body;
    try {
      const checkdata = await tagsModel.findOne({ name: name });
      if (!checkdata) {
        await tagsModel({
          name,
          slug,
          details,
        }).save();
        res.status(200).send({ success: true, massage: "tags Uploaded" });
      } else {
        res
          .status(404)
          .send({ success: false, massage: "tags all ready exists" });
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

const updatetags = async (req, res) => {
  try {
    let _id = req.params._id;
    const {name, slug, details } = req.body;
    if (!id || !name || !slug || !details) {
      res.status(401).send({ success: false, massage: "fill proper data" });
    } else {
      const checkdata = await tagsModel.findOne({ _id: _id });
      if (checkdata) {
        await tagsModel.findByIdAndUpdate(
          _id,
          { name, slug, details },
          { new: true }
        );
        res.status(200).send({ success: true, massage: "update succesfully" });
      } else {
        res.status(404).send({ success: false, massage: "tags not found" });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const gettags = async (req, res) => {
  try {
    const data = await tagsModel.find();
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const tagsDelete = async (req, res) => {
  try {
    let _id = req.params._id;
    const checkdata = await tagsModel.findOne(_id);
    if (checkdata) {
      await tagsModel.findByIdAndRemove(_id);
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ success: false, massage: "tags not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

module.exports = {
  tags,
  updatetags,
  gettags,
  tagsDelete,
};
