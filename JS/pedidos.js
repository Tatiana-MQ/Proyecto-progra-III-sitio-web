// pedidos.js: precios y mensajes de WhatsApp
// se carga primero porque los otros archivos usan sus funciones

// Persona 4 (Tati): datos, precios y WhatsApp

// número de la tienda, con el 506 adelante
const WHATSAPP = '50684131678';

// con esto empiezan todos los mensajes
const SALUDO = 'Hola Artesanías Guapinol';

// precios en colones
const PRECIOS = {
  // catálogo (por categoría)
  collares: 6000,
  pulseras: 4000,
  llaveros: 3000,
  // personalizador 3D (por modelo)
  piedras: 3000,
  piedrasDije: 3000,
  macrame: 4000
};


// pone el número en colones, por ejemplo 5000 queda ₡5 000
function formatoColones(numero) {
  return '₡' + numero.toLocaleString('es-CR');
}

// busca el precio en PRECIOS (sirve para una categoría o un modelo)
function calcularTotal(modelo) {
  return PRECIOS[modelo];
}

// abre whatsapp en otra pestaña con el mensaje listo
function enviarWhatsApp(mensaje) {
  const enlace = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje);
  window.open(enlace, '_blank');
}

// mensaje del pedido del personalizador (\n es salto de línea)
function pedirPorWhatsApp(pedido, nombreCliente) {
  let mensaje = SALUDO + ', quiero hacer este pedido:\n';
  mensaje = mensaje + '- Pulsera: ' + pedido.nombre + ' (' + pedido.color + ')\n';
  mensaje = mensaje + '- Dije: ' + pedido.dije + '\n';
  mensaje = mensaje + 'Total: ' + formatoColones(calcularTotal(pedido.id)) + '\n';
  mensaje = mensaje + 'A nombre de: ' + nombreCliente;

  enviarWhatsApp(mensaje);
}
