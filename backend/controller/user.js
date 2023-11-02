const express = require("express");
const User = require("../model/user");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin, isPartner } = require("../middleware/auth");

// create user

router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("user already Exist ", 400));
    }

    const result = await cloudinary.uploader.upload(avatar, {
      folder: "avatars",
    });

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `https://fine-stay-66q4.vercel.app/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Hello ${user.name}, Please click The Link To Activate Your Account: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please Check Your Email: ${user.email} To Activate Your Account!`,
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

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User Already Exist", 400));
      }

      user = await User.create({
        name,
        email,
        password,
        avatar,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all the fields!", 400));
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please enter the correct information", 400)
        );
      }
      if (user.isAvailable === 1) {
        return next(new ErrorHandler("you are blocked", 400));
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user

router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User already Exist", 400));
      }
      if (user.isAvailable === 1) {
        return next(new ErrorHandler("your account is blocked", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out User

router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log Out Successfull !!!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all users admin

router.get(
  "/get-all-users",
  isAdmin,
  isPartner,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allUsers = await User.find({ role: "user" });

      res.status(201).json({
        success: true,
        allUsers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// user block admin

router.put(
  "/block-user/:id",
  // isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const ids = req.params.id;
      const blockUser = await User.findByIdAndUpdate(
        { _id: ids },
        { $set: { isAvailable: 1 } }
      );

      res.status(201).json({
        success: true,
        blockUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// user unblock admin

router.put(
  "/unblock-user/:id",
  // isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const ids = req.params.id;
      const unblockUser = await User.findByIdAndUpdate(
        { _id: ids },
        { $set: { isAvailable: 0 } }
      );

      res.status(201).json({
        success: true,
        unblockUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// insert mobile number
router.post(
  "/insert-mobile-number",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { mobileNo, user } = req.body;
      // console.log(mobileNo, user)
      // const userId = await User.findById({_id:user})
      const isMobileNumberExist = await User.findOne({
        mobileNumber: mobileNo,
      });

      if (isMobileNumberExist) {
        return next(new ErrorHandler("this mobile number already exist", 400));
      } else {
        const update = await User.findByIdAndUpdate(
          { _id: user },
          { $set: { mobileNumber: mobileNo } }
        );
        res.status(201).json({
          success: true,
          update,
          message: "mobile number updated successfully!",
        });
      }

      // console.log(userId)
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// update profile

router.post(
  "/update-profile",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id, name, email, mobileNumber, avatar, prevAvatarId } = req.body;

      cloudinary.uploader.destroy(prevAvatarId, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          // console.log(result);
          console.log(`Image  deleted successfully.`);
        }
      });

      const result = await cloudinary.uploader.upload(avatar, {
        folder: "avatars",
      });

      const updateProfile = await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            email: email,
            mobileNumber: mobileNumber,
            avatar: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        }
      );
      await updateProfile.save();
      res.status(201).json({
        success: true,
        message: " Your profile details updated ",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get user  info with userid

router.get(
  "/user-info/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById({ _id: req.params.id });

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
