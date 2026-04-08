const express = require("express");
const router = express.Router();
const User = require("../models/User");
// 🔍 BUSCAR USUARIOS
router.get("/search", async (req, res) => {
 const q = req.query.q;
 if (!q) return res.json([]);
 const users = await User.find({
   $or: [
     { nombre: new RegExp(q, "i") },
     { correo: new RegExp(q, "i") }
   ]
 }).limit(10);
 res.json(users);
});
module.exports = router;