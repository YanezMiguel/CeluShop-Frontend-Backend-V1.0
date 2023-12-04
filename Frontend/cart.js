const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio-total");
const totalesElement = document.getElementById("totales");

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
            nuevoCelular.getElementsByTagName("button")[0]
            .addEventListener("click", (e) => {
                restarAlCarrito(producto);
                crearTarjetasProductosInicio();
                actualizarTotales();
            });
        })
    }
}
crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("celulares"));
    let unidades = 0;
    let precio = 0;

    if(productos && productos.length > 0){
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio;
    }
}

function realizarCompra() {
    alert('Procesando compra...');
    localStorage.removeItem('celulares');
    location.reload(); 
}

function eliminarDelCarrito(){
    localStorage.removeItem('celulares');
    location.reload(); 
}