const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.sendMessage = async (req, res) => {
  const { message, senderId, receiverId } = req.body;
  console.log(senderId);
  
  try {
    const newMessage = await prisma.chat.create({
      data: { message, senderId, receiverId },
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const messages = await prisma.chat.findMany();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
