const expressJwt = require('express-jwt');

function authJWT() {
  const secret = process.env.JWT_SECRET;
  return expressJwt({
    secret,
      algorithms: ['HS256'],

  });
}

module.exports = authJWT;
