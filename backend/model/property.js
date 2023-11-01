const mongoose = require("mongoose");
const Partner = require("./partner");

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, "Please enter the property name"],
  },
  partnerId: {
    type: mongoose.Types.ObjectId,
    ref: "Partner",
  },
  category: {
    type: String,
    required: [true, "Please enter the category"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    // {
    // type:String,
    // required:true
    // }
  ],
  price: {
    // type: String,
    type: Number,
    required: [true, "please enter your property price/night"],
  },
  description: {
    type: String,
    required: [true, "please enter the property description"],
  },
  roomsCount: {
    type: Number,
    required: [true, "please the total no of rooms in your property"],
  },
  amenities: {
    type: Array,
    required: [true, "Please select amenities available in your property"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  currentLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    placeName: {
      type: String,
      // default:"",
      required: true,
    },
  },
  reviews: [
    {
      user: {
        type: String,
      },
      userId: {
        type: String,
      },
      bookingId: {
        type: String,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Property", propertySchema);
