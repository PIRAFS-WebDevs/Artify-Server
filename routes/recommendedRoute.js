const {
  AllRecommended,
  PostRecommended,
} = require("../Controller/recommendedController");

const router = require("express").Router();

router.get("/", AllRecommended);
router.post("/", PostRecommended);

module.exports.RecommendedRoute = router;
