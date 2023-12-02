const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos){
    productos.forEach(producto => {
        const nuevoCelular = document.createElement("div");
        nuevoCelular.classList = "tarjeta-producto";
        nuevoCelular.innerHTML = `
            <img src="${producto.img}">
            <h1>${producto.nombre}</h1>
            <h2>$${producto.precio}</h2>
            <p>${producto.descripcion}</p>
            <button onclick="agregarCarrito()">AGREGAR</button>
        `
        contenedorTarjetas.appendChild(nuevoCelular);
        nuevoCelular.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarAlCarrito(producto));
    });
}

getCelulares().then(celulares => {
    crearTarjetasProductosInicio(celulares);
})

function agregarCarrito(){
    alert('Producto agregado al carrito!');
}