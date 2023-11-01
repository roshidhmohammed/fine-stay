const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Conversation = require("../model/conversation");
const { isPartner, isAuthenticated } = require("../middleware/auth");

// create a new conversation

router.post(
  "/create-new-conversation",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, propertyId } = req.body;

      const isConversationExist = await Conversation.findOne({ groupTitle });

      if (isConversationExist) {
        const coversation = isConversationExist;
        res.status(201).json({
          success: true,
          coversation,
        });
      } else {
        const conversation = new Conversation({
          members: [userId, propertyId],
          groupTitle: groupTitle,
        });
        await conversation.save();

        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get partner conversations

router.get(
  "/get-all-conversations-partner/:id",
  isPartner,
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const propConversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ createdAt: -1, updatedAt: -1 });

      res.status(201).json({
        success: true,
        propConversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get user conversation

router.get(
  "/get-all-conversations-user/:user/:prop",
  isAuthenticated,
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userConversation = await Conversation.find({
        members: {
          $in: [req.params.user] && [req.params.prop],
        },
      }).sort({ createdAt: -1, updatedAt: -1 });

      res.status(201).json({
        success: true,
        userConversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update last message

router.put(
  "/update-last-message/:id",
  isAuthenticated,
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
