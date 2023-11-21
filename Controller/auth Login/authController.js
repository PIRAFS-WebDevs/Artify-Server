const userModel = require("../../Model/userModel");
const { hashPassword, comparePasswords } = require("../../middleware/bcrypt");
const { createToken } = require("../../middleware/jsonwebtoken");

const userSignup = async (req, res) => {
  const { name, email, photoURL } = req.body;

  if (!name || !email) {
    res.status(401).send(false);
  } else {
    let checkEmail = await userModel.findOne({ email: email });
    console.log(checkEmail);
    //let user = await userModel.findOne({ email });
    if (!checkEmail) {
      try {
        checkEmail = await new userModel({
          name: name,
          email: email,
          imgURL: photoURL,
        }).save();

        const token = await createToken(email);

        // res.cookie("_t", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'Strict',
        //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        //   });

        res.status(200).send(true);
      } catch (err) {
        console.log(err.message);
      }
    }
  }
};

// const userLogin = async (req, res) => {
//   const { email, password } = req.body;

//   if (email || password) {
//     try {
//       const data = await userloginModel.findOne({
//         $or: [{ user_name: email }, { email: email }],
//       });

//       //console.log(data.password);

//       if (data) {
//         const isMatch = await comparePasswords(password, data.password);

//         if (isMatch) {
//           //console.log('Passwords match. Authentication successful.');
//           res
//             .status(200)
//             .send({ massage: "Passwords match. Authentication successful." });
//         } else {
//           //console.log('Passwords do not match. Authentication failed.');
//           res
//             .status(404)
//             .send({
//               massage: "Passwords do not match. Authentication failed.",
//             });
//         }

//         const token = await createToken(data.email);
//         console.log(token);

//         // res.cookie("_t", token, {
//         //     httpOnly: true,
//         //     secure: true,
//         //     sameSite: 'Strict',
//         //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//         //   });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
// };

const ChangePassword = async (req, res) => {
  try {
    const _id = req.params._id;
    const { password } = req.body;
    try {
      const userCheck = await userModel.findOne({ _id: _id });
      if (userCheck) {
        const isMatch = await comparePasswords(password, userCheck.password);
        if (isMatch) {
          const encryptPassword = await hashPassword(password);
          const updateValue = await userModel.findByIdAndUpdate(
            { _id: _id },
            { password }
          );
        } else {
          res.status(404).send({ massage: "Password Does not match" });
        }
      } else {
        res.status(404).send({ massage: "user not found" });
      }
    } catch (error) {
      res.status(500).send({ massage: "error fatching the database" });
    }
  } catch (error) {
    res.status(503).send({ massage: "_id not found" });
  }
};

const updateUserData = async (req, res) => {
  try {
    const { email, phoneNumber, image } = req.body;

    try {
      const checkdata = await userModel.findOne({ email: email });
      if (checkdata) {
        const data = await userModel.findByIdAndUpdate(
          checkdata._id,
          { email, phoneNumber, image },
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
    const data = await userModel.find().select("-password");
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: true, massage: "internal server error" });
  }
};

const Singleuser = async (req, res) => {
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

const UserDelete = async (req, res) => {
  try {
    const _id = req.params._id;
    const checkdata = await userModel.findOne({ _id: _id });
    if (checkdata) {
      await userModel.findByIdAndDelete({ _id: checkdata._id });
      res.status(200).send({ success: true });
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
      const checkData = await userModel.findOne({ _id: _id });
      if (checkData) {
        try {
          const resData = await userModel.findByIdAndUpdate(
            { _id: checkData._id },
            { role: role },
            { new: true }
          );
          console.log(resData);
          res.status(200).send({ success: true, resData });
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
const SearchUser = async (req, res) => {
  try {
    const text = req.query.text;
    console.log(text);
    if (text) {
      try {
        const user = await userModel
          .find({
            $or: [
              { name: { $regex: new RegExp(text, "i") } },
              { email: { $regex: new RegExp(text, "i") } },
              { role: { $regex: new RegExp(text, "i") } },
            ],
          })
          .sort({ name: 1 });
        console.log(user);
        if (user.length != 0) {
          res.status(200).send({ success: true, user });
        } else {
          res.status(400).send({ success: false, massage: "user not found" });
        }
      } catch (error) {
        res
          .status(500)
          .send({ success: false, massage: "internal server error" });
      }
    } else {
      try {
        const user = await userModel
          .find
          // {
          //   $or: [
          //     { name: { $regex: new RegExp(text, 'i') } },
          //     { email: { $regex: new RegExp(text, 'i') } },
          //     { role: { $regex: new RegExp(text, 'i') } },
          //   ],
          // }
          ()
          .sort({ name: 1 });
        console.log(user);
        if (user.length != 0) {
          res.status(200).send({ success: true, user });
        } else {
          res.status(400).send({ success: false, massage: "user not found" });
        }
      } catch (error) {
        res
          .status(500)
          .send({ success: false, massage: "internal server error" });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, massage: "internal server error" });
  }
};

module.exports = {
  userSignup,
  // userLogin,
  ChangePassword,
  updateUserData,
  AllUser,
  UserDelete,
  Singleuser,
  UserRoleChange,
  SearchUser,
};
