const tagsModel = require("../Model/tagsModel");

const tags = async (req, res) => {
  try {
    const { name, slug, details } = req.body;

    try {
      const checkExist = await tagsModel.findOne({ name: name });
      if (!checkExist) {
        await tagsModel({
          name,
          slug,
          details,
        }).save();
        res.status(200).send({ success: true, massage: "tag Uploaded" });
      } else {
        res.status(404).send({ success: false, massage: "tag already exists" });
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

const updateTag = async (req, res) => {
  try {
    const _id = req.params._id;
    const { name, slug, details } = req.body;

    if (!_id || !name || !slug || !details) {
      res.status(401).send({ success: false, massage: "fill proper data" });
    } else {
      const checkExist = await tagsModel.findById({ _id });
      if (checkExist) {
        await tagsModel.findByIdAndUpdate(
          _id,
          { name, slug, details },
          { new: true }
        );
        res.status(200).send({ success: true, massage: "update successfully" });
      } else {
        res.status(404).send({ success: false, massage: "tag not found" });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const getTags = async (req, res) => {
  try {
    const data = await tagsModel.find();
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const getTagById = async (req, res) => {
  const _id = req.params._id;

  try {
    const data = await tagsModel.findById({ _id });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const deleteTag = async (req, res) => {
  try {
    const _id = req.params._id;
    const checkExist = await tagsModel.findOne({ _id });

    if (checkExist) {
      await tagsModel.findByIdAndDelete({ _id });
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ success: false, massage: "tag not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

module.exports = {
  tags,
  updateTag,
  getTags,
  getTagById,
  deleteTag,
};
