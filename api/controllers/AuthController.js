const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { onError, onSuccess } = require('../utils/resp');
const { isInvalid } = require('../utils/basic');

const accessTokenExpire = '60m';
const refreshTokenExpire = '24h';
const accessSecret = 'access secret';
const refreshSecret = 'refresh secret';

exports.signin = async (req, resp) => {
  const { username, password } = req.body;

  const pwdHash = md5(password);

  if (username != "admin" || password != "1234") {
    return onError(resp, 'Username or password is invalid');
  }

  const accessToken = jwt.sign({ user_id: username }, accessSecret, {
    expiresIn: accessTokenExpire,
  });
  const refreshToken = jwt.sign({ user_id: username }, refreshSecret, {
    expiresIn: refreshTokenExpire,
  })

  return onSuccess(resp, {
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};

verifyRefresh = (user_id, token) => {
  try {
    const decoded = jwt.verify(token, refreshSecret);
    return decoded.user_id === user_id;
  } catch (error) {
    console.error(error);
    return false;
  }
};

exports.refresh = (req, resp) => {
  const { user_id, refresh_token } = req.body;
  if (!verifyRefresh(user_id, refresh_token)) {
    return onError(resp, 'invalid refresh token');
  }

  const accessToken = jwt.sign({ user_id: user_id }, accessSecret, {
    expiresIn: accessTokenExpire,
  });

  return onSuccess(resp, {access_token: accessToken});
}

exports.isAuthenticated = (req, resp, next) => {
  try {
    let authorization = req.headers["authorization"];
    if (isInvalid(authorization)) {
      return onError(resp, 'request header error');
    }
    const userId = authorization.split("||")[1];
    const accessToken = authorization.split("||")[2];
    const decoded = jwt.verify(accessToken, accessSecret);
    if (decoded.user_id === userId) {
      return next();
    } else {
      return onError(resp, 'mismatch user_id & token');
    }
  } catch (err) {
    return onError(resp, 'unhandled error', err);
  }
};
