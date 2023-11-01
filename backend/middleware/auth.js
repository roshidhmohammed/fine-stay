const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const Partner = require("../model/partner");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await user.findById(decoded.id);

  next();
});

exports.isPartner = catchAsyncErrors(async (req, res, next) => {
  const { partner_token } = req.cookies;

  if (!partner_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(partner_token, process.env.JWT_SECRET_KEY);
  req.partner = await Partner.findById(decoded.id);

  next();
});

exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin = await user.findById(decoded.id);

    if (!admin) {
      return next(new ErrorHandler("admin details not found", 404));
    }

    if (admin.role === "admin") {
      next();
    } else {
      return next(new ErrorHandler("Access denied. you are not an admin", 403));
    }
  } catch (error) {
    // console.log(error.message)
    return next(new ErrorHandler("Access denied. you are not an admin", 500));
  }
});
