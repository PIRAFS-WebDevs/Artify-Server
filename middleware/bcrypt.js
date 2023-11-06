const bcrypt = require('bcrypt');
const saltRounds = 15;

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(password);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}


async function comparePasswords(userProvidedPassword, hashedPassword) {
    try {
      const match = await bcrypt.compare(userProvidedPassword, hashedPassword);
      return match;
    } catch (error) {
      throw error;
    }
  }
module.exports = {
    hashPassword,
    comparePasswords,
  };