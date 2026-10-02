/* menu.js | Menú del navbar en celular. */

// ================= PERSONA 1: menú =================
// En pantallas pequeñas los enlaces del navbar se esconden y aparece un botón
// de tres rayas. Este archivo hace que ese botón abra y cierre el menú.


// =============================================================
// 1. ELEMENTOS DEL HTML
// =============================================================
const botonMenu = document.querySelector('#boton-menu');
const menuMovil = document.querySelector('#menu-movil');
const iconoAbrir = document.querySelector('#icono-abrir');     // las tres rayas
const iconoCerrar = document.querySelector('#icono-cerrar');   // la X


// =============================================================
// 2. ABRIR Y CERRAR
// =============================================================
// La clase "hidden" de Tailwind oculta un elemento.
// Quitarla lo muestra; agregarla lo oculta.
function abrirMenu() {
  menuMovil.classList.remove('hidden');
  iconoAbrir.classList.add('hidden');
  iconoCerrar.classList.remove('hidden');
}

function cerrarMenu() {
  menuMovil.classList.add('hidden');
  iconoAbrir.classList.remove('hidden');
  iconoCerrar.classList.add('hidden');
}


// =============================================================
// 3. EVENTOS
// =============================================================
// Al tocar el botón: si el menú está oculto se abre; si no, se cierra.
botonMenu.addEventListener('click', function () {
  if (menuMovil.classList.contains('hidden')) {
    abrirMenu();
  } else {
    cerrarMenu();
  }
});

// Al tocar cualquier enlace del menú, este se cierra.
// event.target es el elemento exacto que se tocó; si es un enlace (<a>), cerramos.
menuMovil.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    cerrarMenu();
  }
});
