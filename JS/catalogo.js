/* catalogo.js | Catálogo de productos con filtros. */

// ================= PERSONA 2: catálogo y contacto =================
const TELEFONO_TIENDA = '50684131678';          // WhatsApp de la tienda (con 506)
const CARPETA_CATALOGO = 'assets/images/360/';  // se reutilizan las imágenes del visor 360°


// ---------- 1. DATOS DEL CATÁLOGO ----------
// precio: número en colones, o null si es "Consultar"
const PRODUCTOS = [
  { linea: 'Pulsera de piedras naturales', nombre: 'Ágata azul',       tipo: 'piedras', precio: 4000, imagen: 'piedras-agata-azul.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Amatista',         tipo: 'piedras', precio: 4000, imagen: 'piedras-amatista.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Aventurina verde', tipo: 'piedras', precio: 4000, imagen: 'piedras-aventurina-verde.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Cuarzo rosa',      tipo: 'piedras', precio: 4000, imagen: 'piedras-cuarzo-rosa.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Howlita blanca',   tipo: 'piedras', precio: 4000, imagen: 'piedras-howlita-blanca.webp' },
  { linea: 'Pulsera de piedras naturales', nombre: 'Ónix negro',       tipo: 'piedras', precio: 4000, imagen: 'piedras-onix-negro.webp' },
  { linea: 'Pulsera con corazón', nombre: 'Aventurina, corazón dorado',    tipo: 'corazon', precio: 4000, imagen: 'corazon-aventurina-dorado.webp' },
  { linea: 'Pulsera con corazón', nombre: 'Cuarzo rosa, corazón oro rosa', tipo: 'corazon', precio: 4000, imagen: 'corazon-cuarzo-rosa-oro-rosa.webp' },
  { linea: 'Pulsera con corazón', nombre: 'Howlita, corazón oro rosa',     tipo: 'corazon', precio: 4000, imagen: 'corazon-howlita-oro-rosa.webp' },
  { linea: 'Macramé yin yang', nombre: 'Negro',       tipo: 'macrame', precio: null, imagen: 'macrame-negro.webp' },
  { linea: 'Macramé yin yang', nombre: 'Rojo',        tipo: 'macrame', precio: null, imagen: 'macrame-rojo.webp' },
  { linea: 'Macramé yin yang', nombre: 'Azul marino', tipo: 'macrame', precio: null, imagen: 'macrame-azul-marino.webp' },
  { linea: 'Macramé yin yang', nombre: 'Café',        tipo: 'macrame', precio: null, imagen: 'macrame-cafe.webp' },
  { linea: 'Macramé yin yang', nombre: 'Beige',       tipo: 'macrame', precio: null, imagen: 'macrame-beige.webp' }
];

const FILTROS = [
  { id: 'todas',   texto: 'Todas' },
  { id: 'piedras', texto: 'Piedras naturales' },
  { id: 'corazon', texto: 'Con corazón' },
  { id: 'macrame', texto: 'Macramé' }
];

// Cada tipo de tarjeta corresponde a un modelo de Persona 4 (pedidos.js)
function modeloDelProducto(producto) {
  if (producto.tipo === 'piedras') {
    return 'piedras';
  }
  if (producto.tipo === 'corazon') {
    return 'piedrasDije';
  }
  return 'macrame';
}

// Qué dije lleva cada tipo de pulsera (igual que en el personalizador)
function dijeDelProducto(producto) {
  if (producto.tipo === 'piedras') {
    return 'Sin dije';
  }
  if (producto.tipo === 'corazon') {
    return 'Corazón metálico';
  }
  return 'Dije yin yang';
}

// El precio que se muestra sale de Persona 4, así coincide con el personalizador.
function precioDelProducto(producto) {
  return calcularTotal(modeloDelProducto(producto));
}

// Arma el enlace que abre WhatsApp con un mensaje ya escrito
function enlaceWhatsApp(texto) {
  return 'https://wa.me/' + TELEFONO_TIENDA + '?text=' + encodeURIComponent(texto);
}


// ---------- 2. TARJETA DEL CATÁLOGO ----------
// Crea la tarjeta de un producto y la devuelve (todavía no está en la página)
function crearTarjeta(producto) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-50';
  tarjeta.setAttribute('data-tipo', producto.tipo);   // se guarda el tipo para poder filtrar

  // La imagen es la cuadrícula de 36 fotos del 360°: con background-size 600%
  // y posición 0 0 se muestra solo la primera foto.
  tarjeta.innerHTML =
    '<div class="aspect-[16/10] w-full bg-no-repeat" ' +
         'style="background-image:url(\'' + CARPETA_CATALOGO + producto.imagen + '\'); background-size:600% 600%; background-position:0 0" ' +
         'role="img" aria-label="' + producto.linea + ', ' + producto.nombre + '"></div>' +
    '<div class="flex flex-1 flex-col p-4">' +
      '<p class="text-xs text-stone-500">' + producto.linea + '</p>' +
      '<h3 class="mt-1 font-semibold text-stone-900">' + producto.nombre + '</h3>' +
      '<p class="mt-auto pt-3 font-semibold text-stone-900">' + formatoColones(precioDelProducto(producto)) + '</p>' +
      '<div class="mt-3 grid gap-2">' +
        '<button type="button" class="agregar rounded-lg border border-stone-300 py-2 text-center text-sm hover:border-stone-900">Agregar al carrito</button>' +
        '<button type="button" class="comprar rounded-lg bg-lime-400 py-2 text-center text-sm font-medium text-stone-900 hover:bg-lime-500">Comprar ahora</button>' +
      '</div>' +
    '</div>';

  // Botón "Agregar al carrito"
  const botonAgregar = tarjeta.querySelector('.agregar');
  botonAgregar.addEventListener('click', function () {
    agregarProductoAlCarrito(producto, botonAgregar);
  });

  // Botón "Comprar ahora"
  tarjeta.querySelector('.comprar').addEventListener('click', function () {
    comprarAhora(producto);
  });

  return tarjeta;
}


// ---------- AGREGAR AL CARRITO Y COMPRAR AHORA ----------
// Agrega el producto al carrito (agregarAlCarrito está en carrito.js)
function agregarProductoAlCarrito(producto, boton) {
  agregarAlCarrito({
    clave: modeloDelProducto(producto) + '-' + producto.nombre,   // identifica la pulsera
    nombre: producto.linea,
    color: producto.nombre,
    dije: dijeDelProducto(producto),
    precio: precioDelProducto(producto)
  });

  // Aviso en el mismo botón durante 1.5 segundos
  boton.textContent = '¡Agregada! ✓';
  setTimeout(function () {
    boton.textContent = 'Agregar al carrito';
  }, 1500);
}

// Abre WhatsApp con el pedido de esta pulsera, sin pasar por el carrito
function comprarAhora(producto) {
  let mensaje = 'Hola Artesanías Guapinol, quiero comprar:\n';
  mensaje = mensaje + '• ' + producto.linea + ' (' + producto.nombre + ')\n';
  mensaje = mensaje + '• Dije: ' + dijeDelProducto(producto) + '\n';
  mensaje = mensaje + 'Total: ' + formatoColones(precioDelProducto(producto));
  window.open(enlaceWhatsApp(mensaje), '_blank');
}


// ---------- 3. PINTAR CATÁLOGO Y FILTROS ----------
const listaTarjetas = [];   // aquí se guardan las tarjetas creadas, para poder filtrarlas

// Crea una tarjeta por cada producto y la agrega a la página
function pintarCatalogo() {
  const grid = document.getElementById('catalog-grid');
  for (let i = 0; i < PRODUCTOS.length; i++) {
    const tarjeta = crearTarjeta(PRODUCTOS[i]);
    listaTarjetas.push(tarjeta);
    grid.appendChild(tarjeta);
  }
}

// Muestra solo las tarjetas del tipo elegido y actualiza el contador
function filtrar(tipoElegido) {
  let visibles = 0;

  for (let i = 0; i < listaTarjetas.length; i++) {
    const tarjeta = listaTarjetas[i];
    const tipoDeTarjeta = tarjeta.getAttribute('data-tipo');

    if (tipoElegido === 'todas' || tipoDeTarjeta === tipoElegido) {
      tarjeta.classList.remove('hidden');   // se muestra
      visibles = visibles + 1;
    } else {
      tarjeta.classList.add('hidden');      // se oculta (la clase "hidden" de Tailwind)
    }
  }

  // Contador: "1 pulsera" o "5 pulseras"
  const contador = document.getElementById('catalog-total');
  if (visibles === 1) {
    contador.textContent = '1 pulsera';
  } else {
    contador.textContent = visibles + ' pulseras';
  }

  // Marca el botón del filtro elegido (aria-pressed="true" lo pinta de oscuro)
  const botones = document.getElementById('catalog-filtros').getElementsByTagName('button');
  for (let i = 0; i < botones.length; i++) {
    const boton = botones[i];
    if (boton.getAttribute('data-filtro') === tipoElegido) {
      boton.setAttribute('aria-pressed', 'true');
    } else {
      boton.setAttribute('aria-pressed', 'false');
    }
  }
}

// Crea un botón por cada filtro (Todas, Piedras naturales, Con corazón, Macramé)
function crearFiltros() {
  const zonaFiltros = document.getElementById('catalog-filtros');
  for (let i = 0; i < FILTROS.length; i++) {
    const filtro = FILTROS[i];
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = filtro.texto;
    boton.setAttribute('data-filtro', filtro.id);
    boton.className = 'rounded-full border border-stone-300 px-4 py-2 text-sm hover:border-stone-900 ' +
                      'aria-pressed:border-stone-900 aria-pressed:bg-stone-900 aria-pressed:text-white';
    boton.addEventListener('click', function () {
      filtrar(filtro.id);
    });
    zonaFiltros.appendChild(boton);
  }
}


// ---------- 4. INICIO ----------
if (document.getElementById('catalog-grid') !== null) {
  pintarCatalogo();
  crearFiltros();
  filtrar('todas');
}