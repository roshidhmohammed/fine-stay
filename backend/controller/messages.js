const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Messages = require("../model/messages");
const { isAuthenticated, isPartner } = require("../middleware/auth");
const cloudinary = require("cloudinary").v2;

// create new messages

router.post(
  "/create-new-messages",
  isAuthenticated,
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messagesData = req.body;

      if (req.body.images) {
        const cloudImg = await cloudinary.uploader.upload(req.body.images, {
          folder: "messages",
        });
        messagesData.images = {
          public_id: cloudImg.public_id,
          url: cloudImg.secure_url,
        };
      }

      messagesData.conversationId = messagesData.conversationId;
      messagesData.sender = messagesData.sender;
      messagesData.text = messagesData.text;

      const message = new Messages({
        conversationId: messagesData.conversationId,
        sender: messagesData.sender,
        text: messagesData.text,
        images: messagesData.images ? messagesData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all messages with conversation id

router.get(
  "/get-all-messages/:id",
  isAuthenticated,
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
