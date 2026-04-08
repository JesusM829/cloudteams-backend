const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
 text: String,
 sender: String,
 photo: String,
 chatId: String,
 createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Message", MessageSchema);