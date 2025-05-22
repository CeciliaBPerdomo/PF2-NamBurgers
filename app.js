import { leerArchivo, mostrarProductos, verMas } from "./js/productos.js"
import { leerCategoria, mostrarCategorias, setearFiltros } from "./js/categorias.js"

var catalogo = []
var categoria = []

// Elementos del DOM
const btnMore = document.querySelector("#btnMore")

// Productos
catalogo = await leerArchivo()
mostrarProductos(catalogo)

btnMore.addEventListener("click", (e) => {
    verMas(e, catalogo)
})

// Categorias
categoria = await leerCategoria()
mostrarCategorias(categoria)

// Filtrar
const inputCategorias = document.querySelectorAll("[name='categoria']")
inputCategorias.forEach((input) => {
    input.addEventListener("change", (e) => {
        setearFiltros(e, catalogo)
    })
})