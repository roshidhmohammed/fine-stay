const express = require("express");
const router = express.Router();
const Amenity = require("../model/amenities");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { escapeRegExp } = require("lodash");
const { isAdmin } = require("../middleware/auth");

router.post(
  "/create-amenities",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amenitiesName } = req.body;

      const isAmenitiesExist = await Amenity.findOne({
        AmenitiesName: { $regex: amenitiesName, $options: "i" },
      });
      if (isAmenitiesExist) {
        return next(new ErrorHandler("This amenity already exist", 400));
      } else {
        const amenities = new Amenity({
          AmenitiesName: amenitiesName,
        });
        await amenities.save();
        res.status(201).json({
          success: true,
          amenities,
          message: "Amenities Added successfully!",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, message, 500));
    }
  })
);

// get all amenities

router.get(
  "/get-all-amenties",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allAmenities = await Amenity.find();
      res.status(200).json({
        success: true,
        allAmenities,
      });
    } catch (error) {
      return next(new ErrorHandler(error, message, 500));
    }
  })
);

//  delete amenities

router.delete(
  "/delete-amenity/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const amenityId = req.params.id;
      const isAmenityExist = await Amenity.findById(amenityId);
      if (!isAmenityExist) {
        return next(new ErrorHandler("Request amenity id is not exist", 404));
      }
      await isAmenityExist.deleteOne({ _id: amenityId });

      res.status(200).json({
        success: true,
        message: "Amenities deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, message, 500));
    }
  })
);

module.exports = router;
