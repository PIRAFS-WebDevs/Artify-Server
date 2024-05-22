const router = require("express").Router();
const {
  AllUser,
  SingleUser,
  UserDelete,
  UserRoleChange,
  User,
  UpdateUserData,
  UserById,
} = require("../Controller/userController");

// all user
router.get("/", AllUser);
// create user
router.post("/", User);
// update user
router.patch("/", UpdateUserData);
// single user
router.get("/:email", SingleUser);
// user by id
router.get("/id/:id", UserById);
// delete user
router.delete("/:_id", UserDelete);
// change role
router.patch("/change-role", UserRoleChange);

module.exports.UserRoute = router;
