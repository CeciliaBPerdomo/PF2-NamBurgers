import { mostrarProductos } from "./productos.js";

var filtro = null
var page = 1

/* Filtros de categorias */
const formFiltros = document.querySelector("#formFiltros");


export const leerCategoria = async () => {
    return await (await fetch("./js/categorias.json")).json()
}

export const mostrarCategorias = (categoria) => {
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
export const setearFiltros = (e, catalogo) => {
  filtro = e.target.value
  console.log(filtro)

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
  mostrarProductos(catalogo, filtro)
}