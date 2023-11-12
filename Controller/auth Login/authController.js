const userModel = require("../../Model/userModel");
const userloginModel = require("../../Model/userModel");
const { hashPassword, comparePasswords } = require("../../middleware/bcrypt");
const { createToken } = require("../../middleware/jsonwebtoken");

const userSingup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    countryName,
    address,
    password,
  } = req.body;

  if (!firstName || !email || !password) {
    res.status(401).send(false);
  } else {
    const checkEmail = await userloginModel.find({ email: email });
    if (checkEmail == 0) {
      try {
        const encryptPassword = await hashPassword(password);
        console.log(encryptPassword);
        const smUserName = firstName.toLowerCase();
        const adduser = await new userloginModel({
          full_name: firstName + " " + lastName,
          user_name: smUserName + Math.floor(1000 + Math.random() * 9000),
          email: email,
          phoneNumber: phoneNumber,
          countryName: countryName,
          address: address,
          password: encryptPassword,
        }).save(); 

        const token = await createToken(email);

        // res.cookie("_t", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'Strict',
        //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        //   });

        res.status(200).send(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      res.status(404).send({ massage: "email already exit" });
    }
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email || password) {
    try {
      const data = await userloginModel.findOne({
        $or: [{ user_name: email }, { email: email }],
      });

      //console.log(data.password);

      if (data) {
        const isMatch = await comparePasswords(password, data.password);

        if (isMatch) {
          //console.log('Passwords match. Authentication successful.');
          res
            .status(200)
            .send({ massage: "Passwords match. Authentication successful." });
        } else {
          //console.log('Passwords do not match. Authentication failed.');
          res
            .status(404)
            .send({
              massage: "Passwords do not match. Authentication failed.",
            });
        }

        const token = await createToken(data.email);
        console.log(token);

        // res.cookie("_t", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'Strict',
        //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        //   });
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const ChangePassword = async(req,res)=>{
  try {
    const _id = req.params._id;
    const {password} = req.body;
    try {
      const userCheck = await userModel.findOne({_id:_id});
      if(userCheck){
        const isMatch = await comparePasswords(password, userCheck.password)
        if(isMatch){
          const encryptPassword = await hashPassword(password);
          const updateValue = await userModel.findByIdAndUpdate({_id:_id},{password})

        }else{
          res.status(404).send({massage:"Password Does not match"});
        }

      }else{
        res.status(404).send({massage: "user not found"});
      }
    } catch (error) {
      res.status(500).send({massage: "error fatching the database"});
      
    }
  } catch (error) {
    res.status(503).send({massage: "_id not found"});
    
  }
}

module.exports = {
  userSingup,
  userLogin,
  ChangePassword,
};
