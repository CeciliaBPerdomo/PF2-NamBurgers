if (localStorage.getItem("usuario")) {
    location.assign("/")
}

var users = [];

if (localStorage.getItem("usuarios")) {
    users = JSON.parse(localStorage.getItem("usuarios"));
}

// Si no hay usuarios en el localStorage, creamos un usuario por defecto
if (users.length == 0) {
    location.assign("registro.html")
}

// Seleccionamos elementos del DOM
const loginForm = document.querySelector("#login-form");

// Email
const email = document.querySelector("#email");
const feedbackEmail = document.querySelector("#feedbackEmail");

// Password
const password = document.querySelector("#password");
const feedbackPassword = document.querySelector("#feedbackPassword");


// Validación de formulario
email.addEventListener("input", (e) => {
    validarEmail(e, e.target.value.trim());
});

password.addEventListener("input", (e) => {
    validarPassword(e, e.target.value.trim());
});


const validarEmail = (e, valor) => {
    if (valor.length < 7) {
        feedbackEmail.classList.remove("success")
        feedbackEmail.classList.remove("error")
        feedbackEmail.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackEmail.innerHTML = "❌ Debe tener al menos 7 caracteres"
        return false
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
    // Cambia aqui el mensaje de error, donde se indica que el email no está registrado
    if (!emails.includes(valor)) {
        feedbackEmail.classList.remove("success")
        feedbackEmail.classList.remove("error")
        feedbackEmail.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackEmail.innerHTML = "❌ Este email no está registrado"
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
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let valorEmail = email.value.trim();
    let valorPassword = password.value.trim();

    const isEmailValido = validarEmail(e, valorEmail);
    const isPasswordValida = validarPassword(e, valorPassword);

    if (isEmailValido && isPasswordValida) {
        let findUser = users.find((user) => user.email === valorEmail)
        if (findUser?.password !== valorPassword) {
            feedbackPassword.innerHTML = "❌Contraseña incorrecta"
        } else {
            localStorage.setItem("usuario", JSON.stringify(findUser))
            location.assign("/")
        }
    }
});