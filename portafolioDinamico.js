const grid = new Muuri(".grid",{
    layout: {
        rounding: false
      },
});

window.addEventListener("load",() => {
 //agregamos un evento para que muestre todas las imagenes al mismo tiempo luego de terminar la carga de la pagina
    grid.refreshItems().layout()
    document.querySelector(".grid").classList.add("imagenes-cargadas")

 //agregamos los eventos a los enlaces para filtrar por categoria

    const enlaces = document.querySelectorAll(".categorias a")

    enlaces.forEach((elemento) => {
        
        elemento.addEventListener("click", (evento) => {
            evento.preventDefault()
            document.querySelector(".active").classList.remove("active")
            evento.target.classList.add("active")

            const categoria=evento.target.innerHTML.toLowerCase()
            categoria === "todos" ? grid.filter("[data-categoria]") :  grid.filter(`[data-categoria="${categoria}"]`)
           
        })
    })

 //agregamos los eventos para filtrar por la barra de busqueda 

 const barra = document.querySelector("#barra-buscar")
 barra.addEventListener("input", (evento) => {
    const busqueda = evento.target.value

    grid.filter(function (item) {
        
        return item.getElement().dataset.etiquetas.includes(busqueda)
    });

 })

 //agregar eventos para ver las imagenes

 const overlay=document.querySelector("#overlay")

 document.querySelectorAll(".grid .item img").forEach( (elemento) => {
    
    elemento.addEventListener("click", () => {
        const ruta =elemento.getAttribute("src")
        const descripcion = elemento.parentNode.parentNode.dataset.descripcion
        overlay.classList.add("activo")
        document.querySelector("#overlay img").src= ruta
        document.querySelector("#overlay .descripcion").innerHTML =descripcion
    })

 })

 //evento del boton de cerrar
 const botonCerrar=document.querySelector("#btn-cerrar")

 botonCerrar.addEventListener("click", () => {
    overlay.classList.remove("activo")
 })

 overlay.addEventListener("click", (evento) => {
    evento.target.id === "overlay" ? overlay.classList.remove("activo") : ""

 })



})