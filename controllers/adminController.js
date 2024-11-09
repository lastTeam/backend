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

// Delete user
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

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};