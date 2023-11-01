const express = require("express")
const router = express.Router()
const stripe = require("stripe") (process.env.STRIPE_SECRET_KEY)
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");




router.post("/create-payment-intent", catchAsyncErrors(async(req, res, next) =>{
    const total  = req.body.total
    const paymentIntent   = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "inr",
        // automatic_payment_methods: {
        //     enabled: true,
        //   },
        payment_method_types: ['card'],
        metadata: {
            integration_check: 'accept_a_payment',
          },
          
        // company : "hotel"
    })
    res.status(201).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

}))

router.get('/stripeapikey', catchAsyncErrors( async( req, res,next) =>{
    res.status(200).json({
        success: true,
        stripeApiKey:process.env.STRIPE_PUBLISHABLE_KEY
    })
}))



module.exports = router;