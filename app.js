var catalogo = []
var carrito = JSON.parse(localStorage.getItem('carrito')) || []
var filtro = null
var page = 1

// Elementos del DOM
const listProducts = document.querySelector("#products > ul")
const btnMore = document.querySelector("#btnMore")

// Productos
const leerArchivo = async () => {
    return await (await fetch("./json/hamburguesas.json")).json()
}

// Mostrar los productos
const mostrarProductos = () => {
    let lista = []
    if (filtro == null) {
        // muestra los 3 primeros
        lista = catalogo.slice(0, page * 3)
    } else {
        lista = catalogo.filter((producto) => producto.category == filtro)
    }

    listProducts.innerHTML = ""
    lista.forEach((producto) => listProducts.append(tarjetaProducto(producto)))
}


// Muestra las tarjetas de los productos
const tarjetaProducto = (producto) => {
    const { id, nombre, imagen, altImagen,precio, ingredientes, categoria } = producto
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
        // Acá agregamos el producto al carrito (TODO)
    });

    carritoForm.append(carritoButton)
    carritoItem.append(carritoForm)
    dataElemento.append(carritoItem)
    elemento.append(dataElemento)

    return elemento
}

// Mostrar mas tarjetas
const verMas = (e) => {
    e.preventDefault()
    page += 1
    if (page == 5) {
        page = 5
        btnMore.style.display = "none"
    }
    mostrarProductos()
}

catalogo = await leerArchivo()
mostrarProductos()

// Muestra mas tarjetas
btnMore.addEventListener("click", verMas)