// catalogo.js: productos y filtros

// categoria: 'pulseras', 'collares' o 'llaveros' (de ahí sale el precio, ver pedidos.js)
// material: tiene que estar en la lista MATERIALES de abajo
// foto: nombre del archivo en assets/images/catalogo/
const PRODUCTOS = [
  // pulseras
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Pulsera para compartir', nombre: 'Pulsera con corazón de imán',            foto: 'pulsera-roja-iman.jpg' },
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Pulsera para compartir', nombre: 'Pulsera con corazón de imán', foto: 'pulsera-morado-blanco-iman.jpg' },
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Pulsera para compartir', nombre: 'Pulsera con corazón de imán',  foto: 'pulsera-negra-blanco-iman.jpg' },
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Pulsera para compartir', nombre: 'Pulsera con infinito',                  foto: 'pulsera-negra-infinito.jpg' },
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Macramé yin yang',       nombre: 'Pulsera con yin yang',                  foto: 'pulsera-yingyang.jpg' },
  { categoria: 'pulseras', material: 'Semillas', linea: 'Pulsera de semillas',    nombre: 'Pulsera de guanacaste',               foto: 'pulsera-semilla-guanacaste.png' },
  { categoria: 'pulseras', material: 'Semillas', linea: 'Pulsera de semillas',    nombre: 'Pulsera lágrima de San Pedro',                foto: 'pulsera-semilla-lagrimasanpedro.png' },
  { categoria: 'pulseras', material: 'Semillas', linea: 'Pulsera de semillas',    nombre: 'Pulsera semilla de nene',                     foto: 'pulsera-semilla-nene.png' },
  { categoria: 'pulseras', material: 'Semillas', linea: 'Pulsera de semillas',    nombre: 'Pulsera palma sábal',                         foto: 'pulsera-semilla-palmasabal.png' },

  // collares
  { categoria: 'collares', material: 'Cuentas',  linea: 'Collar con dije de corazón', nombre: 'Corazón azul',      foto: 'collar-corazon-azul.png' },
  { categoria: 'collares', material: 'Cuentas',  linea: 'Collar con dije de corazón', nombre: 'Corazón verde',     foto: 'collar-corazon-verde.png' },
  { categoria: 'collares', material: 'Semillas', linea: 'Semilla de guapinol',        nombre: 'Collar y aretes',   foto: 'collar-guapinol.jpg' },

  // llaveros
  { categoria: 'llaveros', material: 'Madera',   linea: 'Llavero de macramé', nombre: 'Tabla de surf',            foto: 'llavero-madera-surf.png' },
  { categoria: 'llaveros', material: 'Madera',   linea: 'Llavero de macramé', nombre: 'Tiburón',                  foto: 'llavero-madera-tiburon.png' },
  { categoria: 'llaveros', material: 'Madera',   linea: 'Llavero de macramé', nombre: 'Muñeca roja',              foto: 'llavero-muneca-roja.png' },
  { categoria: 'llaveros', material: 'Semillas', linea: 'Llavero de macramé', nombre: 'Flor de semilla de guanacaste', foto: 'llavero-semilla-guanacaste.png' }
];

// botones de los filtros, el id es igual a la categoria o al material del producto
const CATEGORIAS = [
  { id: 'todas',    texto: 'Todas' },
  { id: 'pulseras', texto: 'Pulseras' },
  { id: 'collares', texto: 'Collares' },
  { id: 'llaveros', texto: 'Llaveros' }
];

const MATERIALES = [
  { id: 'todos',    texto: 'Todos' },
  { id: 'Semillas', texto: 'Semillas' },
  { id: 'Madera',   texto: 'Madera' },
  { id: 'Macramé',  texto: 'Macramé' },
  { id: 'Cuentas',  texto: 'Cuentas' }
];

// filtros que están puestos (al inicio se ve todo)
let filtroCategoria = 'todas';
let filtroMaterial = 'todos';


// elementos del html
const listaCatalogo = document.querySelector('#catalog-grid');
const zonaCategorias = document.querySelector('#catalog-filtros');
const zonaMateriales = document.querySelector('#catalog-materiales');
const contadorCatalogo = document.querySelector('#catalog-total');


// dibuja una tarjeta por cada producto que pase los dos filtros
function mostrarCatalogo() {

  listaCatalogo.innerHTML = '';
  let visibles = 0;

  PRODUCTOS.forEach(function (producto) {

    // si no cumple un filtro, lo salta
    if (filtroCategoria !== 'todas' && producto.categoria !== filtroCategoria) {
      return;
    }
    if (filtroMaterial !== 'todos' && producto.material !== filtroMaterial) {
      return;
    }
    visibles = visibles + 1;

    const precio = calcularTotal(producto.categoria);   // está en pedidos.js

    // ancho fijo para que las filas queden centradas
    const tarjeta = document.createElement('article');
    tarjeta.className = 'flex w-40 flex-col overflow-hidden rounded-2xl border border-guapinol-brown/10 bg-white sm:w-52 lg:w-56 transition duration-300 hover:-translate-y-1 hover:shadow-lg';
    tarjeta.innerHTML = `
      <img src="assets/images/catalogo/${producto.foto}" alt="${producto.linea}: ${producto.nombre}" loading="lazy" class="aspect-[3/4] w-full bg-white object-contain">
      <div class="flex flex-1 flex-col p-4">
        <p class="text-xs text-stone-500">${producto.linea}</p>
        <h3 class="mt-1 font-semibold text-stone-900">${producto.nombre}</h3>
        <p class="mt-auto pt-3 font-semibold text-stone-900">${formatoColones(precio)}</p>
        <div class="mt-3 grid gap-2">
          <button type="button" class="agregar rounded-lg border border-stone-300 py-2 text-sm hover:border-stone-900">Agregar al carrito</button>
          <button type="button" class="comprar rounded-lg bg-lime-400 py-2 text-sm font-medium text-stone-900 hover:bg-lime-500">Comprar ahora</button>
        </div>
      </div>
    `;

    // botón de agregar (agregarAlCarrito está en carrito.js)
    const botonAgregar = tarjeta.querySelector('.agregar');
    botonAgregar.addEventListener('click', function () {
      agregarAlCarrito({
        clave: producto.foto,        // la foto no se repite, sirve de identificador
        nombre: producto.linea,
        color: producto.nombre,
        dije: producto.material,     // el carrito muestra el color y el material
        precio: precio
      });

      // cambia el texto del botón por un momento
      botonAgregar.textContent = '¡Agregado!';
      setTimeout(function () {
        botonAgregar.textContent = 'Agregar al carrito';
      }, 1500);
    });

    // botón de comprar, abre whatsapp con este producto
    tarjeta.querySelector('.comprar').addEventListener('click', function () {
      let mensaje = SALUDO + ', quiero comprar:\n';
      mensaje = mensaje + '- ' + producto.linea + ' (' + producto.nombre + ')\n';
      mensaje = mensaje + '- Material: ' + producto.material + '\n';
      mensaje = mensaje + 'Total: ' + formatoColones(precio);
      enviarWhatsApp(mensaje);
    });

    listaCatalogo.appendChild(tarjeta);
  });

  // si no quedó ninguno
  if (visibles === 0) {
    listaCatalogo.innerHTML = '<p class="py-10 text-stone-500">No hay productos con esos filtros.</p>';
  }

  // contador, singular o plural
  if (visibles === 1) {
    contadorCatalogo.textContent = '1 producto';
  } else {
    contadorCatalogo.textContent = visibles + ' productos';
  }
}


// crea los botones de filtro, el elegido se ve oscuro
// alTocar es lo que pasa cuando le dan clic
function dibujarBotones(zona, opciones, elegido, alTocar) {

  zona.innerHTML = '';

  opciones.forEach(function (opcion) {

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = opcion.texto;

    if (opcion.id === elegido) {
      boton.className = 'rounded-full border border-stone-900 bg-stone-900 px-4 py-2 text-sm text-white';
    } else {
      boton.className = 'rounded-full border border-stone-300 px-4 py-2 text-sm hover:border-stone-900';
    }

    boton.addEventListener('click', function () {
      alTocar(opcion.id);
    });

    zona.appendChild(boton);
  });
}

// dibuja los filtros y después los productos
function mostrarTodo() {
  dibujarBotones(zonaCategorias, CATEGORIAS, filtroCategoria, function (id) {
    filtroCategoria = id;
    mostrarTodo();
  });
  dibujarBotones(zonaMateriales, MATERIALES, filtroMaterial, function (id) {
    filtroMaterial = id;
    mostrarTodo();
  });
  mostrarCatalogo();
}


// al cargar la página
mostrarTodo();
