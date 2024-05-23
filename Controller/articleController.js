const blogModel = require("../Model/articleModel");

const AllBlogs = async (req, res) => {
  try {
    const data = await blogModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ success: true, massage: "internal server error" });
  }
};

const SingleBlog = async (req, res) => {
  try {
    const data = await blogModel.findOne({ id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ success: true, massage: "internal server error" });
  }
};

module.exports = {
  AllBlogs,
  SingleBlog,
};
