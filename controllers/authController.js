const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const signup = async (req, res) => {
  console.log("hhhh");

  try {
    const { firstName, lastName, username, email, password, roles } = req.body;
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        roles,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error signing up user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check for admin credentials
  if (email === "admin@crafty.com" && password === "admin123") {
    const token = jwt.sign({ role: "ADMIN" }, "your_secret_key", {
      expiresIn: "30h",
    });
    return res.status(200).json({ token, role: "ADMIN" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const hashedpass = await bcrypt.compare(password, user.password);
    if (!hashedpass) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.roles },
      "your_secret_key",
      { expiresIn: "30h" }
    );
    res.status(200).json({ token, role: user.roles });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = { signup, login };
