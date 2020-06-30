
//Base de Datos

let baseDeDatos = [
    {
        id: 1,
        nombre: 'Papa',
        precio: 55,
        imagen: '../src/papa.jpg'
    },
    {
        id: 2,
        nombre: 'Cebolla',
        precio: 20,
        imagen: '../src/cebolla.jpg'
    },
    {
        id: 3,
        nombre: 'Calabacin',
        precio: 85,
        imagen: '../src/calabacin.jpg'
    },
    {
        id: 4,
        nombre: 'Frutillas',
        precio: 60,
        imagen: '../src/frutilla.jpg'
    },
    {
        id: 5,
        nombre: 'Frutillas',
        precio: 96,
        imagen: '../src/frutilla.jpg'
    },
    {
        id: 6,
        nombre: 'Frutillas Grandes',
        precio: 116,
        imagen: '../src/frutilla.jpg'
    }


]

console.log("hola")

let carritoArray= [];
let total= 0;
const $productos=document.querySelector('#marcoProductos')
const $carrito=document.querySelector('#carrito')
const $total=document.querySelector('#total')


//Agregar y Quitar Productos

const agregarProducto = (event) => {
    //console.log(event)
    //Añadir nodo al carro
    carritoArray.push(event.target.getAttribute('marcador'))
    // Calculadora y rednder al carro
    calcularTotal();
    renderizadoDeCarrito(); 
}

const borrarCarrito=(event)=>{
    console.log("Borrado")
    // Obtener la Id del producto
    let id =event.target.getAttribute('item');
    //Borrar
    function funcionY (carritoId) {
        return carritoId !== id;
    }
    carritoArray = carritoArray.filter(funcionY);

    // volvemos a renderizar y Calculamos
    renderizadoDeCarrito();
    calcularTotal();
    
}


//Funciones de Agregado y Quitado del DOM

const crearTienda = () => {
    //titulo de productos
    let titulo=document.createElement('h2');
    titulo.textContent= "Productos";
    titulo.classList.add("titulo")
    $productos.appendChild(titulo)
    
    let marco=document.createElement('div');
    marco.classList.add('productos')
    
    //Todas la Etiquetas para la tienda
    for (const info of baseDeDatos) {
        
        //contenedor de caja unico
        let productoUnico=document.createElement('div');
        productoUnico.classList.add('productoUnico')

        let marcoDeTexto=document.createElement('div');
        marcoDeTexto.classList.add('marcoDeTexto')
        //Nombre de producto
        let nombreProducto=document.createElement('p')
        nombreProducto.classList.add('textoDeCaja');
        nombreProducto.textContent = info['nombre'];
        // Precio
        let precioProducto=document.createElement('p')
        precioProducto.classList.add('textoDeCaja');
        precioProducto.textContent = `Precio = $ ${info['precio']}`;
        //icono de oferta

        //Boton
        let botonDeProducto=document.createElement('button');
        botonDeProducto.classList.add('sumarProducto');
        botonDeProducto.textContent= '+';
        botonDeProducto.setAttribute('marcador', info['id']);
        botonDeProducto.addEventListener('click',agregarProducto);

        //imagenes de productos
        let imagenProductos = document.createElement('img');
        imagenProductos.classList.add('objetosEnVenta');
        imagenProductos.setAttribute('src' , info['imagen'])
        

        //Apendiamos
        marcoDeTexto.appendChild(nombreProducto)
        marcoDeTexto.appendChild(precioProducto)
        marcoDeTexto.appendChild(botonDeProducto)
        productoUnico.appendChild(marcoDeTexto)
        productoUnico.appendChild(imagenProductos)
        marco.appendChild(productoUnico)
        
        //let marcadorArray= botonDeProducto.attributes[1].nodeValue
        //console.log(marcadorArray)
        
    }
    $productos.appendChild(marco)
}


const  renderizadoDeCarrito = () =>{
    $carrito.textContent='';
    //Quitar Elementos duplicados
    let duplicadosDelCarro=[...new Set(carritoArray)];
    duplicadosDelCarro.forEach(function(item, indice) {
        let miItem = baseDeDatos.filter(function(itemBaseDatos) {
            return itemBaseDatos['id']== item;
        })
        function funcionX (total,itemId){
            return itemId == item ? total += 1 : total;
        }
        let cantidadUni= carritoArray.reduce(funcionX, 0);
        //Crear los Elementos internos del Carrito
        let li= document.createElement('li');
        li.classList.add('carritoDentroDelProductos');
        li.textContent= `${cantidadUni} x ${miItem[0] ['nombre']} - ${miItem[0]['precio']} $`;
        
        let botonDeBorrado= document.createElement('button');
        botonDeBorrado.classList.add('botonRojo');
        botonDeBorrado.textContent = 'X';
        //botonDeBorrado.style.marginLeft='10px';
        botonDeBorrado.setAttribute('item', item);
        botonDeBorrado.addEventListener('click',borrarCarrito);
        //botonDeBorrado.style.marginLeft = '1rem';
        

        li.appendChild(botonDeBorrado);
        $carrito.appendChild(li);
    })

}

//Calculadora

const calcularTotal = () => {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    for (let item of carritoArray) {
        // De cada elemento obtenemos su precio
        let miItem = baseDeDatos.filter(function(itemBaseDatos) {
            return itemBaseDatos['id'] == item;
        });
        total = total + miItem[0]['precio'];
    }
    // Renderizamos el precio en el HTML
    $total.textContent =`$ ${total.toFixed(2)}`;
}

crearTienda()

//Comprar productos

let BotonCompra=document.getElementById('bComprar');



BotonCompra.addEventListener("click", ()=>{
    alert(`Gracias por su compra 
    Pagaste $ ${total} pesos`);
    location.reload(true);
}) 

//Importar elementos

// me hace falta el Servidor nodeJS Express

//Sql o Mongo

//sacar elementos Http
//dialogo

