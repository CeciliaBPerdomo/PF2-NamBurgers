import { leerArchivo, mostrarProductos, verMas } from "./js/productos.js"
import { leerCategoria, mostrarCategorias, setearFiltros } from "./js/categorias.js"
import { mostrarCarrito } from "./js/carrito.js"
import { validarEmail, validarNombre, validarMensaje } from "./js/contacto.js"

var catalogo = []
var categoria = []

// Productos
const btnMore = document.querySelector("#btnMore")

//Navbar
const navbar = document.querySelector("#navbar")
const btnMenu = document.querySelector("#btnMenu")
const btnCarrito = document.querySelector("#btnCarrito")
const cart = document.getElementById("cart")


// Formulario de contacto 
// Seleccionamos elementos del DOM
const loginForm = document.querySelector("#formulario");

// Nombre y apellido
const nombre = document.querySelector("#name");
const feedbackName = document.querySelector("#feedbackName");

// Email
const email = document.querySelector("#email");
const feedbackEmail = document.querySelector("#feedbackEmail");

// Mensaje (TextArea)
const mensaje = document.querySelector("#mensaje");
const feedbackMensaje = document.querySelector("#feedbackMensaje");

// Productos
catalogo = await leerArchivo()
mostrarProductos(catalogo)

btnMore.addEventListener("click", (e) => {
    verMas(e, catalogo)
})

// Categorias
categoria = await leerCategoria()
mostrarCategorias(categoria)

// Filtrar por categoria
const inputCategorias = document.querySelectorAll("[name='categoria']")
inputCategorias.forEach((input) => {
    input.addEventListener("change", (e) => {
        setearFiltros(e, catalogo)
    })
})

// Menu
btnMenu.addEventListener("click", (e) => {
    e.preventDefault();
    //   cart.classList.remove("active");
    if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
    } else {
        navbar.classList.add("active");
    }
});

// Carrito
btnCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    navbar.classList.remove("active");
    if (cart.classList.contains("active")) {
        cart.classList.remove("active");
    } else {
        cart.classList.add("active");
    }
})


mostrarCarrito()

// Validar formulario de contacto
email.addEventListener("input", (e) => {
    validarEmail(e.target.value.trim(), e)
})

nombre.addEventListener("input", (e) => {
    validarNombre(e.target.value.trim(), e)
})

mensaje.addEventListener("input", (e) => {
    validarMensaje(e.target.value.trim(), e)
})

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let emailValido = validarEmail(email.value.trim(), e)
    let nombreValido = validarNombre(nombre.value.trim(), e)
    let mensajeValido = validarMensaje(mensaje.value.trim(), e)

    if (emailValido && nombreValido && mensajeValido) {
        alert("Gracias por contactarnos, nos pondremos en contacto contigo a la brevedad.")
        loginForm.reset()

        feedbackMensaje.innerHTML = "";
        feedbackName.innerHTML = "";
        feedbackEmail.innerHTML = "";
    }
})