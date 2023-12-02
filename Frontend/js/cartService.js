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
