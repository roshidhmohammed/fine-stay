const express = require("express");
const router = express.Router();
const Banner = require("../model/banner");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");

// create banner img

router.post(
  "/create-banner-img",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { bannerName, image } = req.body;

      const isBannerExist = await Banner.findOne({
        bannerName: { $regex: bannerName, $options: "i" },
      });

      if (isBannerExist) {
        return next(
          new ErrorHandler("Entered banner name is already exist!", 400)
        );
      } else {
        const newBanner = new Banner({
          bannerName: bannerName,
          image: image,
        });
        await newBanner.save();

        res.status(201).json({
          success: true,
          newBanner,
          message: "New banner image created successfully!",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all banner img
router.get(
  "/get-all-banners",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allBanner = await Banner.find();
      res.status(200).json({
        success: true,
        allBanner,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//   select banner img

router.put(
  "/select-banner-img/",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.body;
      await Banner.updateMany({ isAvailable: 0 });

      const isBannerExist = await Banner.find({ _id: id });
      if (!isBannerExist) {
        return next(new ErrorHandler("requested banner doesn't exist", 400));
      } else {
        await Banner.findByIdAndUpdate({ _id: id }, { isAvailable: 1 });

        res.status(200).json({
          success: true,
          message: "Successfully selected your requested  image as banner",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get banner img user

router.get(
  "/get-banner-img-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userBannerImg = await Banner.find({ isAvailable: 1 });
      if (userBannerImg) {
        res.status(200).json({
          success: true,
          userBannerImg: userBannerImg[0]?.image,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
