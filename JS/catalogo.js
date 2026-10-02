/* catalogo.js | Catálogo de productos con filtros. */

// ================= PERSONA 2: catálogo =================


// =============================================================
// 1. DATOS DEL CATÁLOGO
// =============================================================
// categoria: 'collares' o 'pulseras'. Sirve para filtrar y para saber el precio
// (calcularTotal está en pedidos.js).
// foto: nombre del archivo que está en assets/images/catalogo/
const PRODUCTOS = [
  // ----- Collares -----
  { categoria: 'collares', linea: 'Collar con dije de corazón', nombre: 'Corazón amarillo', dije: 'Corazón amarillo', foto: 'collar-corazon-amarillo.png' },
  { categoria: 'collares', linea: 'Collar con dije de corazón', nombre: 'Corazón azul', dije: 'Corazón azul', foto: 'collar-corazon-azul.png' },
  { categoria: 'collares', linea: 'Collar con dije de corazón', nombre: 'Corazón verde', dije: 'Corazón verde', foto: 'collar-corazon-verde.png' },
  { categoria: 'collares', linea: 'Semilla de guapinol', nombre: 'Collar y aretes', dije: 'Semilla de guapinol', foto: 'collar-guapinol.jpg' },

  // ----- Pulseras -----
  { categoria: 'pulseras', linea: 'Pulsera para compartir', nombre: 'Rojo con corazón de imán', dije: 'Corazón de imán', foto: 'pulsera-roja-iman.jpg' },
  { categoria: 'pulseras', linea: 'Pulsera para compartir', nombre: 'Morado y blanco con corazón de imán', dije: 'Corazón de imán', foto: 'pulsera-morado-blanco-iman.jpg' },
  { categoria: 'pulseras', linea: 'Pulsera para compartir', nombre: 'Negro y blanco con corazón de imán', dije: 'Corazón de imán', foto: 'pulsera-negra-blanco-iman.jpg' },
  { categoria: 'pulseras', linea: 'Pulsera para compartir', nombre: 'Negro con infinito', dije: 'Dije de infinito', foto: 'pulsera-negra-infinito.jpg' },
  { categoria: 'pulseras', linea: 'Macramé yin yang', nombre: 'Negro con yin yang', dije: 'Dije yin yang', foto: 'pulsera-yingyang.jpg' }
];

// Botones para filtrar. "id" coincide con la "categoria" de los productos.
const FILTROS = [
  { id: 'todas',    texto: 'Todos' },
  { id: 'pulseras', texto: 'Pulseras' },
  { id: 'collares', texto: 'Collares' }
];

// Filtro elegido en este momento (al inicio se ven todas)
let filtroActual = 'todas';


// =============================================================
// 2. ELEMENTOS DEL HTML
// =============================================================
const listaCatalogo = document.querySelector('#catalog-grid');
const zonaFiltros = document.querySelector('#catalog-filtros');
const contadorCatalogo = document.querySelector('#catalog-total');


// =============================================================
// 3. MOSTRAR LOS PRODUCTOS (renderizado)
// =============================================================
// Igual que mostrarProductos() de clase: limpia, recorre el arreglo y crea una tarjeta por producto.
// Solo muestra los productos del filtro elegido.
function mostrarCatalogo() {

  listaCatalogo.innerHTML = '';
  let visibles = 0;

  PRODUCTOS.forEach(function (producto) {

    // Si el producto no es del filtro elegido, se salta (return pasa al siguiente producto)
    if (filtroActual !== 'todas' && producto.categoria !== filtroActual) {
      return;
    }
    visibles = visibles + 1;

    // El precio sale de la categoría (collares $6.000, pulseras $4.000)
    const precio = calcularTotal(producto.categoria);
    const tarjeta = document.createElement('article');
    // El ancho (2, 3 o 4 tarjetas por fila) deja las filas parejas; flex-col hace que todas tengan la misma altura
    tarjeta.className = 'flex w-[calc(50%-0.5rem)] flex-col overflow-hidden rounded-2xl border border-guapinol-brown/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]';

    // La foto del producto (vertical, 3:4). Si la foto no carga, se esconde y queda el texto "Foto no disponible".
    tarjeta.innerHTML = `
      <div class="relative flex aspect-[3/4] w-full items-center justify-center bg-guapinol-cream text-sm text-guapinol-green/60">
        <span>Foto no disponible</span>
        <img src="assets/images/catalogo/${producto.foto}" alt="${producto.linea}: ${producto.nombre}" loading="lazy" class="absolute inset-0 h-full w-full object-cover" onerror="this.classList.add('hidden')">
      </div>
      <div class="flex flex-1 flex-col p-4">
        <p class="text-xs text-stone-500">${producto.linea}</p>
        <h3 class="mt-1 font-semibold text-stone-900">${producto.nombre}</h3>
        <p class="mt-auto pt-3 font-semibold text-stone-900">${formatoColones(precio)}</p>
        <div class="mt-3 grid gap-2">
          <button type="button" class="agregar rounded-lg border border-stone-300 py-2 text-center text-sm hover:border-stone-900">Agregar al carrito</button>
          <button type="button" class="comprar rounded-lg bg-lime-400 py-2 text-center text-sm font-medium text-stone-900 hover:bg-lime-500">Comprar ahora</button>
        </div>
      </div>
    `;

    // Botón "Agregar al carrito" de esta tarjeta (agregarAlCarrito está en carrito.js)
    const botonAgregarProducto = tarjeta.querySelector('.agregar');
    botonAgregarProducto.addEventListener('click', function () {
      agregarAlCarrito({
        clave: producto.foto,   // cada foto es única, sirve como identificador
        nombre: producto.linea,
        color: producto.nombre,
        dije: producto.dije,
        precio: precio
      });

      // Aviso en el mismo botón durante 1.5 segundos
      botonAgregarProducto.textContent = '¡Agregada! ✓';
      setTimeout(function () {
        botonAgregarProducto.textContent = 'Agregar al carrito';
      }, 1500);
    });

    // Botón "Comprar ahora": abre WhatsApp con este producto (enviarWhatsApp está en pedidos.js)
    tarjeta.querySelector('.comprar').addEventListener('click', function () {
      let mensaje = SALUDO + ', quiero comprar:\n';
      mensaje = mensaje + '• ' + producto.linea + ' (' + producto.nombre + ')\n';
      mensaje = mensaje + '• Dije: ' + producto.dije + '\n';
      mensaje = mensaje + 'Total: ' + formatoColones(precio);
      enviarWhatsApp(mensaje);
    });

    listaCatalogo.appendChild(tarjeta);
  });

  // Contador: "1 producto" o "9 productos"
  if (visibles === 1) {
    contadorCatalogo.textContent = '1 producto';
  } else {
    contadorCatalogo.textContent = visibles + ' productos';
  }
}


// =============================================================
// 4. MOSTRAR LOS BOTONES DE FILTRO
// =============================================================
function mostrarFiltros() {

  zonaFiltros.innerHTML = '';

  FILTROS.forEach(function (filtro) {

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = filtro.texto;

    // El filtro elegido se pinta de oscuro
    if (filtro.id === filtroActual) {
      boton.className = 'rounded-full border border-stone-900 bg-stone-900 px-4 py-2 text-sm text-white';
    } else {
      boton.className = 'rounded-full border border-stone-300 px-4 py-2 text-sm hover:border-stone-900';
    }

    // Al tocar un filtro: se guarda y se vuelve a dibujar todo
    boton.addEventListener('click', function () {
      filtroActual = filtro.id;
      mostrarFiltros();
      mostrarCatalogo();
    });

    zonaFiltros.appendChild(boton);
  });
}


// =============================================================
// 5. PRIMER DIBUJO
// =============================================================
mostrarFiltros();
mostrarCatalogo();