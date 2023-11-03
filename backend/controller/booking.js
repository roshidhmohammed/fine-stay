const express = require("express");
const router = express.Router();
const Booking = require("../model/booking");
const Property = require("../model/property");
const Partner = require("../model/partner");
const Coupon = require("../model/coupon");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { isPartner, isAuthenticated, isAdmin } = require("../middleware/auth");

// create booking

router.post(
  "/create-booking",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        roomsCount,
        totalPrice,
        userId,
        userName,
        appliedCouponName,
        checkinDate,
        checkoutdate,
        // mobileNumber,
        paymentId,
        paymentMode,
        paymentType,
        propertyId,
        propertyName,
      } = req.body;
      const today = new Date();
      const dateFormat = (today) => {
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = String(today.getFullYear());
        return `${year}-${month}-${day}`;
      };
      const todayDate = dateFormat(today);

      const newBooking = new Booking({
        totalPrice: totalPrice,
        paymentId: paymentId,
        paymentMode: paymentMode,
        paymentType: paymentType,
        userId: userId,
        userName: userName,
        propertyId: propertyId,
        propertyName: propertyName,
        // mobileNumber: mobileNumber,
        appliedCoupon: appliedCouponName,
        checkinDate: checkinDate,
        checkOutDate: checkoutdate,
        roomsCount: roomsCount,
        createdAt: todayDate,
      });
      await newBooking.save();

      const isProperty = await Property.findOne({ _id: propertyId });
      const decrementRoomsCount = isProperty.roomsCount - parseInt(roomsCount);

      const updateRoomsCount = await Property.findByIdAndUpdate(
        { _id: propertyId },
        { $set: { roomsCount: decrementRoomsCount } }
      );
      await updateRoomsCount.save();

      // add usedBy in coupon collection

      const usedCoupon = await Coupon.findOne({
        couponName: appliedCouponName,
      });

      if (usedCoupon) {
        await Coupon.findOneAndUpdate(
          { couponName: appliedCouponName },
          { $push: { usedBy: userId } }
        );
      }

      res.status(201).json({
        success: true,
        updateRoomsCount,
        newBooking,
        message: " Your Booking is Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all bookings admin partner

router.get(
  "/get-all-bookings",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allBookings = await Booking.find();

      res.status(200).json({
        success: true,
        allBookings,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// update booking status

router.post(
  "/update-booking-status",
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const bookingStatuses = req.body;
      const key = Object.keys(bookingStatuses)[0];
      const value = bookingStatuses[key];
      const isExistBookingStatus = await Booking.findOne({ _id: key });

      const today = new Date();
      const dateFormat = (today) => {
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = String(today.getFullYear());
        return `${year}-${month}-${day}`;
      };
      const todayDate = dateFormat(today);

      if (!isExistBookingStatus) {
        return next(new ErrorHandler("This Booking Id doesn't exist", 400));
      } else if (isExistBookingStatus.bookingStatus === value) {
        return next(new ErrorHandler("You didn't update booking status", 400));
      } else {
        if (value === "checked-in") {
          const getAmount = await Booking.findById({ _id: key });
          const isPartnerExist = await Partner.findOne({
            _id: req.partner._id,
          });
          if (getAmount.paymentMode === "Cash Payment") {
            await Partner.findByIdAndUpdate(
              { _id: req.partner._id },
              {
                availableBalance:
                  isPartnerExist.availableBalance -
                  (getAmount.totalPrice * 20) / 100,
              }
            );
          } else {
            await Partner.findByIdAndUpdate(
              { _id: req.partner._id },
              {
                availableBalance:
                  isPartnerExist.availableBalance +
                  (getAmount.totalPrice * 80) / 100,
              }
            );
          }
        }
        if (value === "checked-in") {
          const updateBookingStatus = await Booking.findByIdAndUpdate(
            { _id: key },
            { $set: { bookingStatus: value, checkinDate: todayDate } }
          );
          await updateBookingStatus.save();
        } else {
          const updateBookingStatus = await Booking.findByIdAndUpdate(
            { _id: key },
            { $set: { bookingStatus: value, checkOutDate: todayDate } }
          );
          await updateBookingStatus.save();
        }

        if (value === "checked-out") {
          const property = await Property.findOne({
            _id: isExistBookingStatus.propertyId,
          });
          const increment =
            property.roomsCount + isExistBookingStatus.roomsCount;
          const incrementRoomCount = await Property.findByIdAndUpdate(
            { _id: isExistBookingStatus.propertyId },
            { $set: { roomsCount: increment } }
          );
          await incrementRoomCount.save();
        }

        res.status(201).json({
          success: true,
          message: "Successfully Updated Guest's BookingStatus",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
