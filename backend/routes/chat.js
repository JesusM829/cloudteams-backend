const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Chat = require("../models/chat");

router.post("/mensaje", async (req, res) => {
  const msg = new Message(req.body);
  await msg.save();
  res.json(msg);
});

router.get("/mensajes", async (req, res) => {
  const mensajes = await Message.find();
  res.json(mensajes);
});

router.post("/private", async (req, res) => {
 const { user1, user2 } = req.body;
 let chat = await Chat.findOne({
   users: { $all: [user1, user2] }
 });
 if (!chat) {
   chat = new Chat({ users: [user1, user2] });
   await chat.save();
 }
 res.json(chat);
});

// 📩 MENSAJES POR CHAT (CLAVE)
router.get("/mensajes/:chatId", async (req, res) => {
 const mensajes = await Message.find({
   chatId: req.params.chatId
 });
 res.json(mensajes);
});

module.exports = router;