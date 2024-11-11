const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const categoryRoutes = require("./routes/categoriesRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const getProdBytitleRouter = require("./routes/getOneProdRoutes.js");
const uploadRoutes = require("./config/upload.js");
const express = require('express');
const router = require("./routes/authRoutes.js");
const http = require('http');
const { Server } = require('socket.io');
const chatrouter = require('./routes/chatRoutes');
const wishlistRoutes = require("./routes/wishlistRoutes");
const adminRoutes = require("./routes/adminRoutes.js");
const prisma = new PrismaClient();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ["GET", "POST"],
    credentials: true
  },
});
    


io.on('connection', (socket) => {
  console.log('ok');
  
  console.log('A user connected: ', socket.id);

  socket.on('sendMessage', (messageData) => {
    console.log('Message received: ', messageData);

    socket.to(messageData.receiverId).emit('receiveMessage', messageData); 
    socket.emit('receiveMessage', messageData);
  });

  socket.on('fetchChatHistory', ({ senderId, receiverId }) => {
    const chatHistory = getChatHistoryFromDatabase(senderId, receiverId);
    socket.emit('chatHistory', chatHistory);
  });
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chats", chatrouter);
app.use("/api/reviews", reviewRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/getProd", getProdBytitleRouter);
app.use("/api", uploadRoutes);
app.use("/api" , router)
app.use("/api", wishlistRoutes);
app.use("/api/admin", adminRoutes);




app.get('/api/admin/dashboard-stats', async (req, res) => {
  try {
    const [users, products, orders, categories] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.category.count(),
    ]);

    res.json({
      stats: {
        totalUsers: users,
        totalProducts: products,
        totalOrders: orders,
        totalCategories: categories
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        roles: true,
        isAdmin: true,
        _count: {
          select: {
            orders: true,
            products: true,
            reviews: true
          }
        }
      }
    });
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isAdmin) {
      return res.status(403).json({ error: "Cannot delete admin user" });
    }

    // Delete all related records first
    await prisma.$transaction([
      prisma.review.deleteMany({ where: { userId } }),
      prisma.order.deleteMany({ where: { userId } }),
      prisma.chat.deleteMany({ 
        where: { 
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      }),
      prisma.product.deleteMany({ where: { ownerId: userId } }),
      prisma.user.delete({ where: { id: userId } })
    ]);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


