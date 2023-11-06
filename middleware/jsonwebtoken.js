const jwt = require('jsonwebtoken');


// Create a JWT with the user's email
async function createToken(email){
    const secretKey = process.env.secretKey
    
const token = await jwt.sign({ email: email }, secretKey, { expiresIn: '7d' });
console.log(token);
return token;

}
const userCheckToken = async (req, res, next) => {
    const token = req.cookies._t;
   // console.log('check token');
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
      console.log('check token   ', decoded._id);
    
      //req.data = req.body;
      next();
  
    });
  };

module.exports ={
    createToken,
    userCheckToken,
}