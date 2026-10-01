/* pedidos.js | Precios y pedidos por WhatsApp. Se carga primero: los demás archivos usan sus funciones. */

// ================= PERSONA 1: menú =================
// ================= PERSONA 2: catálogo y contacto =================
// ================= PERSONA 3: visor 3D =================
// ================= PERSONA 4(Tati): datos, precios y WhatsApp =================

const WHATSAPP = '50684131678';

const PRECIOS_INICIALES = {
  pulseraPiedras: 4000,       // piedras naturales sin dije
  pulseraPiedrasDije: 4500,   // piedras con dije de corazón
  pulseraMacrame: 5000,       // macramé con dije yin yang
};

// Guarda los precios la primera vez y los lee después
function obtenerPrecios() {
  const guardados = localStorage.getItem('precios');
  // Si el navegador tenía precios guardados de antes, se completan con los nuevos
  if (guardados) return { ...PRECIOS_INICIALES, ...JSON.parse(guardados) };
  localStorage.setItem('precios', JSON.stringify(PRECIOS_INICIALES));
  return PRECIOS_INICIALES;
}

function formatoColones(n) {
  return '₡' + n.toLocaleString('es-CR');
}

// modelo = 'piedras' | 'piedrasDije' | 'macrame'
function calcularTotal(modelo) {
  const p = obtenerPrecios();
  if (modelo === 'piedras') return p.pulseraPiedras;
  if (modelo === 'piedrasDije') return p.pulseraPiedrasDije;
  return p.pulseraMacrame;
}

// pedido = { id, nombre, color, dije } (lo envía el personalizador de Persona 3)
function pedirPorWhatsApp(pedido, nombreCliente) {
  const mensaje = [
    'Hola Artesanías Guapinol, quiero hacer este pedido:',
    '• Pulsera: ' + pedido.nombre + ' (' + pedido.color + ')',
    '• Dije: ' + pedido.dije,
    'Total: ' + formatoColones(calcularTotal(pedido.id)),
    'A nombre de: ' + nombreCliente,
  ].join('\n');

  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje), '_blank');
}
