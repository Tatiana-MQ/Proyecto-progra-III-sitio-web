// ================= PERSONA 1: menú =================
// ================= PERSONA 2: catálogo y contacto =================
// ================= PERSONA 3: vista 360° =================
(() => {
  // ---------- 1. DATOS DEL CATÁLOGO ----------
  const CATALOGO = {
    carpeta: 'assets/images/360/',
    vistas: 36,     // fotos por pulsera
    columnas: 6,    // columnas de la cuadrícula dentro de la imagen
    productos: [
      {
        nombre: 'Pulsera de piedras naturales',
        descripcion: 'Cuentas de 8 mm en elástico resistente.',
        precio: '₡4000',
        variantes: [
          { nombre: 'Ágata azul',       color: '#2447d8', imagen: 'piedras-agata-azul.webp' },
          { nombre: 'Amatista',         color: '#8e5fcc', imagen: 'piedras-amatista.webp' },
          { nombre: 'Aventurina verde', color: '#8fcca0', imagen: 'piedras-aventurina-verde.webp' },
          { nombre: 'Cuarzo rosa',      color: '#f2b6c4', imagen: 'piedras-cuarzo-rosa.webp' },
          { nombre: 'Howlita blanca',   color: '#f1f0eb', imagen: 'piedras-howlita-blanca.webp' },
          { nombre: 'Ónix negro',       color: '#1a1a1a', imagen: 'piedras-onix-negro.webp' }
        ]
      },
      {
        nombre: 'Pulsera de piedras con corazón',
        descripcion: 'Piedras naturales con dije de corazón metálico.',
        precio: '₡4000',
        variantes: [
          { nombre: 'Aventurina, corazón dorado',   color: '#8fcca0', imagen: 'corazon-aventurina-dorado.webp' },
          { nombre: 'Cuarzo rosa, corazón oro rosa', color: '#f2b6c4', imagen: 'corazon-cuarzo-rosa-oro-rosa.webp' },
          { nombre: 'Howlita, corazón oro rosa',    color: '#f1f0eb', imagen: 'corazon-howlita-oro-rosa.webp' }
        ]
      },
      {
        nombre: 'Pulsera de macramé yin yang',
        descripcion: 'Doble tira tejida a mano con cierre ajustable.',
        precio: 'Consultar',
        variantes: [
          { nombre: 'Negro',       color: '#161616', imagen: 'macrame-negro.webp' },
          { nombre: 'Rojo',        color: '#9c1c24', imagen: 'macrame-rojo.webp' },
          { nombre: 'Azul marino', color: '#1d2b4d', imagen: 'macrame-azul-marino.webp' },
          { nombre: 'Café',        color: '#5b3a22', imagen: 'macrame-cafe.webp' },
          { nombre: 'Beige',       color: '#d8c6a4', imagen: 'macrame-beige.webp' }
        ]
      }
    ]
  };

  // ---------- 2. VISOR 360° ----------
  // Recibe un div y la imagen. Devuelve una función para cambiar de imagen.
  function crearVisor(visor, imagen) {
    const { vistas, columnas } = CATALOGO;
    const filas = Math.ceil(vistas / columnas);
    visor.style.backgroundSize = `${columnas * 100}% ${filas * 100}%`;

    let posicion = 0;          // foto actual (puede tener decimales)
    let arrastrando = false;
    let inicioX = 0, inicioPosicion = 0, pausaHasta = 0, ultimoTiempo = 0;

    // Mueve la imagen de fondo para mostrar la foto número "p"
    function mostrar(p) {
      const foto = ((Math.round(p) % vistas) + vistas) % vistas;
      const col = foto % columnas, fila = Math.floor(foto / columnas);
      visor.style.backgroundPosition = `${(col / (columnas - 1)) * 100}% ${(fila / (filas - 1)) * 100}%`;
    }

    // Giro automático: una vuelta cada 9 segundos
    function girar(tiempo) {
      if (!arrastrando && tiempo > pausaHasta) {
        posicion += ((tiempo - ultimoTiempo) / 1000) * (vistas / 9);
        mostrar(posicion);
      }
      ultimoTiempo = tiempo;
      requestAnimationFrame(girar);
    }

    // Arrastrar con mouse o dedo: el ancho completo equivale a una vuelta
    visor.addEventListener('pointerdown', (e) => {
      arrastrando = true;
      inicioX = e.clientX;
      inicioPosicion = posicion;
      visor.setPointerCapture(e.pointerId);
    });
    visor.addEventListener('pointermove', (e) => {
      if (!arrastrando) return;
      posicion = inicioPosicion - (e.clientX - inicioX) / (visor.clientWidth / vistas);
      mostrar(posicion);
    });
    const soltar = () => {
      arrastrando = false;
      pausaHasta = performance.now() + 2000;   // espera 2 s antes de seguir girando
    };
    visor.addEventListener('pointerup', soltar);
    visor.addEventListener('pointercancel', soltar);   // en celular, si el usuario hace scroll

    // La imagen se descarga solo cuando la tarjeta aparece en pantalla
    const cambiarImagen = (img) => { visor.style.backgroundImage = `url("${CATALOGO.carpeta + img}")`; };
    new IntersectionObserver((entradas, observador) => {
      if (entradas[0].isIntersecting) {
        cambiarImagen(imagen);
        requestAnimationFrame(girar);
        observador.disconnect();
      }
    }).observe(visor);

    mostrar(0);
    return cambiarImagen;
  }

  // ---------- 3. TARJETA DE PRODUCTO ----------
  function crearTarjeta(producto) {
    let actual = producto.variantes[0];
    const tarjeta = document.createElement('article');
    tarjeta.className = 'flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white';

    tarjeta.innerHTML = `
      <div class="bg-stone-50 p-4">
        <div class="visor aspect-[16/10] w-full cursor-grab touch-pan-y select-none bg-no-repeat"
             role="img" aria-label="${producto.nombre}, vista 360°"></div>
      </div>
      <div class="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 class="text-lg font-semibold">${producto.nombre}</h3>
          <p class="text-sm text-stone-600">${producto.descripcion}</p>
        </div>
        <div class="flex flex-wrap gap-2.5">
          ${producto.variantes.map((v, i) => `
            <button data-i="${i}" title="${v.nombre}" aria-label="${v.nombre}" aria-pressed="${i === 0}"
                    class="h-8 w-8 rounded-full ring-1 ring-black/15 ring-offset-2 aria-pressed:ring-2 aria-pressed:ring-stone-900"
                    style="background:${v.color}"></button>`).join('')}
        </div>
        <p class="variante text-sm text-stone-500">${actual.nombre}</p>
        <div class="mt-auto flex items-center justify-between">
          <span class="text-lg font-semibold">${producto.precio}</span>
          <button class="pedido h-11 rounded-xl bg-stone-900 px-4 text-sm font-medium text-white hover:bg-stone-700">
            Agregar al pedido
          </button>
        </div>
      </div>`;

    const cambiarImagen = crearVisor(tarjeta.querySelector('.visor'), actual.imagen);

    // Botones de color: cambian la imagen y el nombre de la variante
    tarjeta.querySelectorAll('[data-i]').forEach((boton) => {
      boton.addEventListener('click', () => {
        actual = producto.variantes[boton.dataset.i];
        tarjeta.querySelectorAll('[data-i]').forEach((b) => b.setAttribute('aria-pressed', b === boton));
        tarjeta.querySelector('.variante').textContent = actual.nombre;
        cambiarImagen(actual.imagen);
      });
    });

    // Botón de pedido: avisa al módulo de pedidos (Persona 4)
    tarjeta.querySelector('.pedido').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('guapinol:pedido', {
        detail: { producto: producto.nombre, variante: actual.nombre, precio: producto.precio }
      }));
    });

    return tarjeta;
  }

  // ---------- 4. INICIO ----------
  const contenedor = document.getElementById('catalogo-360');
  if (contenedor) {
    contenedor.className = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3';
    CATALOGO.productos.forEach((p) => contenedor.appendChild(crearTarjeta(p)));
  }
})();
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


