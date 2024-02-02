const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { onError, onSuccess, ERROR_CODE } = require('../utils/resp');
const { isInvalid } = require('../utils/basic');

const ACCESS_TOKEN_EXPIRE = '60m';
const REFRESH_TOKEN_EXPIRE = '24h';
const ACCESS_SECRET = 'access secret';
const REFRESH_SECRET = 'refresh secret';

exports.signin = async (req, resp) => {
  const { username, password } = req.body;

  const pwdHash = md5(password);

  if (username != "admin" || password != "1234") {
    return onError(resp, 'Username or password is invalid');
  }

  const accessToken = jwt.sign({ user_id: username }, ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });
  const refreshToken = jwt.sign({ user_id: username }, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  })

  return onSuccess(resp, {
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};

verifyRefresh = (userId, refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    return decoded.user_id === userId;
  } catch (err) {
    console.error(err);
    return false;
  }
};

exports.refresh = (req, resp) => {
  const { user_id, refresh_token } = req.body;
  if (!verifyRefresh(user_id, refresh_token)) {
    return onError(resp, 'invalid refresh token');
  }

  const accessToken = jwt.sign({ user_id: user_id }, ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });

  return onSuccess(resp, { access_token: accessToken });
}

exports.isAuthenticated = (req, resp, next) => {
  try {
    let authorization = req.headers["authorization"];
    if (isInvalid(authorization)) {
      return onError(resp, 'request header error', null, ERROR_CODE.AUTH);
    }
    const userId = authorization.split("||")[1];
    const accessToken = authorization.split("||")[2];
    const decoded = jwt.verify(accessToken, ACCESS_SECRET);
    if (userId === decoded.user_id) {
      return next();
    } else {
      return onError(resp, 'mismatch user_id & token', null, ERROR_CODE.AUTH);
    }
  } catch (err) {
    return onError(resp, 'unhandled error', err, ERROR_CODE.AUTH);
  }
};
