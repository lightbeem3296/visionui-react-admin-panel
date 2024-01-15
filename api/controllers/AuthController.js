const jwt = require('jsonwebtoken');


exports.signin = async (req, res) => {
  const { username, password } = req.body;

  if (username != "admin" || password != "1234") {
    return res.status(400).json({
      success: false,
      error: "Username or password is invalid",
    });
  }

  const accessToken = jwt.sign({ username: username }, 'accessSecret', {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign({ username: username }, 'refreshSecret', {
    expiresIn: "24h",
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
    expiresIn: "5m",
  });

  return res.status(200).json({ success: true, accessToken });
}

exports.check = (req, res) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(404).json({ success: false, msg: "Token not found" });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "accessSecret");
    return res.status(200).json({ username: decoded.username });
  } catch (error) {
    return res.status(401).json({ success: false, msg: error.message });
  }
}

exports.isAuthenticated = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(404).json({ success: false, msg: "Token not found" });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "accessSecret");
    req.username = decoded.username;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: error.message });
  }
};