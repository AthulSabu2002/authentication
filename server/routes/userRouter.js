const express = require("express");
// const asyncHandler = require("express-async-handler");
// const async = require('async');

const { 
        loginUser, 
        registerUser
    } = require('../controllers/userController');

const router = express.Router();
// const bodyParser = require("body-parser");

// const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.route("/login").post(loginUser);

router.route("/signup").post(registerUser);


module.exports = router;