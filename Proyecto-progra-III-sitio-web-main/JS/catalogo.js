const PRODUCTOS = [
  // ----- Fila 1: pulseras de semillas-----
  { categoria: 'pulseras', material: 'semillas',  linea: 'Pulsera de semillas', nombre: 'Semilla de guanacaste', dije: 'Semilla de guanacaste', foto: 'pulsera-semilla-guanacaste.png', precio: 3000 },
  { categoria: 'pulseras', material: 'semillas',  linea: 'Pulsera de semillas', nombre: 'Lágrimas de San Pedro', dije: 'Lágrimas de San Pedro', foto: 'pulsera-semilla-lagrimasanpedro.png', precio: 3000 },
  { categoria: 'pulseras', material: 'semillas',  linea: 'Pulsera de semillas', nombre: 'Semilla de nene', dije: 'Semilla de nene', foto: 'pulsera-semilla-nene.png', precio: 3000 },
  { categoria: 'pulseras', material: 'semillas',  linea: 'Pulsera de semillas', nombre: 'Palma sabal', dije: 'Semilla de palma sabal', foto: 'pulsera-semilla-palmasabal.png', precio: 3000 },

  // ----- Fila 2: pulseras  -----
  { categoria: 'pulseras', material: 'abalorios', linea: 'Pulsera para compartir', nombre: 'Rojo con corazón de imán', dije: 'Corazón de imán', foto: 'pulsera-roja-iman.jpg' },
  { categoria: 'pulseras', material: 'abalorios', linea: 'Pulsera para compartir', nombre: 'Morado y blanco con corazón de imán', dije: 'Corazón de imán', foto: 'pulsera-morado-blanco-iman.jpg' },
  { categoria: 'pulseras', material: 'abalorios', linea: 'Pulsera para compartir', nombre: 'Negro y blanco con corazón de imán', dije: 'Corazón de imán', foto: 'pulsera-negra-blanco-iman.jpg' },
  { categoria: 'pulseras', material: 'abalorios', linea: 'Pulsera para compartir', nombre: 'Negro con infinito', dije: 'Dije de infinito', foto: 'pulsera-negra-infinito.jpg' },

  // ----- Fila 3: llaveros -----
  { categoria: 'llaveros', material: 'madera',    linea: 'Llavero de madera', nombre: 'Tabla de surf', dije: 'Tabla de surf', foto: 'llavero-madera-surf.png' },
  { categoria: 'llaveros', material: 'madera',    linea: 'Llavero de madera', nombre: 'Tiburón', dije: 'Tiburón', foto: 'llavero-madera-tiburón.png' },
  { categoria: 'llaveros', material: 'semillas',  linea: 'Llavero de semillas', nombre: 'Muñeca roja', dije: 'Muñeca', foto: 'llavero-semilla-muñeca.png' },
  { categoria: 'llaveros', material: 'semillas',  linea: 'Llavero de semillas', nombre: 'Semilla de guanacaste', dije: 'Flor de semillas', foto: 'llavero-semilla-guanacaste.png' },

  // ----- Fila 4: collares -----
  { categoria: 'collares', material: 'abalorios', linea: 'Collar con dije de corazón', nombre: 'Corazón amarillo', dije: 'Corazón amarillo', foto: 'collar-corazon-amarillo.png' },
  { categoria: 'collares', material: 'abalorios', linea: 'Collar con dije de corazón', nombre: 'Corazón azul', dije: 'Corazón azul', foto: 'collar-corazon-azul.png' },
  { categoria: 'collares', material: 'abalorios', linea: 'Collar con dije de corazón', nombre: 'Corazón verde', dije: 'Corazón verde', foto: 'collar-corazon-verde.png' },
  { categoria: 'collares', material: 'semillas',  linea: 'Semilla de guapinol', nombre: 'Collar y aretes', dije: 'Semilla de guapinol', foto: 'collar-guapinol.jpg' },

  // ----- Última fila -----
  { categoria: 'pulseras', material: 'abalorios', linea: 'Macramé yin yang', nombre: 'Negro con yin yang', dije: 'Dije yin yang', foto: 'pulsera-yingyang.jpg' }
];

// Botones del filtro de categoría 
const FILTROS = [
  { id: 'todas',    texto: 'Todos' },
  { id: 'llaveros', texto: 'Llaveros' },
  { id: 'pulseras', texto: 'Pulseras' },
  { id: 'collares', texto: 'Collares' }
];

// Botones del filtro de material 
const MATERIALES = [
  { id: 'todos',     texto: 'Todos' },
  { id: 'semillas',  texto: 'Semillas' },
  { id: 'abalorios', texto: 'Abalorios' },
  { id: 'madera',    texto: 'Madera' }
];

// Filtros elegidos 
let filtroActual = 'todas';
let materialActual = 'todos';


// ===== 2. ELEMENTOS DEL HTML =====
const listaCatalogo = document.querySelector('#catalog-grid');
const zonaFiltros = document.querySelector('#catalog-filtros');
const zonaMateriales = document.querySelector('#catalog-materiales');
const contadorCatalogo = document.querySelector('#catalog-total');


// ===== 3. MOSTRAR LOS PRODUCTOS =====

// Limpia la lista y crea una tarjeta por cada producto que cumple los dos filtros
function mostrarCatalogo() {

  listaCatalogo.innerHTML = '';
  let visibles = 0;

  PRODUCTOS.forEach(function (producto) {

    // Si no es de la categoría elegida, se salta
    if (filtroActual !== 'todas' && producto.categoria !== filtroActual) {
      return;
    }
    // Si no es del material elegido, se salta
    if (materialActual !== 'todos' && producto.material !== materialActual) {
      return;
    }
    visibles = visibles + 1;

    // Precio de su categoría (pedidos.js); si el producto tiene precio propio, se usa ese
    let precio = calcularTotal(producto.categoria);
    if (producto.precio) {
      precio = producto.precio;
    }
    const tarjeta = document.createElement('article');
    // 2 tarjetas por fila en celular y 4 desde tablet, para que las filas queden simétricas
    tarjeta.className = 'flex w-[calc(50%-0.5rem)] flex-col overflow-hidden rounded-2xl border border-guapinol-brown/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg md:w-[calc(25%-1.125rem)]';

    // Foto vertical  si no carga, se ve "Foto no disponible"
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

    // Botón "Agregar al carrito": manda el producto al carrito (carrito.js)
    const botonAgregarProducto = tarjeta.querySelector('.agregar');
    botonAgregarProducto.addEventListener('click', function () {
      agregarAlCarrito({
        clave: producto.foto,   // cada foto es única
        nombre: producto.linea,
        color: producto.nombre,
        dije: producto.dije,
        precio: precio
      });

      // Aviso en el botón por 1.5 segundos
      botonAgregarProducto.textContent = '¡Agregada! ✓';
      setTimeout(function () {
        botonAgregarProducto.textContent = 'Agregar al carrito';
      }, 1500);
    });

    // Botón "Comprar ahora": abre WhatsApp con este producto (pedidos.js)
    tarjeta.querySelector('.comprar').addEventListener('click', function () {
      let mensaje = SALUDO + ', quiero comprar:\n';
      mensaje = mensaje + '• ' + producto.linea + ' (' + producto.nombre + ')\n';
      mensaje = mensaje + '• Dije: ' + producto.dije + '\n';
      mensaje = mensaje + 'Total: ' + formatoColones(precio);
      enviarWhatsApp(mensaje);
    });

    listaCatalogo.appendChild(tarjeta);
  });

  // Si ningún producto cumple los filtros, se muestra un aviso
  if (visibles === 0) {
    listaCatalogo.innerHTML = '<p class="py-10 text-center text-guapinol-green/80">No hay productos con estos filtros por ahora.</p>';
  }

  // Contador: "1 producto" o "17 productos"
  if (visibles === 1) {
    contadorCatalogo.textContent = '1 producto';
  } else {
    contadorCatalogo.textContent = visibles + ' productos';
  }
}


// ===== 4. BOTONES DEL FILTRO DE CATEGORÍA =====

// Crea los botones de categoría; el elegido se pinta oscuro
function mostrarFiltros() {

  zonaFiltros.innerHTML = '';

  FILTROS.forEach(function (filtro) {

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = filtro.texto;

    if (filtro.id === filtroActual) {
      boton.className = 'rounded-full border border-stone-900 bg-stone-900 px-4 py-2 text-sm text-white';
    } else {
      boton.className = 'rounded-full border border-stone-300 px-4 py-2 text-sm hover:border-stone-900';
    }

    // Al tocarlo: guarda la categoría y vuelve a dibujar
    boton.addEventListener('click', function () {
      filtroActual = filtro.id;
      mostrarFiltros();
      mostrarCatalogo();
    });

    zonaFiltros.appendChild(boton);
  });
}


// ===== 5. BOTONES DEL FILTRO DE MATERIAL =====

// Crea los botones de material; el elegido se pinta verde
function mostrarMateriales() {

  zonaMateriales.innerHTML = '';

  MATERIALES.forEach(function (material) {

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = material.texto;

    if (material.id === materialActual) {
      boton.className = 'rounded-full border border-guapinol-green bg-guapinol-green px-4 py-2 text-sm text-white';
    } else {
      boton.className = 'rounded-full border border-stone-300 px-4 py-2 text-sm hover:border-guapinol-green';
    }

    // Al tocarlo: guarda el material y vuelve a dibujar
    boton.addEventListener('click', function () {
      materialActual = material.id;
      mostrarMateriales();
      mostrarCatalogo();
    });

    zonaMateriales.appendChild(boton);
  });
}


// ===== 6. AL CARGAR LA PÁGINA =====
mostrarFiltros();
mostrarMateriales();
mostrarCatalogo();
