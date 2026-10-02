/* carrito.js | Carrito de compras: agregar pulseras, ver el total y pedir todo por WhatsApp. */

// ================= CARRITO =================


// =============================================================
// 1. DATOS
// =============================================================
/*
El carrito es un arreglo de objetos. Cada objeto es una pulsera:
{ clave, nombre, color, dije, precio, cantidad }

"clave" identifica la pulsera (por ejemplo "macrame-Rojo"), para saber
si ya está en el carrito.
*/
let listaCarrito = [];

// Lo guardamos en el navegador para que no se pierda al recargar la página.
// localStorage solo guarda texto: JSON.stringify() para guardar y JSON.parse() para leer.
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(listaCarrito));
}

function cargarCarrito() {
  const guardado = localStorage.getItem('carrito');
  if (guardado !== null) {
    listaCarrito = JSON.parse(guardado);
  }
}


// =============================================================
// 2. ELEMENTOS DEL HTML
// =============================================================
const ventanaCarrito = document.querySelector('#carrito');
const fondoCarrito = document.querySelector('#carrito-fondo');
const listaHTMLCarrito = document.querySelector('#carrito-lista');
const totalCarrito = document.querySelector('#carrito-total');
const numeritoCarrito = document.querySelector('#carrito-cantidad');
const inputClienteCarrito = document.querySelector('#carrito-cliente');
const errorCarrito = document.querySelector('#carrito-error');
const botonAbrirCarrito = document.querySelector('#boton-carrito');
const botonCerrarCarrito = document.querySelector('#carrito-cerrar');
const botonPedirCarrito = document.querySelector('#carrito-pedir');
const botonVaciarCarrito = document.querySelector('#carrito-vaciar');


// =============================================================
// 3. AGREGAR, CAMBIAR CANTIDAD Y VACIAR
// =============================================================
// Recibe una pulsera { clave, nombre, color, dije, precio }.
// Si ya estaba en el carrito, solo le suma 1 a su cantidad.
function agregarAlCarrito(pulsera) {

  // findIndex() busca la posición de la pulsera con la misma clave (-1 si no está)
  const indice = listaCarrito.findIndex(function (item) {
    return item.clave === pulsera.clave;
  });

  if (indice !== -1) {
    listaCarrito[indice].cantidad = listaCarrito[indice].cantidad + 1;
  } else {
    pulsera.cantidad = 1;
    listaCarrito.push(pulsera);
  }

  guardarCarrito();
  mostrarCarrito();
}

// Suma (cambio = 1) o resta (cambio = -1) una unidad.
// Si la cantidad llega a 0, la pulsera se quita del carrito.
function cambiarCantidad(clave, cambio) {
  const indice = listaCarrito.findIndex(function (item) {
    return item.clave === clave;
  });

  listaCarrito[indice].cantidad = listaCarrito[indice].cantidad + cambio;

  if (listaCarrito[indice].cantidad === 0) {
    listaCarrito.splice(indice, 1);   // splice(posición, cantidad): elimina del arreglo
  }

  guardarCarrito();
  mostrarCarrito();
}

function vaciarCarrito() {
  listaCarrito = [];
  guardarCarrito();
  mostrarCarrito();
}


// =============================================================
// 4. MOSTRAR EL CARRITO (renderizado)
// =============================================================
function mostrarCarrito() {

  listaHTMLCarrito.innerHTML = '';
  let total = 0;
  let cantidadPulseras = 0;

  if (listaCarrito.length === 0) {
    listaHTMLCarrito.innerHTML = '<li class="py-10 text-center text-stone-500">Tu carrito está vacío.</li>';
  }

  listaCarrito.forEach(function (pulsera) {

    const subtotal = pulsera.precio * pulsera.cantidad;
    total = total + subtotal;
    cantidadPulseras = cantidadPulseras + pulsera.cantidad;

    const elemento = document.createElement('li');
    elemento.className = 'flex items-center justify-between gap-3 rounded-xl border border-guapinol-brown/10 bg-white p-4';
    elemento.innerHTML = `
      <div>
        <p class="font-semibold">${pulsera.nombre}</p>
        <p class="text-sm text-stone-500">${pulsera.color} · ${pulsera.dije}</p>
        <p class="mt-1 text-sm font-medium">${formatoColones(subtotal)}</p>
      </div>
      <div class="flex items-center gap-2">
        <button type="button" class="restar h-8 w-8 rounded-full border border-stone-300 hover:bg-guapinol-cream">−</button>
        <span class="w-5 text-center font-semibold">${pulsera.cantidad}</span>
        <button type="button" class="sumar h-8 w-8 rounded-full border border-stone-300 hover:bg-guapinol-cream">+</button>
      </div>
    `;

    // Botones − y + de esta pulsera
    elemento.querySelector('.restar').addEventListener('click', function () {
      cambiarCantidad(pulsera.clave, -1);
    });
    elemento.querySelector('.sumar').addEventListener('click', function () {
      cambiarCantidad(pulsera.clave, 1);
    });

    listaHTMLCarrito.appendChild(elemento);
  });

  totalCarrito.textContent = formatoColones(total);

  // Numerito verde del botón del navbar: se oculta si el carrito está vacío
  numeritoCarrito.textContent = cantidadPulseras;
  if (cantidadPulseras === 0) {
    numeritoCarrito.classList.add('hidden');
    numeritoCarrito.classList.remove('flex');
  } else {
    numeritoCarrito.classList.remove('hidden');
    numeritoCarrito.classList.add('flex');
  }
}


// =============================================================
// 5. ABRIR Y CERRAR EL CARRITO
// =============================================================
function abrirCarrito() {
  ventanaCarrito.classList.remove('hidden');
}

function cerrarCarrito() {
  ventanaCarrito.classList.add('hidden');
}

botonAbrirCarrito.addEventListener('click', abrirCarrito);
botonCerrarCarrito.addEventListener('click', cerrarCarrito);
fondoCarrito.addEventListener('click', cerrarCarrito);   // clic en la parte oscura, fuera del panel


// =============================================================
// 6. PEDIR TODO POR WHATSAPP
// =============================================================
botonPedirCarrito.addEventListener('click', function () {

  const nombre = inputClienteCarrito.value.trim();

  if (listaCarrito.length === 0) {
    errorCarrito.textContent = 'Tu carrito está vacío.';
    return;
  }
  if (nombre.length < 3) {
    errorCarrito.textContent = 'Escribe tu nombre para identificar el pedido (mínimo 3 letras).';
    inputClienteCarrito.focus();
    return;
  }
  errorCarrito.textContent = '';

  // Se arma el mensaje: una línea por pulsera, y al final el total y el nombre
  let mensaje = SALUDO + ', quiero hacer este pedido:\n';
  let total = 0;

  listaCarrito.forEach(function (pulsera) {
    const subtotal = pulsera.precio * pulsera.cantidad;
    total = total + subtotal;
    mensaje = mensaje + '• ' + pulsera.cantidad + ' x ' + pulsera.nombre + ' (' + pulsera.color + ', ' + pulsera.dije + ') = ' + formatoColones(subtotal) + '\n';
  });

  mensaje = mensaje + 'Total: ' + formatoColones(total) + '\n';
  mensaje = mensaje + 'A nombre de: ' + nombre;

  enviarWhatsApp(mensaje);   // está en pedidos.js
});

botonVaciarCarrito.addEventListener('click', vaciarCarrito);


// =============================================================
// 7. PRIMER DIBUJO
// =============================================================
// Al abrir la página se lee el carrito guardado y se muestra
cargarCarrito();
mostrarCarrito();
