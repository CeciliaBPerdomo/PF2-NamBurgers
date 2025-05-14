var catalogo = []
var carrito = JSON.parse(localStorage.getItem('carrito')) || []
var filtro = null
var page = 1
var categoria = []

// Elementos del DOM
/* Productos */
const listProducts = document.querySelector("#products > ul")
const btnMore = document.querySelector("#btnMore")
/* Filtros de productos */
const formFiltros = document.querySelector("#formFiltros");

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
        lista = catalogo.filter((producto) => producto.categoria == filtro)
    }

    listProducts.innerHTML = ""
    lista.forEach((producto) => listProducts.append(tarjetaProducto(producto)))
}

// Muestra las tarjetas de los productos
const tarjetaProducto = (producto) => {
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
    if (page == 4) {
        page = 4
        btnMore.style.display = "none"
    }
    mostrarProductos()
}
btnMore.addEventListener("click", verMas)

catalogo = await leerArchivo()
mostrarProductos()


// Categorias
const leerCategoria = async () => {
    return await (await fetch("./json/categorias.json")).json()
}

const mostrarCategorias = () => {
    categoria.forEach(cat => {
        const input = document.createElement("input");
        input.setAttribute("type", "radio")
        input.setAttribute("name", "categoria")
        input.setAttribute("id", `c-${cat.id}`)
        input.setAttribute("value", cat.id) 

        const label = document.createElement("label");
        label.setAttribute("for", `c-${cat.id}`);
        label.textContent = `${cat.label}`;
        
         if(cat.active){
             input.setAttribute("checked", `${cat.active}`)
             label.classList.add("active")
        }

        formFiltros.append(input, label);
        
    });
}

// Filtra los productos por Categoria
const setearFiltros = (e) => {
  filtro = e.target.value

  let allLabels = document.querySelectorAll("label[for*='c-']")
  allLabels.forEach((label) => label.classList.remove("active"))
  let currentLabel = document.querySelector(`label[for='c-${filtro}']`)
  currentLabel.classList.add("active")

  if (filtro == "todas") {
    filtro = null
    page = 1
    btnMore.style.display = "flex"
  } else {
    btnMore.style.display = "none"
  }
  mostrarProductos()
}

categoria = await leerCategoria()
mostrarCategorias()

// Filtrar
const inputCategorias = document.querySelectorAll("[name='categoria']")
inputCategorias.forEach((input) => {
  input.addEventListener("change", setearFiltros)
})

