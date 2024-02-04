const express = require("express");
const router = express.Router();
const { signin, refresh, isAuthenticated } = require("../controllers/auth");
const { onSuccess } = require("../utils/net.js");

router.post("/signin", signin);
router.post("/refresh", refresh);
router.post('/check', isAuthenticated, (_, resp) => {
    onSuccess(resp);
});

module.exports = router;
