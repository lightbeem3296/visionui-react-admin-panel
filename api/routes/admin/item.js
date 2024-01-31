const express = require('express');
const router = express.Router();
const sql = require("mssql");
const dbConfig = require("../../config/db.js");
const { isAuthenticated } = require("../../controllers/AuthController.js");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const consts = require('../../consts.js');
const upload = multer({ dest: consts.uploadDir });

const itemImageDir = path.join(consts.publicDir, 'images', 'items');


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

router.post("/add", isAuthenticated, upload.single('file'), function (req, res) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);

      const details = JSON.parse(req.body.details);
      if (req.file) {
        let tmpPath = req.file.path;
        let dstPath = path.join(itemImageDir, details.index + '.png');

        fs.mkdir(itemImageDir, { recursive: true }, (err) => {
          if (err) console.log(err);
          fs.rename(tmpPath, dstPath, (err) => {
            if (err) console.log(err);
            fs.rm(tmpPath, (err) => {
              console.log(err);
            });
          });
        });
      }
      res.send();
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/update", isAuthenticated, upload.single('file'), function (req, res) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);

      const details = JSON.parse(req.body.details);
      if (req.file) {
        let tmpPath = req.file.path;
        let dstPath = path.join(itemImageDir, details.index + '.png');

        fs.mkdir(itemImageDir, { recursive: true }, (err) => {
          if (err) console.log(err);
          fs.rename(tmpPath, dstPath, (err) => {
            if (err) console.log(err);
            fs.rm(tmpPath, (err) => {
              console.log(err);
            });
          });
        });
      }
      res.send();
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
      console.log("item.delete: " + itemIndex);
      res.send();
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
