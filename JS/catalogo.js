/* catalogo.js | Catálogo de productos con filtros de categoría y material. */


// ===== 1. DATOS DEL CATÁLOGO =====
// categoria: 'pulseras', 'collares' o 'llaveros' (de aquí sale el precio, ver pedidos.js)
// material: uno de los materiales de la lista MATERIALES
// foto: nombre del archivo en assets/images/catalogo/
const PRODUCTOS = [
  // ----- Pulseras -----
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Pulsera para compartir', nombre: 'Pulsera con corazón de imán',            foto: 'pulsera-roja-iman.jpg' },
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Pulsera para compartir', nombre: 'Pulsera con corazón de imán', foto: 'pulsera-morado-blanco-iman.jpg' },
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Pulsera para compartir', nombre: 'Pulsera con corazón de imán',  foto: 'pulsera-negra-blanco-iman.jpg' },
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Pulsera para compartir', nombre: 'Pulsera con infinito',                  foto: 'pulsera-negra-infinito.jpg' },
  { categoria: 'pulseras', material: 'Macramé',  linea: 'Pulsera yin yang',       nombre: 'Pulsera con yin-yang',                  foto: 'pulsera-yingyang.jpg' },
  { categoria: 'pulseras', material: 'Semillas', linea: 'Pulsera de semillas',    nombre: 'Semilla de guanacaste',               foto: 'pulsera-semilla-guanacaste.png' },
  { categoria: 'pulseras', material: 'Semillas', linea: 'Pulsera de semillas',    nombre: 'Lágrima de San Pedro',                foto: 'pulsera-semilla-lagrimasanpedro.png' },
  { categoria: 'pulseras', material: 'Semillas', linea: 'Pulsera de semillas',    nombre: 'Semilla de nene',                     foto: 'pulsera-semilla-nene.png' },
  { categoria: 'pulseras', material: 'Semillas', linea: 'Pulsera de semillas',    nombre: 'Palma sábal',                         foto: 'pulsera-semilla-palmasabal.png' },

  // ----- Collares -----
  { categoria: 'collares', material: 'Cuentas',  linea: 'Collar con dije de corazón', nombre: 'Corazón azul',      foto: 'collar-corazon-azul.png' },
  { categoria: 'collares', material: 'Cuentas',  linea: 'Collar con dije de corazón', nombre: 'Corazón verde',     foto: 'collar-corazon-verde.png' },
  { categoria: 'collares', material: 'Semillas', linea: 'Semilla de guapinol',        nombre: 'Collar y aretes',   foto: 'collar-guapinol.jpg' },

  // ----- Llaveros -----
  { categoria: 'llaveros', material: 'Madera',   linea: 'Llavero de macramé', nombre: 'Tabla de surf',            foto: 'llavero-madera-surf.png' },
  { categoria: 'llaveros', material: 'Madera',   linea: 'Llavero de macramé', nombre: 'Tiburón',                  foto: 'llavero-madera-tiburon.png' },
  { categoria: 'llaveros', material: 'Madera',   linea: 'Llavero de macramé', nombre: 'Muñeca roja',              foto: 'llavero-muneca-roja.png' },
  { categoria: 'llaveros', material: 'Semillas', linea: 'Llavero de macramé', nombre: 'Flor de semilla de guanacaste', foto: 'llavero-semilla-guanacaste.png' }
];

// Botones de los filtros. "id" coincide con la "categoria" o el "material" del producto.
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

// Filtros elegidos ahora (al inicio se ve todo)
let filtroCategoria = 'todas';
let filtroMaterial = 'todos';


// ===== 2. ELEMENTOS DEL HTML =====
const listaCatalogo = document.querySelector('#catalog-grid');
const zonaCategorias = document.querySelector('#catalog-filtros');
const zonaMateriales = document.querySelector('#catalog-materiales');
const contadorCatalogo = document.querySelector('#catalog-total');


// ===== 3. MOSTRAR LOS PRODUCTOS =====
// Limpia la lista y crea una tarjeta por cada producto que pase los dos filtros
function mostrarCatalogo() {

  listaCatalogo.innerHTML = '';
  let visibles = 0;

  PRODUCTOS.forEach(function (producto) {

    // Si no cumple algún filtro, se salta al siguiente producto
    if (filtroCategoria !== 'todas' && producto.categoria !== filtroCategoria) {
      return;
    }
    if (filtroMaterial !== 'todos' && producto.material !== filtroMaterial) {
      return;
    }
    visibles = visibles + 1;

    const precio = calcularTotal(producto.categoria);   // pedidos.js

    // Tarjeta: ancho fijo (así las filas quedan centradas) y misma altura en cada fila
    const tarjeta = document.createElement('article');
    tarjeta.className = 'flex w-40 flex-col overflow-hidden rounded-2xl border border-guapinol-brown/10 bg-white sm:w-52 lg:w-56';
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

    // Botón "Agregar al carrito" (agregarAlCarrito está en carrito.js)
    const botonAgregar = tarjeta.querySelector('.agregar');
    botonAgregar.addEventListener('click', function () {
      agregarAlCarrito({
        clave: producto.foto,        // cada foto es única: sirve de identificador
        nombre: producto.linea,
        color: producto.nombre,
        dije: producto.material,     // el carrito muestra "nombre · material"
        precio: precio
      });

      // Aviso en el mismo botón por 1.5 segundos
      botonAgregar.textContent = '¡Agregado! ✓';
      setTimeout(function () {
        botonAgregar.textContent = 'Agregar al carrito';
      }, 1500);
    });

    // Botón "Comprar ahora": abre WhatsApp con este producto (enviarWhatsApp está en pedidos.js)
    tarjeta.querySelector('.comprar').addEventListener('click', function () {
      let mensaje = SALUDO + ', quiero comprar:\n';
      mensaje = mensaje + '• ' + producto.linea + ' (' + producto.nombre + ')\n';
      mensaje = mensaje + '• Material: ' + producto.material + '\n';
      mensaje = mensaje + 'Total: ' + formatoColones(precio);
      enviarWhatsApp(mensaje);
    });

    listaCatalogo.appendChild(tarjeta);
  });

  // Si ningún producto pasó los filtros, se avisa
  if (visibles === 0) {
    listaCatalogo.innerHTML = '<p class="py-10 text-stone-500">No hay productos con esos filtros.</p>';
  }

  // Contador: "1 producto" o "5 productos"
  if (visibles === 1) {
    contadorCatalogo.textContent = '1 producto';
  } else {
    contadorCatalogo.textContent = visibles + ' productos';
  }
}


// ===== 4. MOSTRAR LOS BOTONES DE FILTRO =====
// Crea los botones de una lista de opciones. El elegido se pinta oscuro.
// alTocar es la función que se ejecuta al tocar un botón.
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

// Dibuja los dos grupos de filtros y luego los productos
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


// ===== 5. AL CARGAR LA PÁGINA =====
mostrarTodo();
