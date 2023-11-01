const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: [true, "set the total price"],
  },
  paymentId: {
    type: String,
    // required: [true, " set the payment id"],
  },
  paymentMode: {
    type: String,
    required: [true, "select the payment mode"],
  },
  paymentType: {
    type: String,
    required: [true, "select the payment type"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    required: [true, "select the user name"],
  },
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
  },
  propertyName: {
    type: String,
    required: [true, "select the property name"],
  },
  mobileNumber: {
    type: String,
    required: [true, "select the mobile number"]
  },
  appliedCoupon: {
    type: String,
  },
  isCancelled: {
    type: String,
  },
  bookingStatus: {
    type: String,
    default: "booked"
  },
  checkinDate: {
    type: Date,
    required: [true, " select the check in date"],
  },
  checkOutDate: {
    type: Date,
    required: [true, " select the check out date"],
  },
  roomsCount: {
    type: Number,
    required: [true, " select the  rooms count"],
  },
  createdAt: {
    type: Date,
    // default: Date.now(),
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
