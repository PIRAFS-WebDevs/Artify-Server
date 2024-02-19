const jwt = require("jsonwebtoken");

// create a JWT with user email
async function createToken(email) {
  const secretKey = process.env.secretKey;

  const token = await jwt.sign({ email: email }, secretKey, {
    expiresIn: "7d",
  });

  return token;
}

// verify user token
const verifyToken = async (req, res, next) => {
  const token = req.cookies.user_token;

  if (!token) {
    return res.status(401).send({
      msg: "unauthorized",
    });
  }

  JWT.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        msg: "unauthorized",
      });
    }

    next();
  });
};

module.exports = {
  createToken,
  verifyToken,
};
