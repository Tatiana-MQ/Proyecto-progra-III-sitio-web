/* menu.js | Abre y cierra el menú del navbar en celular. */

// Persona 1: menú


// ===== 1. ELEMENTOS DEL HTML =====
const botonMenu = document.querySelector('#boton-menu');
const menuMovil = document.querySelector('#menu-movil');
const iconoAbrir = document.querySelector('#icono-abrir');     // tres rayas
const iconoCerrar = document.querySelector('#icono-cerrar');   // X


// ===== 2. ABRIR Y CERRAR =====
// La clase "hidden" de Tailwind oculta un elemento

// Muestra el menú y cambia el ícono a X
function abrirMenu() {
  menuMovil.classList.remove('hidden');
  iconoAbrir.classList.add('hidden');
  iconoCerrar.classList.remove('hidden');
}

// Oculta el menú y vuelve a las tres rayas
function cerrarMenu() {
  menuMovil.classList.add('hidden');
  iconoAbrir.classList.remove('hidden');
  iconoCerrar.classList.add('hidden');
}

// ===== 3. EVENTOS =====

// Botón del menú: abre si está cerrado, cierra si está abierto
botonMenu.addEventListener('click', function () {
  if (menuMovil.classList.contains('hidden')) {
    abrirMenu();
  } else {
    cerrarMenu();
  }
});

// Al tocar un enlace del menú, se cierra
menuMovil.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    cerrarMenu();
  }
});
