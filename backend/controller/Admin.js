const express = require("express");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const { isAdmin, isAuthenticated } = require("../middleware/auth");

// admin login

router.post(
  "/admin-login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all the fields", 400));
      }
      const admin = await User.findOne({ email }).select("+password");
      if (admin.role === "user") {
        return next(new ErrorHandler("you are not an admin", 400));
      }
      if (!admin) {
        return next(new ErrorHandler("you are not an admin", 400));
      }

      const isPassword = await admin.comparePassword(password);

      if (!isPassword) {
        return next(new ErrorHandler("please provide valid information", 400));
      }

      // if (admin.role === "admin") {
      sendToken(admin, 201, res);
      // }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// user news letter

router.post(
  "/send-news-letter",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, message } = req.body;
      if (name && email && message) {
        await sendMail({
          email: email,
          subject: "News Letter",
          message: `I am ${name}. ${message}`,
        });
        res.status(201).json({
          success: true,
          message: "Your newsletter successfully sent!",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
