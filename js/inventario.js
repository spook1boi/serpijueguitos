import productos from "./invArray.js"
import Producto from "./productoInventario.js";

function cargarTabla(listaProductos){
    let cuerpoTabla = document.querySelector(".section_mantenedor_productos tbody");
    cuerpoTabla.innerHTML = "";

    let acumuladorFilas = "";
    listaProductos.forEach(producto => {
        acumuladorFilas += `
                <tr>
                    <th scope="row">${producto.id}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                </tr>
        `
    });
    cuerpoTabla.innerHTML = acumuladorFilas;

}

function buscarProducto(id){
    let producto = new Producto(id);
    return producto.getProduct();
}

crud_form.addEventListener("submit", (event)=>{
    event.preventDefault();
})


let inputId = document.getElementById("crud_id");
inputId.addEventListener("change", (event) =>{
    event.preventDefault();
    let id =  inputId.value;
    let producto = buscarProducto(id);
    if(producto){
        crud_nombre.value = producto.nombre;
        crud_descripcion.value = producto.descripcion;
        crud_precio.value = producto.precio;
        crud_stock.value = producto.stock;
    }else{
        crud_nombre.value = "";
        crud_descripcion.value = "";
        crud_precio.value = 0;
        crud_stock.value = 0;

    }
})


document.getElementById("btn-agregar").addEventListener("click", (event)=> {
    event.preventDefault();
    let id = crud_id.value;
    let nombre = crud_nombre.value;
    let descripcion = crud_descripcion.value;
    let precio = crud_precio.value;
    let stock = crud_stock.value;
    
    let nuevoProducto = new Producto(id, nombre, descripcion, precio, stock);
    if(nuevoProducto.getProduct()){
        alert("Ya existe un producto con dicho ID.")
    }else{
        nuevoProducto.addProduct();
        cargarTabla(nuevoProducto.getProducts());
    } 
})


document.getElementById("btn-eliminar").addEventListener("click", (event)=> {
    event.preventDefault();
    let id = crud_id.value;
    
    let producto = new Producto(id);
    if(producto.getProduct()){
        let respuesta = confirm("Está seguro que quiere eliminar el producto con ID: " + producto.id);
        if(respuesta){
            producto.deleteProduct();
        cargarTabla(producto.getProducts());
        }
        
    }else{
        alert("El producto que intenta eliminar no existe en la BD.")
    }
    
})


document.getElementById("btn-modificar").addEventListener("click", (event)=> {
    event.preventDefault();
    let id = crud_id.value;
    let nombre = crud_nombre.value;
    let descripcion = crud_descripcion.value;
    let precio = crud_precio.value;
    let stock = crud_stock.value;
    
    let producto= new Producto(id, nombre, descripcion, precio, stock);
    if(producto.getProduct()){
        producto.updateProduct();
        cargarTabla(producto.getProducts());
    }else{
        alert("El producto que intenta actualizar no existe en la BD.")
    } 
})

function main(){
    let productosStorage = JSON.parse(localStorage.getItem("invArray"));
    if(!productosStorage){
        productosStorage = productos;
        localStorage.setItem("invArray", JSON.stringify(productosStorage))
    }

    cargarTabla(productosStorage);

}

main();