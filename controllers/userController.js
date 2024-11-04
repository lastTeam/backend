const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      roles = "BUYER", // Default to BUYER if not provided
      isAdmin = false,
    } = req.body;

    // Ensure roles is valid
    if (!["BUYER", "SELLER"].includes(roles)) {
      return res.status(400).json({ error: "Invalid role provided" });
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password, // Note: In production, hash the password before saving
        roles,
        isAdmin,
      },
    });
    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
