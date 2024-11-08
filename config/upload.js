// upload.js

const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "doboaoxjf", // your cloud name
  api_key: "631382888486737", // your API key
  api_secret: "WDObb6yzHmfOWEHNKntugrS3-Ec", // your API secret
});

// Set up multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // The name of the folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif"], // Specify allowed formats
  },
});

// Create an instance of multer with the storage configuration
const upload = multer({ storage: storage });

const router = express.Router();

// Create an endpoint to handle file uploads
router.post("/upload", upload.single("file"), (req, res) => {
  // `file` is the name of the input field
  if (req.file) {
    // File uploaded successfully
    res.status(200).json({
      message: "File uploaded successfully!",
      url: req.file.path, // URL of the uploaded file in Cloudinary
    });
  } else {
    res.status(400).json({ message: "File upload failed." });
  }
});

module.exports = router;
