import { agregarProducto } from "./carrito.js"
var page = 1

/* DOM */
const listProducts = document.querySelector("#products > ul")


// Productos
export const leerArchivo = async () => {
    return await (await fetch("./js/hamburguesas.json")).json()
}

// Mostrar los productos
export const mostrarProductos = (catalogo, filtro) => {
    let lista = []
    if (filtro == null) {
        // muestra los 3 primeros
        lista = catalogo.slice(0, page * 3)
    } else if (filtro == "todas") {
        lista = catalogo.slice(0, 3)
    } else {
        lista = catalogo.filter((producto) => producto.categoria == filtro)
    }

    listProducts.innerHTML = ""
    lista.forEach((producto) => listProducts.append(tarjetaProducto(producto, catalogo)))
}

// Muestra las tarjetas de los productos
const tarjetaProducto = (producto, catalogoProductos) => {
    const { id, nombre, imagen, altImagen, precio, ingredientes, categoria } = producto
    const elemento = document.createElement("li")
    const dataElemento = document.createElement("ul")

    const carritoItem = document.createElement("li")
    const carritoForm = document.createElement("form")
    const carritoButton = document.createElement("button")


    let templateImage = `<picture><img src="${imagen}" alt="${altImagen}"></picture>`
    let templateData = `<li class="info"><h3>${nombre}</h3><p>$ ${precio}</p></li>`
    templateData += `<li class="ingredientes"><dl><dt>Ingredientes:</dt><dd>${ingredientes.join(", ")}</dd></dl></li>`

    elemento.innerHTML = templateImage
    dataElemento.innerHTML = templateData

    carritoItem.classList.add("cart")
    carritoButton.innerText = "Agregar 🛒"

    carritoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        agregarProducto(id, catalogoProductos)
    });

    carritoForm.append(carritoButton)
    carritoItem.append(carritoForm)
    dataElemento.append(carritoItem)
    elemento.append(dataElemento)

    return elemento
}

// Mostrar mas tarjetas
export const verMas = (e, catalogo) => {
    e.preventDefault()
    page += 1
    if (page >= 4) {
        page = 4
        btnMore.style.display = "none"
    }
    mostrarProductos(catalogo)
}
