const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const partnerSchema = new mongoose.Schema({
  personName: {
    type: String,
    required: [true, "Enter your name"],
  },
  propertyName: {
    type: String,
    required: [true, "Enter your property name"],
  },
  email: {
    type: String,
    required: [true, "Enter your property email address"],
  },
  mobileNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  withdrawMethod:{
    type: Object
  },
  availableBalance:{
    type:Number,
    default: 0
  },
  transaction:[
    {
      amount:{
        type:Number,
        required:true
      },
      status:{
        type: String,
        default:"processing..."
      },
      createdAt:{
        type: Date,
      },
      updatedAt:{
        type: Date,
      },
    }
  ],


  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
partnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
partnerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
partnerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Partner", partnerSchema);
