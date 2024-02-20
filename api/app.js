const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const consts = require('./consts');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.development' });

var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(consts.PUBLIC_DIR));

app.use('/auth', authRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Admin backend is listening on port ${process.env.PORT}!`)
});
