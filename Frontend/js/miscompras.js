const contenedorTarjetas = document.getElementById("miscompras-container");

function crearTarjetasProductosInicio(){
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("celulares"));
    console.log(productos);

    if(productos && productos.length > 0){
        productos.forEach((producto) => {
            const nuevoCelular = document.createElement("div");
            nuevoCelular.classList = "tarjeta-producto";
            nuevoCelular.innerHTML = `
            <img src="${producto.img}">
            <h1>${producto.nombre}</h1>
            <h2>$${producto.precio}</h2>
            <h3>Comprado el: 5/12/2023</h2>
            <p>${producto.descripcion}</p>
            <button id="comprar2" onclick="realizarCompra()">Comprar</button>
            <button id="limpiar2" onclick="eliminarDelCarrito()">Limpiar</button>
            `
            contenedorTarjetas.appendChild(nuevoCelular);
            nuevoCelular.getElementsByTagName("button")[1]
            .addEventListener("click", (e) => {
                const cuentaElemnt = e.target.parentElement.getElementsByTagName("span")[0];
                cuentaElemnt.innerText = agregarAlCarrito(producto);  
            });
        })
    }
}
crearTarjetasProductosInicio();

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