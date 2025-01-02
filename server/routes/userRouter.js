const express = require("express");
const passport = require('passport');

const { 
    loginUser, 
    registerUser,
    verifyToken,
    logoutUser,
    googleAuthCallback,
    forgotPassword,
    resetPassword
} = require('../controllers/userController');

const router = express.Router();

router.route("/login").post(loginUser);

router.route("/signup").post(registerUser);

router.post('/logout', logoutUser);

router.route("/verify-token").get(verifyToken);

router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    googleAuthCallback
);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;