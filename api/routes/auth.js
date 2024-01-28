const express = require("express");
const router = express.Router();
const { signin, refresh, isAuthenticated } = require("../controllers/AuthController");

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
        resp.send('ok');
    }
);

module.exports = router;
