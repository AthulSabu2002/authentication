const asyncHandler = require("express-async-handler");
const async = require('async');
const bcrypt = require('bcrypt');


const User = require('../models/userModel');



const loginUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;
  
  console.log(req.body)
  
  
  res.status(200).json({ message: 'got data' });
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

    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully.' });
});


module.exports = {
    loginUser,
    registerUser
}