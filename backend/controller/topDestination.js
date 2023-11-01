const express = require("express");
const router = express.Router();
const TopDestination = require("../model/topDestination");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { isAdmin } = require("../middleware/auth");

// create topDestination

router.post(
  "/create-top-destination",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { destinationName, destinationPlace, image } = req.body;

      const destination = await TopDestination.findOne({
        destination:{$regex: destinationName, $options:'i'},
      });
      if (destination) {
        return next(
          new ErrorHandler("Entered Destination is Already Listed!", 400)
        );
      } else {
        const newDestination = new TopDestination({
          destination: destinationName,
          placeName: destinationPlace,
          image: image,
        });
        await newDestination.save();

        res.status(201).json({
          success: true,
          newDestination,
          message: "New destination created successfully!",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all destination admin && user

router.get(
  "/get-all-destination",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allDestination = await TopDestination.find();
      res.status(200).json({
        success: true,
        allDestination,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
