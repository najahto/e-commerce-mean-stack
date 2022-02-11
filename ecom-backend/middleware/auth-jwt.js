const expressJwt = require('express-jwt');

function authJWT() {
  const api = process.env.APP_URL;
  const secret = process.env.JWT_SECRET;
  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

// Check if the user is admin
async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = authJWT;
