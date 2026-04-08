function login() {
  fetch("https://cloudteams-backend.onrender.com/api/auth/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      correo: correo.value,
      password: password.value
    })
  })
  .then(async res => {
    const data = await res.json();

    console.log("LOGIN DATA:", data);

    // 🔥 ASEGURAR DATOS (FIX CLAVE)
    if(!res.ok){
      if(data.message === "No existe"){
        showError("Usuario no registrado");
      }
      else if(data.message === "Contraseña incorrecta"){
        showError("Contraseña incorrecta");
      }
      else {
        showError("Error en el servidor");
      }
    return;
}
    const userData = {
      nombre: data.nombre || "Usuario",
      apellido: data.apellido || "",
      correo: data.correo || correo.value,
      password: password.value
    };

    // 🔥 GUARDAR USUARIO COMPLETO
    localStorage.setItem("user", JSON.stringify(userData));

    // 🔥 GUARDAR NOMBRE
    localStorage.setItem("userName", userData.nombre);

    // 🔥 REDIRIGIR
    window.location.href = "chat.html";
  });
}

function goRegister(){
  window.location.href = "register.html";
}

function goLogin(){
  window.location.href = "login.html";
}

/* 🔥 REGISTER */
function register() {

  if (!nombre.value || !apellido.value || !correo.value || !telefono.value || !password.value || !rol.value) {
    alert("Todos los campos son obligatorios");
    return;
  }

  fetch("https://cloudteams-backend.onrender.com/api/auth/register", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      nombre: nombre.value,
      apellido: apellido.value,
      correo: correo.value,
      telefono: telefono.value,
      password: password.value,
      rol: rol.value
    })
  })
  .then(res => res.json())
  .then(data => {

    console.log("REGISTER DATA:", data);

    alert("Usuario registrado");

    // 🔥 ASEGURAR DATOS (FIX CLAVE)
    const userData = {
      nombre: nombre.value,
      apellido: apellido.value,
      correo: correo.value,
      password: password.value,
      telefono: telefono.value,
      rol: rol.value
    };

    // 🔥 GUARDAR USUARIO COMPLETO
    localStorage.setItem("user", JSON.stringify(userData));

    // 🔥 GUARDAR NOMBRE
    localStorage.setItem("userName", nombre.value);

    // 🔥 REDIRIGIR
    window.location.href = "chat.html";
  })
  .catch(error => {
    console.error("ERROR EN REGISTER:", error);
    alert("Error al registrar");
  });
}