const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
/* 🔥 NUEVO */
const http = require("http");
const { Server } = require("socket.io");
/* 🔥 NUEVO MODELO */
const Message = require("./models/Message");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const app = express();
/* 🔥 SERVER */
const server = http.createServer(app);
/* 🔥 SOCKET */
const io = new Server(server, {
cors: { origin: "*" }
});
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://jmartine203_db_user:c6Ca9x9teztwfful@cloudteams.dgeve6c.mongodb.net/cloudteams?retryWrites=true&w=majority")
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
/* 🔥 SOCKET LOGIC */
io.on("connection", (socket) => {
console.log("Usuario conectado:", socket.id);
/* 🔥 UNIRSE + HISTORIAL */
socket.on("joinChat", async (chatId) => {
   socket.join(chatId);
   // 🔥 TRAER MENSAJES GUARDADOS
   const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
   socket.emit("chatHistory", messages);
});
/* 🔥 ENVIAR MENSAJE */
socket.on("sendMessage", async (data) => {
   // 🔥 GUARDAR EN DB
   const newMsg = new Message(data);
   await newMsg.save();
   // 🔥 ENVIAR A TODOS EN EL CHAT
io.to(data.chatId).emit("newMessage", data);
});
});
/* 🔥 IMPORTANTE */
server.listen(3000, () => console.log("Servidor con sockets 🔥"));