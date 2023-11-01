const mongoose = require("mongoose")

const withdrawSchema = new mongoose.Schema({
    partner: {
        type: Object,
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    status:{
        type: String,
        default:"processing..."
    },
    createdAt:{
        type: Date,
    },
    updatedAt:{
        type: Date,
    }
})
module.exports  = mongoose.model("Withdraw", withdrawSchema);