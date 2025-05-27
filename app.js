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
// Email
const email = document.querySelector("#email");
// Mensaje (TextArea)
const mensaje = document.querySelector("#mensaje");

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
    validarEmail(e)
})

nombre.addEventListener("input", (e) => {
    validarNombre(e)
})

mensaje.addEventListener("input", (e) => {
    validarMensaje(e)
})