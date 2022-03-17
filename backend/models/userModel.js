const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "please enter your name"],
        maxLength: [30, "name can not exceed 30 characters"],
        minLength: [4, "must have atleast 5 characters"],
    },
    email:{
        type: String,
        required: [true, "please enter email"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid email"],
    },
    password:{
        type: String,
        required: [true, "must enter password"],
        minLength: [8, "must have atleast 8 characters"],
        select: false,
    },
    avatar:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    role:{
        type: String,
        default: "user",
    },

    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

// compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
  

// generating new pssword if forgotten password reset token
userSchema.methods.getResetPasswordToken = function(){
    // generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // const tokenCrypto = crypto.createHash('sha256').update(token).digest("hex");
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;

}

module.exports = mongoose.model("User", userSchema);