/* carrito.js | Carrito de compras: agregar pulseras, ver el total y pedir todo por WhatsApp. */

// ================= CARRITO =================
// El carrito es un arreglo de objetos. Cada objeto es una pulsera:
// { clave, nombre, color, dije, precio, cantidad }
// Se guarda en localStorage para que no se pierda al recargar la página.


// ---------- 1. DATOS ----------
let listaCarrito = [];

// Lee el carrito guardado en el navegador (si existe)
function cargarCarrito() {
  const guardado = localStorage.getItem('carrito');
  if (guardado !== null) {
    listaCarrito = JSON.parse(guardado);
  }
}

// Guarda el carrito en el navegador (como texto JSON)
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(listaCarrito));
}


// ---------- 2. AGREGAR, CAMBIAR CANTIDAD Y VACIAR ----------
// Recibe una pulsera: { clave, nombre, color, dije, precio }.
// Si ya estaba en el carrito, solo aumenta su cantidad.
function agregarAlCarrito(pulsera) {
  for (let i = 0; i < listaCarrito.length; i++) {
    if (listaCarrito[i].clave === pulsera.clave) {
      listaCarrito[i].cantidad = listaCarrito[i].cantidad + 1;
      guardarCarrito();
      pintarCarrito();
      return;
    }
  }

  // No estaba: se agrega con cantidad 1
  pulsera.cantidad = 1;
  listaCarrito.push(pulsera);
  guardarCarrito();
  pintarCarrito();
}

// Suma o resta 1 a la cantidad de la pulsera en la posición "indice".
// Si la cantidad llega a 0, se quita del carrito.
function cambiarCantidad(indice, cambio) {
  listaCarrito[indice].cantidad = listaCarrito[indice].cantidad + cambio;
  if (listaCarrito[indice].cantidad <= 0) {
    listaCarrito.splice(indice, 1);   // splice(posición, cuántos): elimina del arreglo
  }
  guardarCarrito();
  pintarCarrito();
}

function vaciarCarrito() {
  listaCarrito = [];
  guardarCarrito();
  pintarCarrito();
}


// ---------- 3. TOTALES ----------
function calcularTotalCarrito() {
  let total = 0;
  for (let i = 0; i < listaCarrito.length; i++) {
    total = total + listaCarrito[i].precio * listaCarrito[i].cantidad;
  }
  return total;
}

function contarPulseras() {
  let cantidad = 0;
  for (let i = 0; i < listaCarrito.length; i++) {
    cantidad = cantidad + listaCarrito[i].cantidad;
  }
  return cantidad;
}


// ---------- 4. DIBUJAR EL CARRITO ----------
// Vuelve a dibujar la lista, el total y el numerito del botón del navbar
function pintarCarrito() {
  const lista = document.getElementById('carrito-lista');
  lista.innerHTML = '';

  if (listaCarrito.length === 0) {
    lista.innerHTML = '<li class="py-10 text-center text-stone-500">Tu carrito está vacío.</li>';
  }

  for (let i = 0; i < listaCarrito.length; i++) {
    const pulsera = listaCarrito[i];
    const elemento = document.createElement('li');
    elemento.className = 'flex items-center justify-between gap-3 rounded-xl border border-guapinol-brown/10 bg-white p-4';
    elemento.innerHTML =
      '<div>' +
        '<p class="font-semibold">' + pulsera.nombre + '</p>' +
        '<p class="text-sm text-stone-500">' + pulsera.color + ' · ' + pulsera.dije + '</p>' +
        '<p class="mt-1 text-sm font-medium">' + formatoColones(pulsera.precio * pulsera.cantidad) + '</p>' +
      '</div>' +
      '<div class="flex items-center gap-2">' +
        '<button type="button" class="restar h-8 w-8 rounded-full border border-stone-300 hover:bg-guapinol-cream" aria-label="Quitar una">−</button>' +
        '<span class="w-5 text-center font-semibold">' + pulsera.cantidad + '</span>' +
        '<button type="button" class="sumar h-8 w-8 rounded-full border border-stone-300 hover:bg-guapinol-cream" aria-label="Agregar una">+</button>' +
      '</div>';

    // Botones − y + de esta pulsera
    elemento.querySelector('.restar').addEventListener('click', function () {
      cambiarCantidad(i, -1);
    });
    elemento.querySelector('.sumar').addEventListener('click', function () {
      cambiarCantidad(i, 1);
    });

    lista.appendChild(elemento);
  }

  document.getElementById('carrito-total').textContent = formatoColones(calcularTotalCarrito());

  // Numerito del botón del carrito: se oculta si no hay pulseras
  const contador = document.getElementById('carrito-cantidad');
  const cantidad = contarPulseras();
  contador.textContent = cantidad;
  if (cantidad === 0) {
    contador.classList.add('hidden');
    contador.classList.remove('flex');
  } else {
    contador.classList.remove('hidden');
    contador.classList.add('flex');
  }
}


// ---------- 5. ABRIR Y CERRAR ----------
function abrirCarrito() {
  document.getElementById('carrito').classList.remove('hidden');
  document.body.classList.add('overflow-hidden');   // evita que la página se mueva detrás
}

function cerrarCarrito() {
  document.getElementById('carrito').classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}


// ---------- 6. PEDIR TODO POR WHATSAPP ----------
function pedirCarrito() {
  const error = document.getElementById('carrito-error');
  const campoNombre = document.getElementById('carrito-cliente');
  const nombre = campoNombre.value.trim();

  if (listaCarrito.length === 0) {
    error.textContent = 'Tu carrito está vacío.';
    return;
  }
  if (nombre.length < 3) {
    error.textContent = 'Escribe tu nombre para identificar el pedido (mínimo 3 letras).';
    campoNombre.focus();
    return;
  }
  error.textContent = '';

  // Se arma el mensaje línea por línea
  let mensaje = 'Hola Artesanías Guapinol, quiero hacer este pedido:\n';
  for (let i = 0; i < listaCarrito.length; i++) {
    const pulsera = listaCarrito[i];
    mensaje = mensaje + '• ' + pulsera.cantidad + ' x ' + pulsera.nombre + ' (' + pulsera.color + ', ' + pulsera.dije + ') = ' +
              formatoColones(pulsera.precio * pulsera.cantidad) + '\n';
  }
  mensaje = mensaje + 'Total: ' + formatoColones(calcularTotalCarrito()) + '\n';
  mensaje = mensaje + 'A nombre de: ' + nombre;

  // WHATSAPP y formatoColones están en pedidos.js
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje), '_blank');
}


// ---------- 7. INICIO ----------
function iniciarCarrito() {
  if (document.getElementById('carrito') === null) {
    return;
  }

  document.getElementById('boton-carrito').addEventListener('click', abrirCarrito);
  document.getElementById('carrito-cerrar').addEventListener('click', cerrarCarrito);
  document.getElementById('carrito-fondo').addEventListener('click', cerrarCarrito);   // clic fuera del panel
  document.getElementById('carrito-pedir').addEventListener('click', pedirCarrito);
  document.getElementById('carrito-vaciar').addEventListener('click', vaciarCarrito);

  // Tecla Escape: cierra el carrito
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
      cerrarCarrito();
    }
  });

  cargarCarrito();
  pintarCarrito();
}

iniciarCarrito();
