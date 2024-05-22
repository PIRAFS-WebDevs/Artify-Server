const userModel = require("../Model/userModel");
const { createToken } = require("../middleware/jsonwebtoken");

const User = async (req, res) => {
  const { name, email, imgUrl } = req.body;

  if (!name || !email) {
    res.status(401).send({ success: false });
  } else {
    let checkEmail = await userModel.findOne({ email: email });
    if (!checkEmail) {
      try {
        checkEmail = await new userModel({
          name,
          email,
          imgUrl,
        }).save();

        // const token = await createToken(email);

        // res.cookie("user_token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'Strict',
        //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        //   });

        res.status(200).send({ success: true });
      } catch (err) {
        console.log(err.message);
      }
    }
  }
};

const UpdateUserData = async (req, res) => {
  try {
    const { name, phoneNumber, imgUrl, bio, email } = req.body;

    try {
      const checkExist = await userModel.findOne({ email: email });
      if (checkExist) {
        const data = await userModel.findByIdAndUpdate(
          checkExist._id,
          { name, phoneNumber, imgUrl, bio },
          { new: true }
        );
        res.status(200).send({ success: true, data });
      } else {
        res.status(404).send({ success: false });
      }
    } catch (error) {
      res
        .status(500)
        .send({ success: false, massage: "internal server error" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const AllUser = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: true, massage: "internal server error" });
  }
};

const SingleUser = async (req, res) => {
  try {
    const email = req.params.email;
    try {
      const data = await userModel.findOne({ email: email });
      if (data) {
        res.status(200).send({ success: true, data });
      } else {
        res.status(404).send({ success: false, massage: "user not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ success: false, massage: "internal server error" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const UserById = async (req, res) => {
  try {
    const id = req.params.id;
    try {
      const data = await userModel.findOne({ _id: id });
      if (data) {
        res.status(200).send({ success: true, data });
      } else {
        res.status(404).send({ success: false, massage: "user not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ success: false, massage: "internal server error" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

const UserDelete = async (req, res) => {
  try {
    const _id = req.params._id;
    const checkExist = await userModel.findOne({ _id });

    if (checkExist) {
      const data = await userModel.findByIdAndDelete({ _id: checkExist._id });
      res.status(200).send({ success: true, data });
    } else {
      res.status(404).send({ success: false, massage: "user not found" });
    }
  } catch (error) {
    res.status(404).send({ success: false, massage: "internal server error" });
  }
};

const UserRoleChange = async (req, res) => {
  try {
    const { _id, role } = req.body;

    try {
      const checkExist = await userModel.findOne({ _id });
      if (checkExist) {
        try {
          const data = await userModel.findByIdAndUpdate(
            { _id: checkExist._id },
            { role: role },
            { new: true }
          );
          res.status(200).send({ success: true, data });
        } catch (error) {
          res
            .status(500)
            .send({ success: false, massage: "internal server error" });
        }
      } else {
        res.status(404).send({ success: false, massage: "user not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ success: false, massage: "internal server error" });
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

module.exports = {
  User,
  UpdateUserData,
  AllUser,
  UserDelete,
  SingleUser,
  UserRoleChange,
  UserById,
};
