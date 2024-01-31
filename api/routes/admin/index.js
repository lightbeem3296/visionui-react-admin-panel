const express = require('express');
const router = express.Router();

const creedianRouter = require('./creedian.js');
const itemRouter = require('./item.js');

router.use('/creedian', creedianRouter);
router.use('/item', itemRouter);

module.exports = router;
