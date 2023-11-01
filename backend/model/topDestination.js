const mongoose = require("mongoose");

const topDestinationSchema  = new mongoose.Schema({
    destination:{
        type: String,
        required:[true , 'Please enter the destination name']
    },
    placeName:{
        type: String,
        required:[true, "please enter the location"]
    },
    image:{
            type: String,
            required: true
    }
})

module.exports = mongoose.model("TopDestination", topDestinationSchema)