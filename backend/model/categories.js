const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required:[true, "please enter the category name"]
    },
    image:{
        type: String,
        required:[true, "please upload a image"]
    }
})

module.exports = mongoose.model("Category", categorySchema )