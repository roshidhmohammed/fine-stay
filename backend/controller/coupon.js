const express = require("express");
const Coupon = require("../model/coupon");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { isAdmin, isAuthenticated } = require("../middleware/auth");

// create coupon

router.post(
  "/create-coupon",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { couponName, discount, minAmount } = req.body;
      const isCouponCodeExist = await Coupon.findOne({
        couponName: { $regex: couponName, $options: "i" },
      });
      if (isCouponCodeExist) {
        return next(new ErrorHandler("This coupon code is exist", 400));
      } else {
        const couponCode = new Coupon({
          couponName: couponName,
          discount: discount,
          minAmount: minAmount,
        });
        await couponCode.save();
        res.status(201).json({
          success: true,
          couponCode,
          message: "Coupon created successfully!",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all coupons admin
router.get(
  "/get-all-coupons",
  // isAdmin,
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allCoupons = await Coupon.find();
      res.status(200).json({
        success: true,
        allCoupons,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete coupon admin

router.delete(
  "/delete-coupon/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponId = req.params.id;
      const isCouponAvailable = await Coupon.findById(couponId);
      if (!isCouponAvailable) {
        return next(new ErrorHandler("Coupon is not found with this id", 404));
      }
      await isCouponAvailable.deleteOne({ _id: couponId });

      res.status(200).json({
        success: true,
        message: "Coupon deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
