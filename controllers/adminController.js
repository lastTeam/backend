const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const [users, products, orders, categories] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.category.count(),
    ]);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        product: {
          select: {
            title: true,
            basePrice: true
          }
        }
      }
    });

    res.status(200).json({
      stats: {
        totalUsers: users,
        totalProducts: products,
        totalOrders: orders,
        totalCategories: categories
      },
      recentOrders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        roles: true,
        createdAt: true,
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
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete user - Fixed version for your schema
exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent deletion of admin users
    if (user.roles === "ADMIN" || user.isAdmin) {
      return res.status(403).json({ error: "Cannot delete admin user" });
    }

    try {
      // Use transaction to ensure all deletes happen or none do
      await prisma.$transaction([
        // 1. Delete reviews by the user
        prisma.review.deleteMany({
          where: { userId }
        }),

        // 2. Delete chat messages sent or received by the user
        prisma.chat.deleteMany({
          where: {
            OR: [
              { senderId: userId },
              { receiverId: userId }
            ]
          }
        }),

        // 3. Delete orders related to user's products or made by the user
        prisma.order.deleteMany({
          where: {
            OR: [
              { userId },
              {
                product: {
                  ownerId: userId
                }
              }
            ]
          }
        }),

        // 4. Delete products owned by the user
        prisma.product.deleteMany({
          where: { ownerId: userId }
        }),

        // 5. Finally delete the user
        prisma.user.delete({
          where: { id: userId }
        })
      ]);

      res.status(200).json({ message: "User deleted successfully" });
    } catch (transactionError) {
      console.error('Transaction error:', transactionError);
      res.status(500).json({ error: "Error during deletion process" });
    }
  } catch (error) {
    console.error('Main error:', error);
    res.status(500).json({ error: "Something went wrong" });
  }
};