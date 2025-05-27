// Validación de formulario de contacto -> contacto.js

export const validarEmail = (e) => {
    const feedbackEmail = document.querySelector("#feedbackEmail");
    let valor = e.target.value.trim()

    if (valor.length < 7) {
        feedbackEmail.classList.remove("success")
        feedbackEmail.classList.remove("error")
        feedbackEmail.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackEmail.innerHTML = "❌ El email debe tener al menos 7 caracteres"
        return
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
        return
    }

    feedbackEmail.classList.remove("error")
    feedbackEmail.classList.add("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackEmail.innerHTML = "✔️ Email válido"
}

export const validarNombre = (e) => {
    const feedbackName = document.querySelector("#feedbackName");
    let valor = e.target.value.trim()

    if (valor.length < 5) {
        feedbackName.classList.remove("success")
        feedbackName.classList.remove("error")
        feedbackName.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackName.innerHTML = "❌ El nombre y apellido debe tener al menos 5 caracteres"
        return
    }

    feedbackName.classList.remove("error")
    feedbackName.classList.add("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackName.innerHTML = "✔️ Nombre válido"
}

export const validarMensaje = (e) => {
    const feedbackMensaje = document.querySelector("#feedbackMensaje");
    let valor = e.target.value.trim()

    if (valor.length < 5 || valor.length > 250) {
        feedbackMensaje.classList.remove("success")
        feedbackMensaje.classList.remove("error")
        feedbackMensaje.classList.add("error")

        e.target.classList.remove("success")
        e.target.classList.remove("error")
        e.target.classList.add("error")

        feedbackMensaje.innerHTML = "❌ El mensaje debe tener al entre 5 y 250 caracteres"
        return
    }

    feedbackMensaje.classList.remove("error")
    feedbackMensaje.classList.add("success")
    e.target.classList.remove("error")
    e.target.classList.add("success")
    feedbackMensaje.innerHTML = "✔️ Mensaje válido"
}