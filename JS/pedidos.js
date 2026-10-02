/* pedidos.js | Precios y envío de pedidos por WhatsApp. Se carga primero: los demás archivos usan sus funciones. */

// ================= PERSONA 4(Tati): datos, precios y WhatsApp =================


// =============================================================
// 1. DATOS
// =============================================================
// Número de WhatsApp de la tienda: con el 506 de Costa Rica, sin espacios ni +
const WHATSAPP = '50684131678';

// ★ TEXTOS DE WHATSAPP ★ Aquí se cambia el saludo con el que empiezan TODOS los mensajes
// (catálogo, carrito, personalizador y contacto). Para cambiar el resto del texto de cada
// mensaje, busca la palabra "mensaje" en: catalogo.js, carrito.js, contacto.js y abajo en este archivo.
const SALUDO = 'Hola Artesanías Guapinol';

// Precios de la tienda (en colones)
const PRECIOS = {
  // Catálogo: un precio general por categoría
  collares: 6000,
  pulseras: 4000,
  // Visor 3D (excepción): cada modelo tiene su propio precio
  piedras: 3000,       // 1.ª pulsera del visor
  piedrasDije: 3000,   // 2.ª pulsera del visor
  macrame: 4000        // 3.ª pulsera del visor
};


// =============================================================
// 2. FUNCIONES QUE USAN LOS DEMÁS ARCHIVOS
// =============================================================

// Escribe un número como colones: 5000 → "₡5 000"
function formatoColones(numero) {
  return '₡' + numero.toLocaleString('es-CR');
}

// Devuelve el precio según la categoría del catálogo ('collares', 'pulseras')
// o según el modelo del visor 3D ('piedras', 'piedrasDije', 'macrame')
function calcularTotal(modelo) {
  return PRECIOS[modelo];
}

/*
Abre WhatsApp en una pestaña nueva con un mensaje ya escrito.
  - wa.me/NUMERO?text=MENSAJE es el enlace oficial de WhatsApp.
  - encodeURIComponent() convierte los espacios, tildes y saltos de línea
    a un formato que se puede poner en un enlace.
  - '_blank' significa "en una pestaña nueva".
*/
function enviarWhatsApp(mensaje) {
  const enlace = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje);
  window.open(enlace, '_blank');
}

// Arma el mensaje de un pedido del personalizador y lo envía.
// pedido = { id, nombre, color, dije }
// '\n' es un salto de línea dentro del mensaje.
function pedirPorWhatsApp(pedido, nombreCliente) {
  let mensaje = SALUDO + ', quiero hacer este pedido:\n';
  mensaje = mensaje + '• Pulsera: ' + pedido.nombre + ' (' + pedido.color + ')\n';
  mensaje = mensaje + '• Dije: ' + pedido.dije + '\n';
  mensaje = mensaje + 'Total: ' + formatoColones(calcularTotal(pedido.id)) + '\n';
  mensaje = mensaje + 'A nombre de: ' + nombreCliente;

  enviarWhatsApp(mensaje);
}
