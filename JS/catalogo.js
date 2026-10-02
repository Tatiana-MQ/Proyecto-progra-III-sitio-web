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
  { linea: 'Pulsera de piedras naturales', nombre: 'Ágata azul',       tipo: 'piedras', dije: 'Sin dije', foto: 'piedras-agata-azul.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Amatista',         tipo: 'piedras', dije: 'Sin dije', foto: 'piedras-amatista.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Aventurina verde', tipo: 'piedras', dije: 'Sin dije', foto: 'piedras-aventurina-verde.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Cuarzo rosa',      tipo: 'piedras', dije: 'Sin dije', foto: 'piedras-cuarzo-rosa.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Howlita blanca',   tipo: 'piedras', dije: 'Sin dije', foto: 'piedras-howlita-blanca.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Ónix negro',       tipo: 'piedras', dije: 'Sin dije', foto: 'piedras-onix-negro.webp' },
  { linea: 'Pulsera con corazón', nombre: 'Aventurina, corazón dorado',    tipo: 'piedrasDije', dije: 'Corazón metálico', foto: 'corazon-aventurina-dorado.webp' },
  { linea: 'Pulsera con corazón', nombre: 'Cuarzo rosa, corazón oro rosa', tipo: 'piedrasDije', dije: 'Corazón metálico', foto: 'corazon-cuarzo-rosa-oro-rosa.webp' },
  { linea: 'Pulsera con corazón', nombre: 'Howlita, corazón oro rosa',     tipo: 'piedrasDije', dije: 'Corazón metálico', foto: 'corazon-howlita-oro-rosa.webp' },
  { linea: 'Macramé yin yang', nombre: 'Negro',       tipo: 'macrame', dije: 'Dije yin yang', foto: 'macrame-negro.webp' },
  { linea: 'Macramé yin yang', nombre: 'Rojo',        tipo: 'macrame', dije: 'Dije yin yang', foto: 'macrame-rojo.webp' },
  { linea: 'Macramé yin yang', nombre: 'Azul marino', tipo: 'macrame', dije: 'Dije yin yang', foto: 'macrame-azul-marino.webp' },
  { linea: 'Macramé yin yang', nombre: 'Café',        tipo: 'macrame', dije: 'Dije yin yang', foto: 'macrame-cafe.webp' },
  { linea: 'Macramé yin yang', nombre: 'Beige',       tipo: 'macrame', dije: 'Dije yin yang', foto: 'macrame-beige.webp' }
];

// Botones para filtrar. "id" coincide con el "tipo" de los productos.
const FILTROS = [
  { id: 'todas',       texto: 'Todas' },
  { id: 'piedras',     texto: 'Piedras naturales' },
  { id: 'piedrasDije', texto: 'Con corazón' },
  { id: 'macrame',     texto: 'Macramé' }
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
    if (filtroActual !== 'todas' && producto.tipo !== filtroActual) {
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