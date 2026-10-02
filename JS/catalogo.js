/* catalogo.js | Catálogo de productos con filtros. */

// ================= PERSONA 2: catálogo =================


// =============================================================
// 1. DATOS DEL CATÁLOGO
// =============================================================
// tipo: el modelo de la pulsera ('piedras', 'piedrasDije' o 'macrame').
// Sirve para filtrar y para saber su precio (calcularTotal está en pedidos.js).
// foto: nombre del archivo en assets/images/catalogo/. Para poner la foto real,
// guarda la imagen con ese mismo nombre (o cambia el nombre aquí). Ver assets/images/catalogo/LEEME.txt
const PRODUCTOS = [
{ categoria: 'pulseras', linea: 'Pulsera para compartir', nombre: 'Macramé rojo con corazón de imán', tipo: 'piedras', dije: '', foto: 'piedras-amatista.webp' },
{ categoria: 'pulseras', linea: 'Macramé yin yang', nombre: 'Negro', tipo: 'macrame', dije: 'Dije yin yang', foto: 'macrame-negro.webp' },
{ categoria: 'llaveros', linea: 'Llavero de macramé', nombre: 'Rojo', tipo: 'llavero', dije: 'Sin dije', foto: 'llavero-rojo.webp' },
{ categoria: 'collares', linea: 'Collar de piedras', nombre: 'Cuarzo rosa', tipo: 'collar', dije: 'Sin dije', foto: 'collar-cuarzo-rosa.webp' },
];

// Botones para filtrar. "id" coincide con el "tipo" de los productos.
const FILTROS = [
  { id: 'todas',       texto: 'Todas' },
  { id: 'pulseras',     texto: 'Pulsera' },
  { id: 'llaveros', texto: 'Llavero' },
  { id: 'collares',     texto: 'Collar' }
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

    const precio = calcularTotal(producto.tipo);
    const tarjeta = document.createElement('article');
    tarjeta.className = 'flex flex-col overflow-hidden rounded-2xl border border-guapinol-brown/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg';

    // Espacio para la foto del producto. Si la foto todavía no existe, onerror la
    // esconde (clase hidden) y se ve el cuadro con el texto "Foto próximamente".
    tarjeta.innerHTML = `
      <div class="relative flex aspect-[4/3] w-full items-center justify-center bg-guapinol-cream text-sm text-guapinol-green/60">
        <span>Foto próximamente</span>
        <img src="assets/images/catalogo/${producto.foto}" alt="${producto.linea}: ${producto.nombre}" class="absolute inset-0 h-full w-full object-cover" onerror="this.classList.add('hidden')">
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
        clave: producto.tipo + '-' + producto.nombre,
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

    // Botón "Comprar ahora": abre WhatsApp con esta pulsera (enviarWhatsApp está en pedidos.js)
    tarjeta.querySelector('.comprar').addEventListener('click', function () {
      let mensaje = SALUDO + ', quiero comprar:\n';
      mensaje = mensaje + '• ' + producto.linea + ' (' + producto.nombre + ')\n';
      mensaje = mensaje + '• Dije: ' + producto.dije + '\n';
      mensaje = mensaje + 'Total: ' + formatoColones(precio);
      enviarWhatsApp(mensaje);
    });

    listaCatalogo.appendChild(tarjeta);
  });

  // Contador: "1 pulsera" o "5 pulseras"
  if (visibles === 1) {
    contadorCatalogo.textContent = '1 pulsera';
  } else {
    contadorCatalogo.textContent = visibles + ' pulseras';
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