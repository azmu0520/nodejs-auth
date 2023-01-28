const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const jwtConfig = {
  secret: jwtSecret,
  expiresIn: '1d', // expires in 1 day
};

const generateJwtToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

module.exports = {
  jwtConfig,
  generateJwtToken,
};
