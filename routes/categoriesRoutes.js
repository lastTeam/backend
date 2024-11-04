const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController"); // Adjust the path as needed

// Route to create a new category
router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
module.exports = router;
