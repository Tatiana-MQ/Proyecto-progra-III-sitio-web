/* menu.js | Menú del navbar en celular. */

// ================= PERSONA 1: menú =================
(function () {
  // TODO Persona 1: falta el clic de #menu-btn para mostrar/ocultar #menu en celular.

  // Abre y cierra el menú en celular (#boton-menu y #menu-movil del navbar)
  const boton = document.getElementById('boton-menu');
  const menu = document.getElementById('menu-movil');
  if (boton && menu) {
    const alternar = function (abrir) {
      menu.classList.toggle('hidden', !abrir);
      document.getElementById('icono-abrir').classList.toggle('hidden', abrir);
      document.getElementById('icono-cerrar').classList.toggle('hidden', !abrir);
      boton.setAttribute('aria-expanded', abrir);
      boton.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    };
    boton.addEventListener('click', function () { alternar(menu.classList.contains('hidden')); });
    // Al tocar una opción, el menú se cierra
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        alternar(false);
      });
    });
  }
})();
