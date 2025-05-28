// Validación de formulario de contacto -> contacto.js

export const validarEmail = (valor, e) => {
    const feedbackEmail = document.querySelector("#feedbackEmail");

    if (valor.length < 7) {
        feedbackEmail.classList.remove("success")
        feedbackEmail.classList.remove("error")
        feedbackEmail.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackEmail.innerHTML = "❌ El email debe tener al menos 7 caracteres"
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

    feedbackEmail.classList.remove("error")
    feedbackEmail.classList.add("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackEmail.innerHTML = "✔️ Email válido"
    return true
}

export const validarNombre = (valor, e) => {
    const feedbackName = document.querySelector("#feedbackName");

    if (valor.length < 5) {
        feedbackName.classList.remove("success")
        feedbackName.classList.remove("error")
        feedbackName.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackName.innerHTML = "❌ El nombre y apellido debe tener al menos 5 caracteres"
        return false
    }

    feedbackName.classList.remove("error")
    feedbackName.classList.add("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackName.innerHTML = "✔️ Nombre válido"
    return true
}

export const validarMensaje = (valor, e) => {
    const feedbackMensaje = document.querySelector("#feedbackMensaje");

    if (valor.length < 5 || valor.length > 250) {
        feedbackMensaje.classList.remove("success")
        feedbackMensaje.classList.remove("error")
        feedbackMensaje.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackMensaje.innerHTML = "❌ El mensaje debe tener al entre 5 y 250 caracteres"
        return false
    }

    feedbackMensaje.classList.remove("error")
    feedbackMensaje.classList.add("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackMensaje.innerHTML = "✔️ Mensaje válido"
    return true
}