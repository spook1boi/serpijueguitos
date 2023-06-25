let productosCarro = []

if (localStorage.getItem("productos")) {

  productosCarro = JSON.parse(localStorage.getItem("productos"));
  actCarro(productosCarro);
}

cargarProductos(productos);

function cargarProductos(listadoProductos) {
  let acumulador = "";
  listadoProductos.forEach(producto => {

    let template = `<div class="col-xl-6 col-xxl-3 col-sm-12 mt-5">
    <div class="card mx-auto text-bg-dark" style="width: 18rem">
      <img id="imagen-tarjeta" src= "${producto.imagen}" class="card-img-top" alt="${producto.nombre}"/>
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text"><em>
        ${producto.descripcion}
        </em>
        </p>
        <p class="d-flex justify-content-center"> Precio normal: $${producto.precio}
        </p>
        <p class="d-flex justify-content-center text-danger"> Descuento: $-${producto.descuento}
        </p>
        <p class="d-flex justify-content-center text-success"> Precio total: $${producto.precio - producto.descuento} 
        </p>
        <button
          id="agregar-carrito"
          type="submit"
          class="btn btn-primary"
          data-sku=${producto.sku}
          onclick = "agregarProductos ('${producto.sku}')"
        >
          Agregar al carrito
       
      </div>
    </div>
    </div>`

    acumulador += template;
  })

  document.querySelector("#productos .row").innerHTML = acumulador;

}


function agregarProductos(sku) {
  let objtProducto = {
    sku,
    cantidad: 1
  }

  let productoEncontrado = productosCarro.find(producto => producto.sku == sku);
  if (productoEncontrado) {
    productoEncontrado.cantidad = productoEncontrado.cantidad + 1

  } else {

    productosCarro.push(objtProducto)

  };


  actCarro(productosCarro);

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Producto agregado al carrito',
    showConfirmButton: false,
    timer: 1500
  })
}


let plataformas = document.getElementById("plataformas")
let contadorCarrito = document.getElementById("contador-carrito")
let contador = 0


plataformas.addEventListener("click", function (event) {
    contador++; contadorCarrito.innerText = contador; alert("Su producto se ha agregado exitosamente al carrito")
})


function actCarro(listadoProductos) {
  localStorage.setItem("productos", JSON.stringify(productosCarro));


  const valorInicial = 0;
  const sumaProductos = listadoProductos.reduce(
    (acumulador, producto) => acumulador + producto.cantidad, valorInicial
  )

  document.querySelector("#cantidad-productos").innerText = sumaProductos
}