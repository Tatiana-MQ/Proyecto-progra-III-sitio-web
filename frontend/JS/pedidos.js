// pedidos.js: formato de colones y mensajes de WhatsApp
// se carga primero porque los otros archivos usan sus funciones

// numero de la tienda
const WHATSAPP = '50684131678';

// con esto empiezan todos los mensajes
const SALUDO = 'Hola Artesanías Guapinol';

// los precios ahora vienen del servidor (cada producto trae su precio)


// pone el número en colones, por ejemplo 5000 queda ₡5 000
function formatoColones(numero) {
  return '₡' + numero.toLocaleString('es-CR');
}

// abre whatsapp en otra pestaña con el mensaje listo
function enviarWhatsApp(mensaje) {
  const enlace = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje);
  window.open(enlace, '_blank');
}
