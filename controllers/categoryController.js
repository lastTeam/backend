const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body; // Extracting name from request body

    // Creating a new category
    const newCategory = await prisma.category.create({
      data: {
        name: name, // Use the extracted name
      },
    });

    // Responding with the created category
    res.status(201).json({ category: newCategory });
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};
