/* pedidos.js | Precios y pedidos por WhatsApp. Va primero porque los demás archivos usan sus funciones. */

// Persona 4 (Tati): datos, precios y WhatsApp


// ===== 1. DATOS =====

// Número de WhatsApp de la tienda (con el 506)
const WHATSAPP = '50684131678';

// Saludo con el que empiezan todos los mensajes de WhatsApp
const SALUDO = 'Hola Artesanías Guapinol';

// Precios en colones
const PRECIOS = {
  // Catálogo: un precio por categoría
  collares: 6000,
  pulseras: 4000,
  llaveros: 3000,
  // Personalizador 3D: un precio por modelo
  piedras: 3000,
  piedrasDije: 3000,
  macrame: 4000
};


// ===== 2. FUNCIONES QUE USAN LOS DEMÁS ARCHIVOS =====

// Escribe un número como colones: 5000 → "₡5 000"
function formatoColones(numero) {
  return '₡' + numero.toLocaleString('es-CR');
}

// Devuelve el precio de una categoría o de un modelo 3D
function calcularTotal(modelo) {
  return PRECIOS[modelo];
}

// Abre WhatsApp en otra pestaña con el mensaje ya escrito
function enviarWhatsApp(mensaje) {
  const enlace = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje);
  window.open(enlace, '_blank');
}

// Arma el mensaje del pedido del personalizador y lo envía ('\n' = salto de línea)
function pedirPorWhatsApp(pedido, nombreCliente) {
  let mensaje = SALUDO + ', quiero hacer este pedido:\n';
  mensaje = mensaje + '• Pulsera: ' + pedido.nombre + ' (' + pedido.color + ')\n';
  mensaje = mensaje + '• Dije: ' + pedido.dije + '\n';
  mensaje = mensaje + 'Total: ' + formatoColones(calcularTotal(pedido.id)) + '\n';
  mensaje = mensaje + 'A nombre de: ' + nombreCliente;

  enviarWhatsApp(mensaje);
}
