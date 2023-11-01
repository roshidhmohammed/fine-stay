const mongoose = require("mongoose");

const AmenitiesSchema = new mongoose.Schema({
    AmenitiesName:{
        type: String,
        required:[true, "Please enter the amenities"]
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports =  mongoose.model("Amenity", AmenitiesSchema )