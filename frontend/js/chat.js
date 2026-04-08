const socket = io("https://cloudteams-backend.onrender.com");
// 🔥 UNIRSE AL CHAT
window.onload = () => {
 socket.emit("joinChat", "chat-general");
};
// 🔥 ENVIAR MENSAJE
function sendMessage() {
 const input = document.querySelector("input");
 const mensaje = input.value;
 if (!mensaje) return;
 const user = JSON.parse(localStorage.getItem("user"));
 const data = {
   chatId: "chat-general",
   text: mensaje,
   user: user.nombre
 };
 socket.emit("sendMessage", data);
 input.value = "";
}
// 🔥 RECIBIR MENSAJES
socket.on("newMessage", (data) => {
 const chatBox = document.querySelector(".chat-box");
 const msg = document.createElement("div");
 msg.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
 chatBox.appendChild(msg);
});