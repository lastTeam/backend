const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await prisma.category.create({
      data: {
        name: name,
      },
    });
    res.status(201).json({ category: newCategory });
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};
