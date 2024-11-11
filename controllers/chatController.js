const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Send Message
exports.sendMessage = async (req, res) => {
  const { message, senderId, receiverId } = req.body;
  console.log("Message:", message);
  
  try {
    const newMessage = await prisma.chat.create({
      data: {
        message,
        senderId,
        receiverId,
      },
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Get Chat History between Two Users
exports.getChatHistory = async (req, res) => {
  // const { senderId, receiverId } = req.query;

  try {
    const messages = await prisma.chat.findMany();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
