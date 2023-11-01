const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  bannerName: {
    type: String,
    required: [true, "Plase enter the banner name"],
  },
  image: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
