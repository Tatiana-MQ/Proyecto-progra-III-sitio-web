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

// Precio de cada modelo de pulsera
const PRECIOS_INICIALES = {
  pulseraPiedras: 4000,
  pulseraPiedrasDije: 4500,
  pulseraMacrame: 5000,
  llavero: 3000,     
  collar: 6000       
};


// =============================================================
// 2. PRECIOS GUARDADOS EN EL NAVEGADOR (localStorage)
// =============================================================
/*
localStorage guarda información en el navegador, aunque se cierre la página.
Solo guarda TEXTO, por eso usamos:
  JSON.stringify() → objeto a texto (para guardar)
  JSON.parse()     → texto a objeto (para leer)
*/
function obtenerPrecios() {
  // Siempre se guardan los precios actuales de PRECIOS_INICIALES. Antes se guardaban solo
  // la primera vez, y si cambiabas un precio arriba, el navegador seguía usando el viejo.
  localStorage.setItem('preciosGuapinol', JSON.stringify(PRECIOS_INICIALES));
  return PRECIOS_INICIALES;
}


// =============================================================
// 3. FUNCIONES QUE USAN LOS DEMÁS ARCHIVOS
// =============================================================

// Escribe un número como colones: 5000 → "₡5 000"
function formatoColones(numero) {
  return '₡' + numero.toLocaleString('es-CR');
}

// Devuelve el precio de un modelo: 'piedras', 'piedrasDije' o 'macrame'
function calcularTotal(modelo) {
  const precios = obtenerPrecios();

  if (modelo === 'llavero') {
    return precios.llavero;
  }
  if (modelo === 'collar') {
    return precios.collar;
  }
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
