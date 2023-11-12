const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // frontend
    origin: "https://fine-stay.vercel.app",
    credentials: true,
  })
);
app.use("/test", (req, res)=>{
  res.send("Hello World");
});
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


// config

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
const partner = require("./controller/partner");
const property = require("./controller/property");
const admin = require("./controller/Admin");
const coupon = require("./controller/coupon");
const amenities = require("./controller/amenities");
const topDestination = require("./controller/topDestination");
const categories = require("./controller/categories");
const payment = require("./controller/payment");
const booking = require("./controller/booking");
const withdraw = require("./controller/withdraw");
const conversation = require("./controller/conversation");
const messages = require("./controller/messages");
const banner = require("./controller/banner");

app.use("/api/v2/user", user);
app.use("/api/v2/partner", partner);
app.use("/api/v2/property", property);
app.use("/api/v2/admin", admin);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/amenities", amenities);
app.use("/api/v2/topDestination", topDestination);
app.use("/api/v2/categories", categories);
app.use("/api/v2/payment", payment);
app.use("/api/v2/booking", booking);
app.use("/api/v2/withdraw", withdraw);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/messages", messages);
app.use("/api/v2/banner", banner);

// it's for error handling
app.use(ErrorHandler);

module.exports = app;
