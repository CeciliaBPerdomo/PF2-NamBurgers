import { leerArchivo, mostrarProductos, verMas } from "./js/productos.js"
import { leerCategoria, mostrarCategorias, setearFiltros } from "./js/categorias.js"
import { mostrarCarrito } from "./js/carrito.js"

var catalogo = []
var categoria = []

// Productos
const btnMore = document.querySelector("#btnMore")

//Navbar
const navbar = document.querySelector("#navbar")
const btnMenu = document.querySelector("#btnMenu")
const btnCarrito = document.querySelector("#btnCarrito")
const cart = document.getElementById("cart")

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