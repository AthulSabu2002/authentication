const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const connectDb = require("./config/connectDb");
const dotenv = require('dotenv').config();
const createError = require('http-errors');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');

const port = process.env.PORT || 3000;

const userRouter = require('./routes/userRouter');

app.use(cors());
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.set('trust proxy', 1) 

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);


app.use(passport.initialize());
app.use(passport.session());

connectDb();

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

app.use('/users', userRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;