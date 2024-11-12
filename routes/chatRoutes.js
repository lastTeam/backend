const express = require('express');
const chatController = require('../controllers/chatController');

const chatrouter = express.Router();

chatrouter.post('/send', chatController.sendMessage);
chatrouter.get('/history', chatController.getChatHistory);

module.exports = chatrouter;
