const express = require('express');
const router = express.Router();
const sql = require("mssql");
const dbConfig = require("../../config/db.js");
const { isAuthenticated } = require("../../controllers/AuthController.js");

var config = {
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  server: dbConfig.HOST,
  port: dbConfig.PORT,
  options: {
    encrypt: false,
  },
};

router.post("/fetch", isAuthenticated, function (req, res) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const filter = req.body;
      console.log(filter);
      var items = [];
      for (var i = 0; i < 10; i++) {
        items.push({
          name: 'Name',
          price: Math.trunc(Math.random() * 10000),
          image: 'image',
          index: 'index-123123',
          limit: Math.trunc(Math.random() * 10),
          type: Math.trunc(Math.random() * 4),
          rarity: Math.trunc(Math.random() * 4),
          class: Math.trunc(Math.random() * 12),
        });
      }
      res.send(items);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", isAuthenticated, function (req, res) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const item = req.body;
      console.log(item);
      res.send('add item');
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/update", isAuthenticated, function (req, res) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const item = req.body;
      console.log(item);
      res.send('update item');
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/delete", isAuthenticated, function (req, res) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const itemIndex = req.body.index;
      console.log(itemIndex);
      res.send('delete item');
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
