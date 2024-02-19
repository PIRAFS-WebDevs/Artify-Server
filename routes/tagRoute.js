const router = require("express").Router();
const {
  tags,
  updateTag,
  deleteTag,
  getTags,
  getTagById,
} = require("../Controller/tagsController");

// create a tag
router.post("/", tags);
// update a tag
router.patch("/:_id", updateTag);
// delate a tag
router.delete("/:_id", deleteTag);
// get all tags
router.get("/", getTags);
// single tag
router.get("/:_id", getTagById);

module.exports.TagRoute = router;
