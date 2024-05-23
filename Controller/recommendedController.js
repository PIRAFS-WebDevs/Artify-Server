const recommendedModel = require("../Model/recommendedModel");

const AllRecommended = async (req, res) => {
  try {
    const data = await recommendedModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ success: true, massage: "internal server error" });
  }
};

const PostRecommended = async (req, res) => {
  try {
    await recommendedModel(req.body).save();
    res
      .status(200)
      .send({ success: true, message: "Recommended post successfully" });
  } catch (error) {
    res.status(500).send({ success: true, massage: "internal server error" });
  }
};

module.exports = {
  AllRecommended,
  PostRecommended,
};
