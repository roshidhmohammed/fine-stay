const app = require("./app");
const connectDatabase = require("./db/database");
const cloudinary = require("cloudinary").v2;

// handling uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// connect db

connectDatabase();

// cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
