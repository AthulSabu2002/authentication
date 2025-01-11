const asyncHandler = require("express-async-handler");
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendResetEmail } = require('../config/emailConfig');

const User = require('../models/userModel');

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password){
        return res.status(400).json({ message: 'Email and password are mandatory.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    if (user.isLocked()) {
        return res.status(403).json({ message: 'Account is locked. Try after 15 minutes.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 5) {
            user.lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
        }
        await user.save();
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    });


    return res.status(200).json({ 
        message: 'Login successful',
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });

});

const registerUser = asyncHandler(async(req, res) => {
    const { fullName, email, password } = req.body;
  
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All details are mandatory.' });
    }
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });
});

const verifyToken = asyncHandler(async(req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ valid: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ valid: false });
        }

        return res.status(200).json({ 
            valid: true,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });

    } catch (error) {
        return res.status(401).json({ valid: false });
    }
});

const googleAuthCallback = asyncHandler(async (req, res) => {
    const token = jwt.sign(
        { userId: req.user._id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    });

    // Redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL}/google-auth-success`);
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', '', { maxAge: 0, httpOnly: true, path: '/' });
    return res.status(200).json({ message: 'Logout successful' });
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    console.log(user)

    if (!user) {
        return res.status(404).json({ message: 'No user found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    try {
        await sendResetEmail(email, resetToken);
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(500).json({ message: 'Error sending reset email' });
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;

    console.log(req.body);

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() }
    });

    console.log(user);

    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    user.password = await bcrypt.hash(newPassword, saltRounds);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
});

module.exports = {
    loginUser,
    registerUser,
    verifyToken,
    googleAuthCallback,
    logoutUser,
    forgotPassword,
    resetPassword
}