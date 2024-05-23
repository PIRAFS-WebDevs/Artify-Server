const { AllBlogs, SingleBlog } = require("../Controller/articleController");

const router = require("express").Router();

router.get("/", AllBlogs);
router.get("/:id", SingleBlog);

module.exports.BlogRoute = router;
