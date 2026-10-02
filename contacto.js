/* contacto.js | Formulario de contacto con validación y año del footer. */

// ================= PERSONA 2: contacto y footer =================


// =============================================================
// 1. ELEMENTOS DEL HTML
// =============================================================
const formularioContacto = document.querySelector('#form-contacto');

const inputNombre = document.querySelector('#nombre');
const inputTelefono = document.querySelector('#telefono');
const inputCorreo = document.querySelector('#correo');
const selectMotivo = document.querySelector('#motivo');
const inputMensaje = document.querySelector('#mensaje');

// Párrafos donde se escribe el error de cada campo
const errorNombre = document.querySelector('#error-nombre');
const errorTelefono = document.querySelector('#error-telefono');
const errorCorreo = document.querySelector('#error-correo');
const errorMotivo = document.querySelector('#error-motivo');
const errorMensaje = document.querySelector('#error-mensaje');

const estadoFormulario = document.querySelector('#form-estado');


// =============================================================
// 2. MOSTRAR Y QUITAR ERRORES
// =============================================================
// Escribe el error debajo del campo y le pone el borde rojo
function mostrarError(campo, parrafo, texto) {
  parrafo.textContent = texto;
  campo.classList.remove('border-stone-300');
  campo.classList.add('border-red-500');
}

// Borra el error y devuelve el borde normal
function quitarError(campo, parrafo) {
  parrafo.textContent = '';
  campo.classList.remove('border-red-500');
  campo.classList.add('border-stone-300');
}


// =============================================================
// 3. EVENTO SUBMIT: VALIDAR Y ENVIAR
// =============================================================
formularioContacto.addEventListener('submit', function (event) {

  // Evitamos que el formulario recargue la página
  event.preventDefault();

  // 3.1 Obtener los valores (trim quita los espacios de los extremos)
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();
  const correo = inputCorreo.value.trim();
  const motivo = selectMotivo.value;
  const mensaje = inputMensaje.value.trim();

  // 3.2 Limpiar los errores anteriores
  quitarError(inputNombre, errorNombre);
  quitarError(inputTelefono, errorTelefono);
  quitarError(inputCorreo, errorCorreo);
  quitarError(selectMotivo, errorMotivo);
  quitarError(inputMensaje, errorMensaje);
  estadoFormulario.textContent = '';

  // 3.3 Validar cada campo. Si alguno está mal, hayErrores pasa a true.
  let hayErrores = false;

  if (nombre.length < 3) {
    mostrarError(inputNombre, errorNombre, 'Escribe tu nombre (mínimo 3 letras).');
    hayErrores = true;
  }

  // Teléfono: se quitan los espacios y guiones, y debe quedar un número de 8 dígitos
  const soloNumeros = telefono.replaceAll(' ', '').replaceAll('-', '');
  if (soloNumeros.length !== 8 || Number.isNaN(Number(soloNumeros))) {
    mostrarError(inputTelefono, errorTelefono, 'Escribe un número de 8 dígitos, por ejemplo 8888 8888.');
    hayErrores = true;
  }

  // Correo: es opcional, pero si se escribe debe tener @ y un punto
  if (correo !== '' && (!correo.includes('@') || !correo.includes('.'))) {
    mostrarError(inputCorreo, errorCorreo, 'Revisa el correo, por ejemplo nombre@correo.com.');
    hayErrores = true;
  }

  if (motivo === '') {
    mostrarError(selectMotivo, errorMotivo, 'Elige el motivo de tu mensaje.');
    hayErrores = true;
  }

  if (mensaje.length < 10) {
    mostrarError(inputMensaje, errorMensaje, 'Cuéntanos un poco más (mínimo 10 caracteres).');
    hayErrores = true;
  }

  // Si hubo algún error, no se envía nada
  if (hayErrores) {
    return;
  }

  // 3.4 Armar el mensaje de WhatsApp ('\n' es un salto de línea)
  let texto = 'Hola Artesanías Guapinol\n';
  texto = texto + 'Motivo: ' + motivo + '\n';
  texto = texto + 'Nombre: ' + nombre + '\n';
  texto = texto + 'Teléfono: ' + telefono + '\n';
  if (correo !== '') {
    texto = texto + 'Correo: ' + correo + '\n';
  }
  texto = texto + '\n' + mensaje;

  enviarWhatsApp(texto);   // está en pedidos.js

  // 3.5 Limpiar el formulario y avisar
  formularioContacto.reset();
  estadoFormulario.textContent = 'Se abrió WhatsApp con tu mensaje. Solo falta tocar Enviar.';
});


// =============================================================
// 4. FOOTER: AÑO ACTUAL
// =============================================================
// new Date() es la fecha de hoy; getFullYear() devuelve el año (por ejemplo 2026)
document.querySelector('#anio').textContent = new Date().getFullYear();
