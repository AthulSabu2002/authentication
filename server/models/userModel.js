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
    loginAttempts: {
        type: Number,
        required: true,
        default: 0
    },
    lockUntil: {
        type: Date
    }
}, {
    timestamps: true,
});

userSchema.methods.isLocked = function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
};

const User = mongoose.model("User", userSchema);

module.exports = User;