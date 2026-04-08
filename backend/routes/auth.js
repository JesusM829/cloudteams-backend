const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
/* 🔥 REGISTER CORREGIDO */
router.post("/register", async (req, res) => {
 try {
   let { nombre, apellido, correo, telefono, rol, password } = req.body;
   // 🔥 NORMALIZAR CORREO (NUEVO 🔥)
   correo = correo.trim().toLowerCase();
   // 🔥 VALIDACIÓN BACKEND
   if (!nombre || !apellido || !correo || !telefono || !rol || !password) {
     return res.status(400).json({ message: "Faltan campos" });
   }
   // 🔥 VALIDAR SI YA EXISTE
   const existe = await User.findOne({ correo });
   if (existe) {
     return res.status(400).json({ message: "El usuario ya existe" });
   }
   const hash = await bcrypt.hash(password, 10);
   const user = new User({
     nombre,
     apellido,
     correo, // 🔥 ya normalizado
     telefono,
     rol,
     password: hash
   });
   await user.save();
   res.json({ message: "Usuario registrado correctamente", user });
 } catch (error) {
   console.error("🔥 ERROR REGISTER:", error);
   res.status(500).json({ message: "Error en el servidor" });
 }
});
/* 🔥 LOGIN (SIN CAMBIOS) */
router.post("/login", async (req, res) => {
 let { correo, password } = req.body;
 // 🔥 NORMALIZAR CORREO (NUEVO 🔥)
 correo = correo.trim().toLowerCase();
 const user = await User.findOne({ correo });
 if (!user) return res.status(404).json({ message: "No existe" });
 const valid = await bcrypt.compare(password, user.password);
 if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });
 res.json(user);
});
module.exports = router;