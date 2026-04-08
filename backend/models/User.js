const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  telefono: String,
  rol: String,
  password: String
});

module.exports = mongoose.model("User", UserSchema);