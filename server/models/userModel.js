const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    googleId: String,
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    otp: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;