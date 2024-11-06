const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const chatRoutes = require("./routes/chatRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const categoryRoutes = require("./routes/categoriesRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const router = require("./routes/authRoutes.js");
const getProdBytitleRouter = require("./routes/getOneProdRoutes.js");
const uploadRoutes = require("./config/upload.js");
const wishlistRoutes = require("./routes/wishlistRoutes");
const app = express();
// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes); // Corrected duplicate 'userRoutes' variable
app.use("/api/orders", orderRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes); // Updated to use 'authRoutes'
app.use("/api/cart", cartRoutes);
app.use("/api/getProd", getProdBytitleRouter);
app.use("/api", router);
app.use("/api", uploadRoutes);
app.use("/api", wishlistRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
