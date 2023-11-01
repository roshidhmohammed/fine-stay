const express = require("express");
const router = express.Router();
const Category = require("../model/categories");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { isAdmin } = require("../middleware/auth");

// create category

router.post(
  "/create-category",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { categoryName, categoryImage } = req.body;
      const isCategoryExist = await Category.findOne({
        categoryName: { $regex: categoryName, $options: "i" },
      });
      if (isCategoryExist) {
        return next(new ErrorHandler("This category is already exist", 400));
      } else {
        const newCategory = new Category({
          categoryName: categoryName,
          image: categoryImage,
        });
        await newCategory.save();
        res.status(201).json({
          success: true,
          newCategory,
          message: "New category created succesfully!",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all categories
router.get(
  "/get-all-categories",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allCategories = await Category.find();

      res.status(200).json({
        success: true,
        allCategories,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
