const express = require("express");
const router = express.Router();
const { signin, refresh, isAuthenticated } = require("../controllers/AuthController");
const { onSuccess } = require("../utils/resp");

router.post(
    "/signin",
    signin,
);

router.post(
    "/refresh",
    refresh,
);

router.post(
    '/check',
    isAuthenticated,
    (req, resp) => {
        onSuccess(resp);
    }
);

module.exports = router;
