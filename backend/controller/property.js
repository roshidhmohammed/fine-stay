const express = require("express");
const Property = require("../model/property");
const router = express.Router();
const Partner = require("../model/partner");
const cloudinary = require("cloudinary").v2;
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { isPartner, isAdmin, isAuthenticated } = require("../middleware/auth");
const property = require("../model/property");

// create property
router.post(
  "/create-property",
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        propertyName,
        category,
        price,
        amenities,
        description,
        currentLocation,
        images,
        roomsCount,
        partnerId,
      } = req.body;
      const partnerIds = await Partner.findById({ _id: partnerId });
      if (!partnerIds) {
        return next(new ErrorHandler("partner id is invalid", 400));
      } else {
        let img = [];
        if (typeof images === "string") {
          img.push(images);
        } else {
          img = images;
        }
        let imgLinks = [];

        for (let i = 0; i < img.length; i++) {
          const result = await cloudinary.uploader.upload(img[i], {
            folder: "propertyImages",
          });
          imgLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const property = new Property({
          propertyName: propertyName,
          category: category,
          price: price,
          amenities: amenities,
          roomsCount: roomsCount,
          description: description,
          currentLocation: currentLocation,
          partnerId: partnerId,
          images: imgLinks,
        });
        await property.save();
        res.status(201).json({
          success: true,
          property,
          message: `Property added successfully!`,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all propperties registered for the each partner

router.get(
  "/get-all-properties-partner/:id",
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // const currentPartnerId = req.params.id
      // const propertyPartnerId = req.property.partnerId
      const filterProperty = await Property.find({ partnerId: req.params.id });

      // if(propertyMatch.length===0){
      //   return next(new ErrorHandler("No properties found", 400))
      // } else {
      res.status(200).json({
        success: true,
        filterProperty,
      });
      // }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// delete properties

router.delete(
  "/delete-partner-property/:id",
  isAdmin,
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const ids = req.params.id;
      const deleteProperty = await Property.findById(ids);

      if (!deleteProperty) {
        return next(
          new ErrorHandler("property is not found with this id", 404)
        );
      }

      for (let i = 0; i < deleteProperty.images.length; i++) {
        const result = await cloudinary.uploader.destroy(
          deleteProperty.images[i].public_id,
          { folder: "propertyImages" }
        );
      }
      await deleteProperty.deleteOne({ _id: ids });
      res.status(200).json({
        success: true,
        message: "Property deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all properties

router.get(
  "/get-all-properties",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const propertiesListed = await Property.find();

      res.status(201).json({
        success: true,
        propertiesListed,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  "/search-properties",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const searchData = req.query;
      const locations = req.query.place;
      // const startDate = searchData.startDate
      // const endDate = searchData.endDate
      // const roomsCount = searchData.roomsCount
      // const adultCount = searchData.adultCount
      // const childrenCount = searchData.childrenCount
      // console.log(location.data)

      // const locationString = JSON.stringify({location})
      // console.log(typeof locationString)
      // const locations = location.toString()
      // const currentLocation= {}

      const searchProperties = await Property.find({
        "currentLocation.placeName": { $regex: locations, $options: "i" },
      });
      // console.log(searchProperties)
      res.status(201).json({
        success: true,
        // searchProperties,
        searchData,
        locations,
        // startDate,
        // endDate,
        // roomsCount,
        // adultCount,
        // childrenCount
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all properties of partner admin

router.get(
  "/all-partner-properties-admin/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const partnerIds = req.params.id;
      const partnerAllProperties = await Property.find({
        partnerId: partnerIds,
      });
      res.status(201).json({
        success: true,
        partnerAllProperties,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// add new review

router.post(
  "/add-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { reviewComment, rating, propertyId, userName, userId, bookingid } =
        req.body;
      const newReview = {
        user: userName,
        userId: userId,
        bookingId: bookingid,
        rating: rating,
        comment: reviewComment,
      };
      const isProperty = await Property.findById({ _id: propertyId });
      const isReviewExist = isProperty.reviews.find(
        (item) => item.bookingId === bookingid
      );
      if (isReviewExist) {
        return next(
          new ErrorHandler("you already given your valuable feedback", 400)
        );
      } else {
        const insertReview = await Property.findByIdAndUpdate(
          { _id: propertyId },
          { $push: { reviews: newReview } }
        );
        const prevRating = isProperty.rating;
        if (prevRating === 0) {
          await Property.findByIdAndUpdate(
            { _id: propertyId },
            { $set: { rating: prevRating + rating } }
          );
        } else {
          await Property.findByIdAndUpdate(
            { _id: propertyId },
            { $set: { rating: (prevRating + rating) / 2 } }
          );
        }
        await insertReview.save();

        res.status(201).json({
          success: true,
          message: "Thank you for giving valuable feedback",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// delete property admin

router.delete("/admin-delete-property/:id",isAdmin, isPartner, catchAsyncErrors(async(req, res, next)=>{
  try {
    const isPropertyExist = await Property.find({_id:req.params.id})
    if(!isPropertyExist){
      return next(new ErrorHandler("This property doesn't id exist", 400))
    } else {
      await Property.findByIdAndDelete({_id:req.params.id})
      res.status(200).json({
        success:true,
        message:"Your requested property deleted successfully!"
      })
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}))

module.exports = router;
