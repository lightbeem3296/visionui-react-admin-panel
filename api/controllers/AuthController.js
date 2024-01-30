const jwt = require('jsonwebtoken');
const md5 = require('md5');

const accessTokenExpire = '10s';
const refreshTokenExpire = '24h';

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  const pwdHash = md5(password);

  console.log(password);
  console.log(pwdHash);

  if (username != "admin" || password != "1234") {
    return res.status(400).json({
      success: false,
      error: "Username or password is invalid",
    });
  }

  const accessToken = jwt.sign({ user_id: username }, 'accessSecret', {
    expiresIn: accessTokenExpire,
  });
  const refreshToken = jwt.sign({ user_id: username }, 'refreshSecret', {
    expiresIn: refreshTokenExpire,
  })

  return res.status(200).json({ accessToken, refreshToken });
};

verifyRefresh = (username, token) => {
  try {
    const decoded = jwt.verify(token, "refreshSecret");
    return decoded.username === username;
  } catch (error) {
    console.error(error);
    return false;
  }
};

exports.refresh = (req, res) => {
  const { username, refreshToken } = req.body;
  const isValid = verifyRefresh(username, refreshToken);
  if (!isValid) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid token, try login again" });
  }

  const accessToken = jwt.sign({ username: username }, "accessSecret", {
    expiresIn: accessTokenExpire,
  });

  return res.status(200).json({ success: true, accessToken });
}

exports.isAuthenticated = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(404).json({ success: false, msg: "Token not found" });
    }
    const accessToken = token.split(" ")[1];
    const decoded = jwt.verify(accessToken, "accessSecret");
    next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: error.message });
  }
};
