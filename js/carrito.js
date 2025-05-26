import { leerArchivo } from "./productos.js"
var carrito = JSON.parse(localStorage.getItem('carrito')) || []

// Carrito
const listCart = document.querySelector("#cart > ul")
const btnRemoveAll = document.querySelector("#btnRemoveAll")
const subTotalCart = document.querySelector("#subtotal")
const shippingCart = document.querySelector("#envio")
const totalCart = document.querySelector("#total")
const cartTotals = document.querySelector("#cartTotals");

export const agregarProducto = async (id, catalogo) => {
    if (!catalogo) {
        catalogo = await leerArchivo()
    }

    const producto = catalogo.find((p) => p.id == id)
    if (carrito.length == 0) {
        carrito.push({ ...producto, cantidad: 1 })
        localStorage.setItem("carrito", JSON.stringify(carrito))
        return mostrarCarrito()
    }

    let exist = carrito.find((item) => item.id == id)
    if (!exist) {
        carrito.push({ ...producto, cantidad: 1 })
        localStorage.setItem("carrito", JSON.stringify(carrito))
        return mostrarCarrito(catalogo)
    }
    carrito = carrito.map((item) => {
        if (item.id == id) {
            item.cantidad += 1
        }
        return item
    })
    localStorage.setItem("carrito", JSON.stringify(carrito))
    return mostrarCarrito(catalogo)
}

export const mostrarCarrito = (catalogo) => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    listCart.innerHTML = null

    if (carrito.length === 0) {
        listCart.innerHTML += `
         <li style="text-align:start; padding:1rem; color:#555;">
            <section style="display: flex; flex-direction: column">
                <p>No hay ninguna hamburguesa pedida 🍔</p>
                <p>¿Qué estás esperando para comer? 🤤</p>
            </section>
        </li>
    `;
    cartTotals.style.display = "none";
    } else {
        cartTotals.style.display = "flex"; 
        let subTotal = carrito.reduce((a, i) => (a += i.precio * i.cantidad), 0)
        subTotalCart.innerHTML = `$ ${Number(subTotal).toFixed(2)}`
        shippingCart.innerHTML = `$ ${subTotal > 1000 ? "Free" : `${Number(subTotal * 0.2).toFixed(2)}`}`
        totalCart.innerHTML = subTotal > 1000 ? `$ ${Number(subTotal).toFixed(2)}` : `$ ${Number(subTotal + (subTotal * 0.2)).toFixed(2)}`

        carrito.forEach((i) => listCart.append(item(i, catalogo)))
    }
}

const item = (item, catalogo) => {
    const element = document.createElement("li")
    let template = `<picture><img src="${item.imagen}" alt=""></picture>`
    template += `<dl><dd>${item.nombre}</dd><dd>Precio: $ ${Number(item.precio * item.cantidad).toFixed(2)}</dd></dl>`

    const elementActions = document.createElement("fieldset")
    const btnReduce = document.createElement("button")
    const btnRemove = document.createElement("button")
    const outQuantity = document.createElement("output")
    const btnAdd = document.createElement("button")

    btnReduce.setAttribute("type", "button")
    btnRemove.setAttribute("type", "button")
    btnAdd.setAttribute("type", "button")

    outQuantity.innerHTML = item.cantidad
    btnReduce.innerText = "-"
    btnAdd.innerText = "+"
    btnRemove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`


    btnReduce.addEventListener("click", (e) => {
        e.preventDefault()
        reducirCantidad(item.id)
    })

    btnAdd.addEventListener("click", (e) => {
        e.preventDefault()
        agregarProducto(item.id, catalogo)
    })

    btnRemove.addEventListener("click", (e) => {
        e.preventDefault()
        quitarProducto(item.id)
    })

    element.innerHTML = template
    elementActions.append(item.cantidad > 1 ? btnReduce : btnRemove, outQuantity, btnAdd)
    element.append(elementActions)
    return element
}


const quitarProducto = (id) => {
    carrito = carrito.filter((item) => item.id != id)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    return mostrarCarrito()
}

const reducirCantidad = (id) => {
    carrito = carrito.map((item) => {
        if (item.id == id) {
            item.cantidad -= 1
        }
        return item
    })
    carrito = carrito.filter((item) => item.cantidad > 0)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    return mostrarCarrito()
}

const vaciarCarrito = () => {
    carrito = []
    localStorage.removeItem("carrito")
    return mostrarCarrito()
}

btnRemoveAll.addEventListener("click", (e) => {
    e.preventDefault()
    let empty = confirm('Estas seguro de borrar todos los productos del carrito?')
    if (empty) {
        vaciarCarrito()
    }
})