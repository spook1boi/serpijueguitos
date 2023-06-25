let cupones = [{
  nombre: "10%",
  descuento: 10
},
{

  nombre: "20%",
  descuento: 20

}];

let productosCarro = []

let precioTotalCompra = 0;

if (localStorage.getItem("productos")) {

  productosCarro = JSON.parse(localStorage.getItem("productos"));
  actCarro(productosCarro);
}

function actCarro(listadoProductos) {
  localStorage.setItem("productos", JSON.stringify(productosCarro));

  
  const valorInicial = 0;
  const sumaProductos = listadoProductos.reduce (
    (acumulador ,producto) =>  acumulador + producto.cantidad , valorInicial
  )
  
  
  document.querySelector("#cantidad-productos").innerText = sumaProductos
}

cargarTablaProductos ()

function cargarTablaProductos () {

  let acumuladorFilas = "";
precioTotalCompra = 0;
  productosCarro.forEach ((producto, index) => {

let productoConDetalles = encontrarProducto(producto.sku);
let precioUnitario = productoConDetalles.precio - productoConDetalles.descuento;
let totalProducto = producto.cantidad * precioUnitario;
precioTotalCompra += totalProducto;

  let template = ` 
             
  <tr>
    <th scope="row">${index + 1}</th>
    <td>${productoConDetalles.sku}</td>
    <td>${productoConDetalles.nombre}</td>
    <td>${productoConDetalles.precio}</td>
    <td>${productoConDetalles.descuento}</td>
    <td>${precioUnitario}</td>
    <td> <button class="btn btn-secondary" onclick="restar('${productoConDetalles.sku}')">-</button>
    <input  value="${producto.cantidad}" style="width: 35px" min="0"  >
        <button class="btn btn-secondary" onclick="sumar ('${productoConDetalles.sku}')" >+</button>
    </td>
    <td>${totalProducto}</td>
</tr>
  `;

  acumuladorFilas += template ;

});

document.querySelector("#productos-carrito tbody").innerHTML = acumuladorFilas;
document.querySelector("#precio-total").innerHTML = `<strong> Precio total de la compra: $${precioTotalCompra} </strong>` 

}

function encontrarProducto (sku) {

  let encontrado = productos.find (producto => producto.sku == sku)
  return encontrado ;

}

document.getElementById ("btn-vaciar").addEventListener("click", function (event) {
  event.preventDefault ();

  localStorage.setItem ("productos", "[]");
  location.reload ();
});


document.getElementById("btn-descuento").addEventListener ("click", function (event){

let cuponIngresado = document.getElementById("input-cupon").value; 

let cuponEncontrado = cupones.find (cupon => cupon.nombre == cuponIngresado);

if (cuponEncontrado) {

  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Cupon agregado exitosamente',
    showConfirmButton: false,
    timer: 1500
  });


  precioTotalCompra = precioTotalCompra - (precioTotalCompra * cuponEncontrado.descuento/100)
  document.querySelector("#precio-total").innerHTML = `<strong> Precio total con descuento: $${precioTotalCompra} </strong>` 
 } else {

  Swal.fire({
    icon: 'error',
    title: 'Cupon no valido',
    
  })
 }
});


function restar (sku) {
 
productosCarro.forEach((producto, index) => {

if (sku == producto.sku){
  producto.cantidad = producto.cantidad -1;
  if (producto.cantidad <=0){
    if (confirm("¿Está seguro de eliminar el producto?")){
    productosCarro.splice(index, 1 ) 
  }else{
    producto.cantidad =1;
  }
    
  }
} 

})
  
  actCarro (productosCarro);
  cargarTablaProductos ();

}


function sumar (sku) {
 
  productosCarro.forEach((producto, index) => {
  
  if (sku == producto.sku){
    producto.cantidad = producto.cantidad +  1;
   
  } 
  
  })
   
    actCarro (productosCarro);
    cargarTablaProductos ();
  
  }