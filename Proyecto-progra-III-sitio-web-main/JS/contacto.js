/* contacto.js | Formulario de contacto con validación y año del footer. */

// Persona 2: contacto y footer


// ===== 1. ELEMENTOS DEL HTML =====
const formularioContacto = document.querySelector('#form-contacto');

const inputNombre = document.querySelector('#nombre');
const inputTelefono = document.querySelector('#telefono');
const inputCorreo = document.querySelector('#correo');
const selectMotivo = document.querySelector('#motivo');
const inputMensaje = document.querySelector('#mensaje');

// Párrafos de error de cada campo
const errorNombre = document.querySelector('#error-nombre');
const errorTelefono = document.querySelector('#error-telefono');
const errorCorreo = document.querySelector('#error-correo');
const errorMotivo = document.querySelector('#error-motivo');
const errorMensaje = document.querySelector('#error-mensaje');

const estadoFormulario = document.querySelector('#form-estado');


// ===== 2. MOSTRAR Y QUITAR ERRORES =====

// Escribe el error y pone el borde rojo
function mostrarError(campo, parrafo, texto) {
  parrafo.textContent = texto;
  campo.classList.remove('border-stone-300');
  campo.classList.add('border-red-500');
}

// Borra el error y vuelve al borde normal
function quitarError(campo, parrafo) {
  parrafo.textContent = '';
  campo.classList.remove('border-red-500');
  campo.classList.add('border-stone-300');
}


// ===== 3. VALIDAR Y ENVIAR =====

// Revisa cada campo; si todo está bien, abre WhatsApp con el mensaje
formularioContacto.addEventListener('submit', function (event) {

  event.preventDefault();   // no recarga la página

  // Valores sin espacios a los lados
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();
  const correo = inputCorreo.value.trim();
  const motivo = selectMotivo.value;
  const mensaje = inputMensaje.value.trim();

  // Limpia los errores anteriores
  quitarError(inputNombre, errorNombre);
  quitarError(inputTelefono, errorTelefono);
  quitarError(inputCorreo, errorCorreo);
  quitarError(selectMotivo, errorMotivo);
  quitarError(inputMensaje, errorMensaje);
  estadoFormulario.textContent = '';

  // Si algún campo está mal, hayErrores pasa a true
  let hayErrores = false;

  if (nombre.length < 3) {
    mostrarError(inputNombre, errorNombre, 'Escribe tu nombre (mínimo 3 letras).');
    hayErrores = true;
  }

  // Teléfono: 8 dígitos (sin contar espacios ni guiones)
  const soloNumeros = telefono.replaceAll(' ', '').replaceAll('-', '');
  if (/^[0-9]{8}$/.test(soloNumeros) === false) {
    mostrarError(inputTelefono, errorTelefono, 'Escribe un número de 8 dígitos, por ejemplo 8888 8888.');
    hayErrores = true;
  }

  // Correo: opcional, pero si se escribe debe tener @ y punto
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

  // Con errores no se envía nada
  if (hayErrores) {
    return;
  }

  // Arma el mensaje de WhatsApp
  let texto = SALUDO + '\n';
  texto = texto + 'Motivo: ' + motivo + '\n';
  texto = texto + 'Nombre: ' + nombre + '\n';
  texto = texto + 'Teléfono: ' + telefono + '\n';
  if (correo !== '') {
    texto = texto + 'Correo: ' + correo + '\n';
  }
  texto = texto + '\n' + mensaje;

  enviarWhatsApp(texto);   // pedidos.js

  // Limpia el formulario y avisa
  formularioContacto.reset();
  estadoFormulario.textContent = 'Se abrió WhatsApp con tu mensaje. Solo falta tocar Enviar.';
});


// ===== 4. FOOTER: AÑO ACTUAL =====
document.querySelector('#anio').textContent = new Date().getFullYear();
