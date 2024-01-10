var express = require('express');
var router = express.Router();

router.get('/user_creedians', function(req, res, next) {
    res.send('user creedians admin');
});

module.exports = router;