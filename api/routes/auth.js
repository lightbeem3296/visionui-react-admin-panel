const express = require("express");
var router = express.Router();
const { signin, refresh, check } = require("../controllers/AuthController");

router.post(
    "/signin",
    signin
);

router.post(
    "/refresh",
    refresh,
);

router.post(
    "/check",
    check,
);

module.exports = router;
