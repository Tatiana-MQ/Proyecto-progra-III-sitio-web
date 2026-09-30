// ================= PERSONA 1: menú =================
// ================= PERSONA 2: catálogo y contacto =================
// ================= PERSONA 3: visor 3D =================
// ================= PERSONA 4(Tati): datos, precios y WhatsApp =================
// ================= PERSONA 4: datos, precios y WhatsApp =================
const WHATSAPP = '50684131678';

const PRECIOS_INICIALES = {
  pulseraUnTono: 4500,
  pulseraDosTonos: 5500,
  dijeMetalico: 1500,
  dijeNatural: 1000,
};

// Guarda los precios la primera vez y los lee después
function obtenerPrecios() {
  const guardados = localStorage.getItem('precios');
  if (guardados) return JSON.parse(guardados);
  localStorage.setItem('precios', JSON.stringify(PRECIOS_INICIALES));
  return PRECIOS_INICIALES;
}

function formatoColones(n) {
  return '₡' + n.toLocaleString('es-CR');
}

// config = { hilo: 'un_tono' | 'dos_tonos', color1, color2, dije: 'ninguno' | 'metalico' | 'natural' }
function calcularTotal(config) {
  const p = obtenerPrecios();
  let total = config.hilo === 'dos_tonos' ? p.pulseraDosTonos : p.pulseraUnTono;
  if (config.dije === 'metalico') total += p.dijeMetalico;
  if (config.dije === 'natural') total += p.dijeNatural;
  return total;
}

function pedirPorWhatsApp(config, nombreCliente) {
  const mensaje = [
    'Hola Artesanías Guapinol, quiero hacer este pedido:',
    '• Pulsera de macramé personalizada',
    '• Hilo: ' + config.color1 + (config.hilo === 'dos_tonos' ? ' y ' + config.color2 : ''),
    '• Dije: ' + config.dije,
    'Total: ' + formatoColones(calcularTotal(config)),
    'A nombre de: ' + nombreCliente,
  ].join('\n');

  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje), '_blank');
}


