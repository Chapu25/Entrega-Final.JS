
const container = document.getElementById("container");

const comprasCarrito = document.getElementById("comprasCarrito");

const contenedorBotones = document.getElementById("contenedorBotones")



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



function agregarAlCarrito(producto) {
    const { id } = producto;

    if (carrito.some(el => el.id === id)) {
        const indexProducto = carrito.findIndex(el => el.id === id);
        carrito[indexProducto].cantidad += 1;
        carrito[indexProducto].subtotal = carrito[indexProducto].cantidad * carrito[indexProducto].precio;
    } else {
        const nuevoProducto = {
            ...producto,
            cantidad: 1,
            subtotal: producto.precio,
        };
        carrito.push(nuevoProducto);
    }

    Toastify({
        text: `${producto.nombre} se agrego al carrito`,
        duration: 3000,
        gravity:"bottom"
    }).showToast();
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



function crearCarta(producto) {
    const carta = document.createElement("div");
    carta.className = "carta";

    const nombreProducto = document.createElement("h1");
    nombreProducto.innerText = producto.nombre;

    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.imagen;
    imagenProducto.className = "img";

    const precioProducto = document.createElement("p");
    precioProducto.innerText = `$${producto.precio}`;

    const boton = document.createElement('button');
    boton.innerText = "Comprar";
    boton.className = "btn";
    boton.addEventListener("click", () => agregarAlCarrito(producto) );

    carta.append(nombreProducto, imagenProducto, precioProducto, boton);
    container.append(carta);
}



container.innerHTML = `<h1>Cargando Carrito...</h1>`



fetch("./data.json")
.then(response => response.json())
.then(producto => {

    setTimeout(() => {
        container.innerHTML = ``
        
        producto.forEach(el => {
            crearCarta(el);
        });
        

        const mostrar = document.createElement("button");
        mostrar.innerText = "Mirar tu carrito";
        mostrar.className = "btn-2"
        

        mostrar.addEventListener("click", () => {
            
            comprasCarrito.innerHTML = "";
        
            if (carrito.length === 0) {
                comprasCarrito.innerText = "Tu carrito está vacío.";
        
            } else {
                
                carrito.forEach(producto => {
                    const productoCarrito = document.createElement("div");
                    productoCarrito.className = "carta-2";
                    
        
                    const imagenCarrito = document.createElement("img");
                    imagenCarrito.src = producto.imagen;
                    
        
                    const nombreCarrito = document.createElement("h2");
                    nombreCarrito.innerText = producto.nombre;
        
        
                    const precioCarrito = document.createElement("p");
                    precioCarrito.innerText = `Precio: $${producto.precio}`;
        
        
                    const cantidadCarrito = document.createElement("p");
                    cantidadCarrito.innerText = `Cantidad: ${producto.cantidad}`;
        
                    
                    const subtotalCarrito = document.createElement("p");
                    subtotalCarrito.innerText = `Subtotal: $${producto.subtotal}`;
        
                    
                    productoCarrito.append(imagenCarrito, nombreCarrito, precioCarrito, cantidadCarrito, subtotalCarrito);
                    comprasCarrito.append(productoCarrito);
                });
            }
        });
        
        
        contenedorBotones.append(mostrar);
        
        
        
        const limpiar = document.createElement("button");
        limpiar.innerText = "Limpiar tu carrito";
        limpiar.className = "btn-2"
        
        
        limpiar.addEventListener("click", () => {
            
            if (carrito.length > 0) {
                Swal.fire({
                    title: 'Está seguro de eliminar el carrito ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, seguro',
                    cancelButtonText: 'No, no quiero'
                })
                    .then(result => {
            
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Que pena!',
                            icon: 'success',
                            text: 'limpiaste tu carrito correctamente'
                        })
            
                        carrito = [];
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                        comprasCarrito.innerHTML = "Tu carrito ha sido limpiado.";
                    } else{
                        Swal.fire({
                            title: 'El carrito sigue intacto',
                            icon: 'error',
                            text: 'A seguir comprando'
                        })
                    }
                    })
            } else {
                Toastify({
                    text: "El carrito esta vacio",
                    duration: 3000,
                    gravity:"bottom"
                }).showToast();
            }
            
        });
        
        contenedorBotones.append(limpiar);
    
    }, 2000);
    
})











