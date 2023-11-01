const mongoose = require("mongoose");


const CouponSchema = new mongoose.Schema({
    couponName:{
        type: String,
        required:[true, "please enter the coupon name"]
    },
    discount:{
        type: String,
        required:[true, "please enter the discount percentage"]
    },
    minAmount:{
        type: Number,
        required:[ true, "please enter the min amount"]
    },
    usedBy:[{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Coupon", CouponSchema)