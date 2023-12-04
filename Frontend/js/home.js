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

function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("celulares"));
    console.log(memoria);

    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("celulares", JSON.stringify([nuevoProducto]));
    }
    else{
        const indiceProducto = memoria.findIndex(celulares => celulares.id === producto.id);
        console.log(indiceProducto);

        if(indiceProducto === 0){
            const nuevaMemoria = memoria;
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
            localStorage.setItem("celulares", JSON.stringify(nuevaMemoria));
        }
        else{
            memoria[indiceProducto].cantidad++;
            localStorage.setItem("celulares", JSON.stringify(memoria)); 
        }
    }
}   

function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}