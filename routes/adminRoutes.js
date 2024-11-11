const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/dashboard-stats", verifyToken, isAdmin, adminController.getDashboardStats);
router.get("/users", verifyToken, isAdmin, adminController.getAllUsers);
router.delete("/users/:id", verifyToken, isAdmin, adminController.deleteUser);

module.exports = router;