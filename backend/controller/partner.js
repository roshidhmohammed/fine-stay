const express = require("express");
const Partner = require("../model/partner");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendPartnerToken = require("../utils/partnerToken");
const { isAuthenticated, isPartner, isAdmin } = require("../middleware/auth");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");



// create activation token

const createActivationToken = (partner) => {
  return jwt.sign(partner, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// create partner

router.post("/create-partner", async (req, res, next) => {
  try {
    const { personName, propertyName, email, mobileNumber, password, avatar } =
      req.body;
    const partnerEmail = await Partner.findOne({ email });

    if (partnerEmail) {
      return next(new ErrorHandler("Partner already exist", 400));
    }

    const avatarResult = await cloudinary.uploader.upload(avatar, {
      folder: "partnerAvatars",
    });

    const partner = {
      personName: personName,
      propertyName: propertyName,
      email: email,
      mobileNumber: mobileNumber,
      password: password,
      avatar: {
        public_id: avatarResult.public_id,
        url: avatarResult.secure_url,
      },
    };

    const activationToken = createActivationToken(partner);

    const activationUrl = `https://fine-stay.vercel.app/partner/activation/${activationToken}`;

    try {
      await sendMail({
        email: partner.email,
        subject: "Activate your Account",
        message: `Hello ${partner.personName}, please click the link to activate your account ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `please Check the email: ${partner.email} To activate your Account!`,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});



// activate partner
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newPartner = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newPartner) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const {
        personName,
        propertyName,
        email,
        mobileNumber,
        avatar,
        password,
      } = newPartner;
      let partner = await Partner.findOne({ email });
      if (partner) {
        return next(new ErrorHandler("User already exist", 400));
      }

      partner = await Partner.create({
        personName,
        propertyName,
        email,
        mobileNumber,
        password,
        avatar,
      });
      sendPartnerToken(partner, 201, res);
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login partner

router.post(
  "/login-partner",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all the fields", 400));
      }

      const user = await Partner.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please enter the correct information", 400)
        );
      }
      sendPartnerToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load partner

router.get(
  "/getPartner",
  isPartner,
  catchAsyncError(async (req, res, next) => {
    try {
      const partner = await Partner.findById(req.partner._id);
      if (!partner) {
        return next(new ErrorHandler("Partner already exist", 400));
      }

      res.status(200).json({
        success: true,
        partner,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// partner logout
router.get(
  "/logout",
  isPartner,
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("partner_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "logout successfull!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all partners admin

router.get(
  "/get-all-partners",
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const allPartners = await Partner.find();

      res.status(201).json({
        success: true,
        allPartners,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// withdraw method update

router.put(
  "/create-withdraw-method",
  isPartner,
  catchAsyncError(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;
      const isPartner = await Partner.findOne({ _id: req.partner._id });
      if (!isPartner) {
        return next(
          new ErrorHandler("Requested Partner Id doesn't exist", 400)
        );
      } else {
        const updateWithdraw = await Partner.findByIdAndUpdate(
          { _id: req.partner._id },
          { withdrawMethod: withdrawMethod }
        );

        res.status(201).json({
          success: true,
          message: "Withdraw Details Updated Successfully",
        });
      }
      console.log(isPartner);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// withdraw method delete

router.delete(
  "/delete-withdraw-method",
  isPartner,
  catchAsyncError(async (req, res, next) => {
    try {
      const isPartnerExist = await Partner.findOne({ _id: req.partner._id });
      if (!isPartnerExist) {
        return next(
          new ErrorHandler("your requested partner id doesn't exist", 400)
        );
      } else {
        isPartnerExist.withdrawMethod = null;
        await isPartnerExist.save();
        res.status(201).json({
          success: true,
          message: " Withdraw method deleted successfully",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//  update partner info
router.put(
  "/update-partner-info",
  isPartner,
  catchAsyncError(async (req, res, next) => {
    try {
      const {
        partnerName,
        mobNumb,
        currentPassword,
        image,
        newPassword,
        oldEmail,
        prevAvatarId,
      } = req.body;
      const isPartnerExist = await Partner.findOne({ email: oldEmail }).select(
        "+password"
      );
      if (!isPartnerExist) {
        return next(new ErrorHandler("Partner doesn't exist", 400));
      } else {
        const isPasswordValid = await isPartnerExist.comparePassword(
          currentPassword
        );
        if (!isPasswordValid) {
          return next(
            new ErrorHandler(
              "Your current password is incorrect. Please provide the correct info!",
              400
            )
          );
        }

        await cloudinary.uploader.destroy(prevAvatarId, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            console.log(`Image  deleted successfully.`);
          }
        });
        const avatarResult = await cloudinary.uploader.upload(image, {
          folder: "partnerAvatars",
        });
        isPartnerExist.personName = partnerName;
        isPartnerExist.mobileNumber = mobNumb;
        isPartnerExist.password = newPassword;
        isPartnerExist.avatar = {
          public_id: avatarResult.public_id,
          url: avatarResult.secure_url,
        };
        await isPartnerExist.save();

        res.status(201).json({
          success: true,
          message: "Your Profile Info updated Successfully!",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
