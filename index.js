const contenedorProductos = document.getElementById('productos');

const contenedorCarrito = document.getElementById('contenedor-carrito');

const botonCarrito = document.getElementById('show-cart');

const botonCerrarCarrito = document.getElementById('cerrarCarrito');

const modalCarrito = document.getElementById('carrito');

const quitarProducto = document.querySelectorAll('.boton-eliminar');

const body = document.body;

const vaciarCarrito = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contador-carrito');

const precioTotal = document.getElementById('precioTotal');

botonCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'flex';
    body.classList.add('active');
});

botonCerrarCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
    body.classList.remove('active');
});

vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();
});


let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('Carrito')){
        carrito = JSON.parse(localStorage.getItem('Carrito'));
        actualizarCarrito();
    }
});

productos.forEach(producto => {
    let div = document.createElement('div');
    div.className = 'producto';
    
    let img = document.createElement('img');
    img.setAttribute('src', producto.imagen);
    
    let h3 = document.createElement('h3');
    h3.innerText = '$' + producto.precio;

    let small = document.createElement('small');
    small.innerText = producto.categoría;

    let p = document.createElement('p');
    p.innerText = producto.nombre;

    let button = document.createElement('button');
    button.setAttribute('id', `agregar${producto.id}`);
    button.innerText = 'Agregar al Carrito';

    div.appendChild(img)
    div.appendChild(h3)
    div.appendChild(small)
    div.appendChild(p)
    div.appendChild(button)

    contenedorProductos.append(div);

    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })

});

const agregarAlCarrito = (prodId) => {
    const exist = carrito.some(prod => prod.id === prodId);

    if(exist){
        const prod = carrito.map(prod => {
            if(prod.id === prodId){
                prod.cantidad++;
            }
        })
    } else {
        const item = productos.find((prod) => prod.id === prodId);
        carrito.push(item);
        console.log(carrito);
    }

    actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const index = carrito.indexOf(item);
    carrito.splice(index, 1);
    
    actualizarCarrito();
};

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = '';

    carrito.forEach((prod) =>{
        const div = document.createElement('div')
        div.className = 'productoEnCarrito';

        let p = document.createElement('p')
        p.innerText = prod.nombre;

        let p2 = document.createElement('p');
        p2.innerText = '$' + prod.precio;

        let p3 = document.createElement('p');
        p3.innerHTML = 'Cantidad: ';

        let span = document.createElement('span');
        span.setAttribute('id', 'cantidad');
        span.innerText = prod.cantidad;

        p3.append(span);

        let button = document.createElement('button');
        button.className = 'boton-eliminar';
        button.setAttribute('onclick', `eliminarDelCarrito(${prod.id})`);
        button.innerHTML = `<i class="bx bx-trash"></i>`;

        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(button);

        contenedorCarrito.append(div);

        localStorage.setItem('Carrito', JSON.stringify(carrito));
    });

    contadorCarrito.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);

};