const express = require("express");
var router = express.Router();
const { signin, refresh } = require("../controllers/AuthController");

router.post(
    "/signin",
    signin
);

router.post(
    "/refresh",
    refresh,
);

module.exports = router;
