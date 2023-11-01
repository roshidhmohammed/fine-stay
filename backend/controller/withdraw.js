const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Withdraw = require("../model/withdraw");
const Partner = require("../model/partner");
const { isPartner, isAdmin } = require("../middleware/auth");
const sendMail = require("../utils/sendMail");

// partner withdraw request
router.post(
  "/create-withdraw-request",
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawAmount } = req.body;
      const isPartnerExist = await Partner.findOne({ _id: req.partner._id });
      if (!isPartnerExist && !isPartnerExist.withdrawMethod) {
        return next(new ErrorHandler("This partner id doesn't exist", 400));
      } else {
        try {
          await sendMail({
            email: req.partner.email,
            subject: "Withdraw Request",
            message: `Hello ${req.partner.personName}, your withdraw request of amount ${withdrawAmount} is processing. It will take 2-5 days to processing... `,
          });
          res.status(201).json({
            success: true,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }

        const today = new Date();
        const dateFormat = (today) => {
          const day = String(today.getDate()).padStart(2, "0");
          const month = String(today.getMonth() + 1).padStart(2, "0");
          const year = String(today.getFullYear());
          return `${year}-${month}-${day}`;
        };
        const todayDate = dateFormat(today);
        const transaction = {
          amount: withdrawAmount,
          createdAt: todayDate,
        };
        const data = {
          partner: req.partner,
          amount: withdrawAmount,
          createdAt: todayDate,
        };
        isPartnerExist.availableBalance -= withdrawAmount;

        await isPartnerExist.save();

        await Withdraw.create(data);

        res.status(201).json({
          success: true,
          message: "Withdraw money request is successful!",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all withdraw request admin

router.get(
  "/get-all-withdraws",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allWithdraws = await Withdraw.find();

      res.status(200).json({
        success: true,
        allWithdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update withdraw status - admin

router.put(
  "/update-withdraw-status/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { partnerId } = req.body;
      const today = new Date();
      const dateFormat = (today) => {
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = String(today.getFullYear());
        return `${year}-${month}-${day}`;
      };
      const todayDate = dateFormat(today);
      const withdraw = await Withdraw.findOneAndUpdate(
        { _id: req.params.id },

        { status: "succeed", updatedAt: todayDate }
      );
      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        status: "succeed",
        createdAt: withdraw.createdAt,
        updatedAt: todayDate,
      };

      const updatePartner = await Partner.findById({ _id: partnerId });
      updatePartner.transaction = [...updatePartner.transaction, transaction];
      await updatePartner.save();

      try {
        sendMail({
          email: updatePartner.email,
          subject: "Payment Confirmation",
          message: ` Hello ${updatePartner.personName}, Your withdrawal request of amount ${withdraw.amount} is successfull. Amount will be credited in your bank account within 3-7 days, as per the bank rules.`,
        });

        res.status(201).json({
          success: true,
          message: "Successfully forward the withdraw request",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
