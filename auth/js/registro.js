if (localStorage.getItem("usuario")) {
    location.assign("index.html")
}

var users = [];

if (localStorage.getItem("usuarios")) {
    users = JSON.parse(localStorage.getItem("usuarios"));
}

// Seleccionamos elementos del DOM
const registerForm = document.querySelector("#register-form");

// Nombre
var nombre = document.querySelector("#name");
var feedbackNombre = document.querySelector("#feedbackName");

// Dirección
var direccion = document.querySelector("#address");
var feedbackDireccion = document.querySelector("#feedbackAddress");

// Telefono
var telefono = document.querySelector("#phone");
var feedbackTelefono = document.querySelector("#feedbackPhone");

// Email
var email = document.querySelector("#email");
var feedbackEmail = document.querySelector("#feedbackEmail");

// Contraseña
var password = document.querySelector("#password");
var feedbackPassword = document.querySelector("#feedbackPassword");


// Validación de formulario
nombre.addEventListener("input", (e) => {
    validarNombre(e, e.target.value.trim());
})

direccion.addEventListener("input", (e) => {
    validarDireccion(e, e.target.value.trim());
})

telefono.addEventListener("input", (e) => {
    validarTelefono(e, e.target.value.trim());
})

email.addEventListener("input", (e) => {
    validarEmail(e, e.target.value.trim());
})

password.addEventListener("input", (e) => {
    validarPassword(e, e.target.value.trim());
})

// Validación del nombre
const validarNombre = (e, valor) => {
    if (valor.length < 3) {
        feedbackNombre.classList.remove("success")
        feedbackNombre.classList.remove("error")
        feedbackNombre.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackNombre.innerHTML = "❌ Debe tener al menos 3 caracteres"
        return false;
    }
     feedbackNombre.classList.remove("success")
    feedbackNombre.classList.remove("error")
    feedbackNombre.classList.add("success")

    e.target.classList.remove("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackNombre.innerHTML = "✔️ Nombre válido"
    return true;
}

// Validación de dirección
const validarDireccion = (e, valor) => {
    if (valor.length < 5) {
        feedbackDireccion.classList.remove("success")
        feedbackDireccion.classList.remove("error")
        feedbackDireccion.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackDireccion.innerHTML = "❌ Debe tener al menos 5 caracteres"
        return false;
    }
    feedbackDireccion.classList.remove("success")
    feedbackDireccion.classList.remove("error")
    feedbackDireccion.classList.add("success")

    e.target.classList.remove("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackDireccion.innerHTML = "✔️ Dirección válida"
    return true;
}

// Validación de teléfono
const validarTelefono = (e, valor) => {
    if (valor.length < 6) {
        feedbackTelefono.classList.remove("success")
        feedbackTelefono.classList.remove("error")
        feedbackTelefono.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackTelefono.innerHTML = "❌ Debe tener al menos 6 caracteres"
        return false;
    }
    feedbackTelefono.classList.remove("success")
    feedbackTelefono.classList.remove("error")
    feedbackTelefono.classList.add("success")

    e.target.classList.remove("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackTelefono.innerHTML = "✔️ Teléfono válido"
    return true;
}

// Validación de email
const validarEmail = (e, valor) => {
    if (valor.length < 7) {
        feedbackEmail.classList.remove("success")
        feedbackEmail.classList.remove("error")
        feedbackEmail.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackEmail.innerHTML = "❌ Debe tener al menos 7 caracteres"
        return false;
    }
    let expresion = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
    if (!expresion.test(valor)) {
        feedbackEmail.classList.remove("success")
        feedbackEmail.classList.remove("error")
        feedbackEmail.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackEmail.innerHTML = "❌ El email no tiene un formato válido"
        return false
    }
    let emails = users.map((user) => user.email)
    if (emails.includes(valor)) {
        feedbackEmail.classList.remove("success")
        feedbackEmail.classList.remove("error")
        feedbackEmail.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")
        feedbackEmail.innerHTML = "❌ El email ya está registrado"
        return false
    }
    feedbackEmail.classList.remove("success")
    feedbackEmail.classList.remove("error")
    feedbackEmail.classList.add("success")

    e.target.classList.remove("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackEmail.innerHTML = "✔️ Correo electrónico válido"
    return true;
}

// Validación del password
const validarPassword = (e, valor) => {
    if (valor.length < 6) {
        feedbackPassword.classList.remove("success")
        feedbackPassword.classList.remove("error")
        feedbackPassword.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")
        feedbackPassword.innerHTML = "❌ Debe tener al menos 6 caracteres"
        return false
    }
    let expresion = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/;
    if (!expresion.test(valor)) {
        feedbackPassword.classList.remove("success")
        feedbackPassword.classList.remove("error")
        feedbackPassword.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")
        feedbackPassword.innerHTML = "❌ Debe contener al menos un número, una letra y un símbolo"
        return false
    }
    feedbackPassword.classList.remove("success")
    feedbackPassword.classList.remove("error")
    feedbackPassword.classList.add("success")

    e.target.classList.remove("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackPassword.innerHTML = "✔️ Contraseña válida"
    return true;
}


// Validación del formulario al enviar
registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const isNombreValido = validarNombre(e, nombre.value.trim());
    const isDireccionValida = validarDireccion(e, direccion.value.trim());
    const isTelefonoValido = validarTelefono(e, telefono.value.trim());
    const isEmailValido = validarEmail(e, email.value.trim());
    const isPasswordValida = validarPassword(e, password.value.trim());
    
    if (isNombreValido && isDireccionValida && isTelefonoValido && isEmailValido && isPasswordValida) {
        const nuevoUsuario = {
            nombre: nombre.value.trim(),
            direccion: direccion.value.trim(),
            telefono: telefono.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };
        users.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(users));
        location.assign("inicio.html");
    }
})
