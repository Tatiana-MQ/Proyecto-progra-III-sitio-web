/* contacto.js | Formulario de contacto con validación y año del footer. */

// ================= PERSONA 2: catálogo y contacto =================
(function () {
  const TELEFONO = '50684131678';          // WhatsApp de la tienda (con 506)
  const enlaceWhatsApp = function (texto) { return `https://wa.me/${TELEFONO}?text=${encodeURIComponent(texto)}`; };

  // ---------- 4. FORMULARIO DE CONTACTO ----------
  const form = document.getElementById('form-contacto');

  // Cada regla devuelve true si está bien, o el texto del error
  const REGLAS = {
    nombre:   function (v) { return v.length >= 3 || 'Escribe tu nombre (mínimo 3 letras).'; },
    telefono: function (v) { return /^[245678]\d{7}$/.test(v.replace(/[\s-]/g, '')) || 'Escribe un número de 8 dígitos, por ejemplo 8888 8888.'; },
    correo:   function (v) { return v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Revisa el correo, por ejemplo nombre@correo.com.'; },
    motivo:   function (v) { return v !== '' || 'Elige el motivo de tu mensaje.'; },
    mensaje:  function (v) { return v.length >= 10 || 'Cuéntanos un poco más (mínimo 10 caracteres).'; }
  };

  function validar(campo) {
    const resultado = REGLAS[campo.name](campo.value.trim());
    const valido = resultado === true;
    document.getElementById('error-' + campo.name).textContent = valido ? '' : resultado;
    campo.setAttribute('aria-invalid', !valido);
    return valido;
  }

  if (form) {
    const campos = Object.keys(REGLAS).map(function (nombre) { return form.elements[nombre]; });
    const estado = document.getElementById('form-estado');

    campos.forEach(function (campo) {
      campo.addEventListener('blur', function () { validar(campo); });
      // Si ya tenía error, se revisa mientras escribe para quitarlo al corregir
      campo.addEventListener('input', function () {
        if (campo.getAttribute('aria-invalid') === 'true') validar(campo);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      estado.textContent = '';
      const invalidos = campos.filter(function (c) { return !validar(c); });
      if (invalidos.length) {
        invalidos[0].focus();
        return;
      }

      const v = function (n) { return form.elements[n].value.trim(); };
      const texto = [
        'Hola Artesanías Guapinol ',
        'Motivo: ' + v('motivo'),
        'Nombre: ' + v('nombre'),
        'Teléfono: ' + v('telefono'),
        v('correo') ? 'Correo: ' + v('correo') : '',
        '',
        v('mensaje')
      ].filter(function (l, i, arr) { return l !== '' || arr[i - 1] !== ''; }).join('\n');

      window.open(enlaceWhatsApp(texto), '_blank');
      form.reset();
      campos.forEach(function (c) { c.removeAttribute('aria-invalid'); });
      estado.textContent = 'Se abrió WhatsApp con tu mensaje. Solo falta tocar Enviar.';
    });
  }

  // ---------- 5. FOOTER ----------
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
