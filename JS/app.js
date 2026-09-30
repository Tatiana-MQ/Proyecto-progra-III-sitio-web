
// ================= PERSONA 1: menú =================
// ================= PERSONA 2: catálogo y contacto =================
// ================= PERSONA 3: visor 3D =================
// ================= PERSONA 4(Tati): datos, precios y WhatsApp =================

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


// ================= PERSONA 1: menú =================
(() => {
  // TODO Persona 1: falta el clic de #menu-btn para mostrar/ocultar #menu en celular.
})();

// ================= PERSONA 2: catálogo y contacto =================
(() => {
  const TELEFONO = '50684131678';          // WhatsApp de la tienda (con 506)
  const CARPETA = 'assets/images/360/';    // se reutilizan las imágenes del visor 360°

  // ---------- 1. DATOS DEL CATÁLOGO ----------
  // precio: número en colones, o null si es "Consultar"
  const PRODUCTOS = [
    { linea: 'Pulsera de piedras naturales', nombre: 'Ágata azul',       tipo: 'piedras', precio: 4000, imagen: 'piedras-agata-azul.webp' },
    { linea: 'Pulsera de piedras naturales', nombre: 'Amatista',         tipo: 'piedras', precio: 4000, imagen: 'piedras-amatista.webp' },
    { linea: 'Pulsera de piedras naturales', nombre: 'Aventurina verde', tipo: 'piedras', precio: 4000, imagen: 'piedras-aventurina-verde.webp' },
    { linea: 'Pulsera de piedras naturales', nombre: 'Cuarzo rosa',      tipo: 'piedras', precio: 4000, imagen: 'piedras-cuarzo-rosa.webp' },
    { linea: 'Pulsera de piedras naturales', nombre: 'Howlita blanca',   tipo: 'piedras', precio: 4000, imagen: 'piedras-howlita-blanca.webp' },
    { linea: 'Pulsera de piedras naturales', nombre: 'Ónix negro',       tipo: 'piedras', precio: 4000, imagen: 'piedras-onix-negro.webp' },
    { linea: 'Pulsera con corazón', nombre: 'Aventurina, corazón dorado',    tipo: 'corazon', precio: 4000, imagen: 'corazon-aventurina-dorado.webp' },
    { linea: 'Pulsera con corazón', nombre: 'Cuarzo rosa, corazón oro rosa', tipo: 'corazon', precio: 4000, imagen: 'corazon-cuarzo-rosa-oro-rosa.webp' },
    { linea: 'Pulsera con corazón', nombre: 'Howlita, corazón oro rosa',     tipo: 'corazon', precio: 4000, imagen: 'corazon-howlita-oro-rosa.webp' },
    { linea: 'Macramé yin yang', nombre: 'Negro',       tipo: 'macrame', precio: null, imagen: 'macrame-negro.webp' },
    { linea: 'Macramé yin yang', nombre: 'Rojo',        tipo: 'macrame', precio: null, imagen: 'macrame-rojo.webp' },
    { linea: 'Macramé yin yang', nombre: 'Azul marino', tipo: 'macrame', precio: null, imagen: 'macrame-azul-marino.webp' },
    { linea: 'Macramé yin yang', nombre: 'Café',        tipo: 'macrame', precio: null, imagen: 'macrame-cafe.webp' },
    { linea: 'Macramé yin yang', nombre: 'Beige',       tipo: 'macrame', precio: null, imagen: 'macrame-beige.webp' }
  ];

  const FILTROS = [
    { id: 'todas',   texto: 'Todas' },
    { id: 'piedras', texto: 'Piedras naturales' },
    { id: 'corazon', texto: 'Con corazón' },
    { id: 'macrame', texto: 'Macramé' }
  ];

  const colones = (n) => (n === null ? 'Consultar precio' : '₡' + n.toLocaleString('es-CR'));
  const enlaceWhatsApp = (texto) => `https://wa.me/${TELEFONO}?text=${encodeURIComponent(texto)}`;

  // ---------- 2. TARJETA DEL CATÁLOGO ----------
  function crearTarjeta(p) {
    const tarjeta = document.createElement('article');
    tarjeta.dataset.tipo = p.tipo;
    tarjeta.className = 'flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-50';

    const mensaje = `Hola Artesanías Guapinol, me interesa la ${p.linea.toLowerCase()} (${p.nombre}). ¿Está disponible?`;

    // La imagen es la cuadrícula de 36 fotos del 360°: con background-size 600%
    // y posición 0 0 se muestra solo la primera foto.
    tarjeta.innerHTML = `
      <div class="foto aspect-[16/10] w-full bg-no-repeat"
           style="background-size:600% 600%; background-position:0 0"
           data-img="${CARPETA + p.imagen}" role="img" aria-label="${p.linea}, ${p.nombre}"></div>
      <div class="flex flex-1 flex-col p-4">
        <p class="text-xs text-stone-500">${p.linea}</p>
        <h3 class="mt-1 font-semibold text-stone-900">${p.nombre}</h3>
        <p class="mt-auto pt-3 font-semibold text-stone-900">${colones(p.precio)}</p>
        <div class="mt-3 grid gap-2 sm:grid-cols-2">
          <a href="#personalizar" class="rounded-lg border border-stone-300 py-2 text-center text-sm hover:border-stone-900">Ver en 360°</a>
          <a href="${enlaceWhatsApp(mensaje)}" target="_blank" rel="noopener"
             class="rounded-lg bg-lime-400 py-2 text-center text-sm font-medium text-stone-900 hover:bg-lime-500">Pedir</a>
        </div>
      </div>`;
    return tarjeta;
  }

  // ---------- 3. PINTAR CATÁLOGO Y FILTROS ----------
  const grid = document.getElementById('catalog-grid');
  const zonaFiltros = document.getElementById('catalog-filtros');
  const total = document.getElementById('catalog-total');

  if (grid) {
    const tarjetas = PRODUCTOS.map(crearTarjeta);
    tarjetas.forEach((t) => grid.appendChild(t));

    // Las imágenes se descargan solo cuando la tarjeta está cerca de la pantalla
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.style.backgroundImage = `url("${e.target.dataset.img}")`;
        observador.unobserve(e.target);
      });
    }, { rootMargin: '200px' });
    grid.querySelectorAll('.foto').forEach((f) => observador.observe(f));

    // Muestra solo las tarjetas del tipo elegido y actualiza el contador
    function filtrar(id) {
      let visibles = 0;
      tarjetas.forEach((t) => {
        const mostrar = id === 'todas' || t.dataset.tipo === id;
        t.classList.toggle('hidden', !mostrar);
        if (mostrar) visibles++;
      });
      total.textContent = `${visibles} ${visibles === 1 ? 'pulsera' : 'pulseras'}`;
      zonaFiltros.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.filtro === id));
    }

    FILTROS.forEach((f) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.dataset.filtro = f.id;
      boton.textContent = f.texto;
      boton.className = 'rounded-full border border-stone-300 px-4 py-2 text-sm hover:border-stone-900 ' +
                        'aria-pressed:border-stone-900 aria-pressed:bg-stone-900 aria-pressed:text-white';
      boton.addEventListener('click', () => filtrar(f.id));
      zonaFiltros.appendChild(boton);
    });

    filtrar('todas');
  }

  // ---------- 4. FORMULARIO DE CONTACTO ----------
  const form = document.getElementById('form-contacto');

  // Cada regla devuelve true si está bien, o el texto del error
  const REGLAS = {
    nombre:   (v) => v.length >= 3 || 'Escribe tu nombre (mínimo 3 letras).',
    telefono: (v) => /^[245678]\d{7}$/.test(v.replace(/[\s-]/g, '')) || 'Escribe un número de 8 dígitos, por ejemplo 8888 8888.',
    correo:   (v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Revisa el correo, por ejemplo nombre@correo.com.',
    motivo:   (v) => v !== '' || 'Elige el motivo de tu mensaje.',
    mensaje:  (v) => v.length >= 10 || 'Cuéntanos un poco más (mínimo 10 caracteres).'
  };

  function validar(campo) {
    const resultado = REGLAS[campo.name](campo.value.trim());
    const valido = resultado === true;
    document.getElementById('error-' + campo.name).textContent = valido ? '' : resultado;
    campo.setAttribute('aria-invalid', !valido);
    return valido;
  }

  if (form) {
    const campos = Object.keys(REGLAS).map((nombre) => form.elements[nombre]);
    const estado = document.getElementById('form-estado');

    campos.forEach((campo) => {
      campo.addEventListener('blur', () => validar(campo));
      // Si ya tenía error, se revisa mientras escribe para quitarlo al corregir
      campo.addEventListener('input', () => {
        if (campo.getAttribute('aria-invalid') === 'true') validar(campo);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      estado.textContent = '';
      const invalidos = campos.filter((c) => !validar(c));
      if (invalidos.length) {
        invalidos[0].focus();
        return;
      }

      const v = (n) => form.elements[n].value.trim();
      const texto = [
        'Hola Artesanías Guapinol ',
        'Motivo: ' + v('motivo'),
        'Nombre: ' + v('nombre'),
        'Teléfono: ' + v('telefono'),
        v('correo') ? 'Correo: ' + v('correo') : '',
        '',
        v('mensaje')
      ].filter((l, i, arr) => l !== '' || arr[i - 1] !== '').join('\n');

      window.open(enlaceWhatsApp(texto), '_blank');
      form.reset();
      campos.forEach((c) => c.removeAttribute('aria-invalid'));
      estado.textContent = 'Se abrió WhatsApp con tu mensaje. Solo falta tocar Enviar.';
    });
  }

  // ---------- 5. FOOTER ----------
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();

// ================= PERSONA 3: personalizador semi-3D =================
// Panel con los 3 modelos: el usuario elige uno y luego su color.
// Se muestra solo el modelo elegido, girando con el visor 360° (crearVisor).
const Personalizador = (() => {
  const CARPETA = 'assets/images/360/';

  // ---------- 1. DATOS: los 3 modelos y sus colores ----------
  const MODELOS = [
    {
      nombre: 'Piedras naturales', dije: 'Sin dije',
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
      nombre: 'Piedras con dije', dije: 'Corazón metálico',
      variantes: [
        { nombre: 'Aventurina verde', color: '#8fcca0', imagen: 'corazon-aventurina-dorado.webp' },
        { nombre: 'Cuarzo rosa',      color: '#f2b6c4', imagen: 'corazon-cuarzo-rosa-oro-rosa.webp' },
        { nombre: 'Howlita blanca',   color: '#f1f0eb', imagen: 'corazon-howlita-oro-rosa.webp' }
      ]
    },
    {
      nombre: 'Macramé', dije: 'Dije yin yang',
      variantes: [
        { nombre: 'Negro',       color: '#161616', imagen: 'macrame-negro.webp' },
        { nombre: 'Rojo',        color: '#9c1c24', imagen: 'macrame-rojo.webp' },
        { nombre: 'Azul marino', color: '#1d2b4d', imagen: 'macrame-azul-marino.webp' },
        { nombre: 'Café',        color: '#5b3a22', imagen: 'macrame-cafe.webp' },
        { nombre: 'Beige',       color: '#d8c6a4', imagen: 'macrame-beige.webp' }
      ]
    }
  ];

  let modelo = MODELOS[0];
  let variante = modelo.variantes[0];
  let cambiarImagen;

  // ---------- 2. VISOR 360° ----------
  // Cada imagen trae 36 fotos de la pulsera en una cuadrícula de 6x6;
  // mostrando una tras otra, la pulsera "gira".
  // Recibe un div y la imagen. Devuelve una función para cambiar de imagen.
  function crearVisor(visor, imagen) {
    const vistas = 36, columnas = 6;   // fotos por pulsera y columnas de la cuadrícula
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
    const cambiarImagen = (img) => { visor.style.backgroundImage = `url("${CARPETA + img}")`; };
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

  // ---------- 3. PRECIO (con los datos de Persona 4) ----------
  function calcularPrecio() {
    const p = obtenerPrecios();
    if (modelo.nombre === 'Macramé') return p.pulseraUnTono + p.dijeMetalico;
    return p.pulseraPiedras ?? 4000;   // TODO Persona 4: agregar pulseraPiedras a PRECIOS_INICIALES
  }

  // ---------- 4. PANEL DE MODELOS ----------
  // Cada tarjeta muestra la primera foto de su modelo (con background-size 600%)
  function pintarModelos() {
    document.getElementById('panel-modelos').innerHTML = MODELOS.map((m, i) => `
      <button type="button" data-modelo="${i}" aria-pressed="${m === modelo}"
              class="flex flex-col overflow-hidden rounded-xl border border-stone-300 bg-white text-left hover:border-stone-500
                     aria-pressed:border-lime-500 aria-pressed:ring-2 aria-pressed:ring-lime-200">
        <span class="block aspect-[16/10] w-full bg-stone-50 bg-no-repeat"
              style="background-image:url('${CARPETA + m.variantes[0].imagen}'); background-size:600% 600%; background-position:0 0"></span>
        <span class="px-3 py-2 text-sm">
          <span class="block font-medium text-stone-900">${m.nombre}</span>
          <span class="text-stone-500">${m.dije}</span>
        </span>
      </button>`).join('');
  }

  // ---------- 5. COLORES DEL MODELO ELEGIDO ----------
  function pintarColores() {
    document.getElementById('panel-colores').innerHTML = modelo.variantes.map((v, i) => `
      <button type="button" data-color="${i}" title="${v.nombre}" aria-label="${v.nombre}" aria-pressed="${v === variante}"
              class="h-9 w-9 rounded-full ring-1 ring-black/15 ring-offset-2 aria-pressed:ring-2 aria-pressed:ring-stone-900"
              style="background:${v.color}"></button>`).join('');
    document.getElementById('color-nombre').textContent = variante.nombre;
  }

  // ---------- 6. MOSTRAR LA ELECCIÓN ----------
  function mostrar() {
    cambiarImagen(variante.imagen);
    document.getElementById('customizer-total').textContent = formatoColones(calcularPrecio());
  }

  // ---------- 7. PEDIDO POR WHATSAPP ----------
  function pedir(evento) {
    evento.preventDefault();
    const form = evento.target;
    const error = document.getElementById('customizer-error');
    const nombre = form.elements.cliente.value.trim();
    if (nombre.length < 3) {
      error.textContent = 'Escribe tu nombre para identificar el pedido (mínimo 3 letras).';
      form.elements.cliente.focus();
      return;
    }
    error.textContent = '';
    const mensaje = [
      'Hola Artesanías Guapinol, quiero hacer este pedido:',
      `• Pulsera: ${modelo.nombre} (${variante.nombre})`,
      '• Dije: ' + modelo.dije,
      'Total: ' + formatoColones(calcularPrecio()),
      'A nombre de: ' + nombre
    ].join('\n');
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje), '_blank');
  }

  // ---------- 8. INICIO ----------
  function iniciar() {
    const form = document.getElementById('customizer-form');
    const cont = document.getElementById('viewer-3d');
    if (!form || !cont) return;

    cont.className = 'grid aspect-square place-items-center rounded-3xl border border-stone-200 bg-stone-50 p-4';
    cont.innerHTML = `
      <div class="w-full">
        <div class="visor aspect-[16/10] w-full cursor-grab touch-pan-y select-none bg-no-repeat"
             role="img" aria-label="Vista 360° de tu pulsera"></div>
        <p class="mt-4 text-center text-sm text-stone-400">Arrastra para girar</p>
      </div>`;
    cambiarImagen = crearVisor(cont.querySelector('.visor'), variante.imagen);

    // Elegir modelo: se muestra ese modelo con su primer color
    document.getElementById('panel-modelos').addEventListener('click', (e) => {
      const boton = e.target.closest('[data-modelo]');
      if (!boton) return;
      modelo = MODELOS[boton.dataset.modelo];
      variante = modelo.variantes[0];
      pintarModelos(); pintarColores(); mostrar();
    });

    // Elegir color del modelo actual
    document.getElementById('panel-colores').addEventListener('click', (e) => {
      const boton = e.target.closest('[data-color]');
      if (!boton) return;
      variante = modelo.variantes[boton.dataset.color];
      pintarColores(); mostrar();
    });

    form.addEventListener('submit', pedir);
    pintarModelos();
    pintarColores();
    document.getElementById('customizer-total').textContent = formatoColones(calcularPrecio());
  }

  return { iniciar };
})();

// Se inicia cuando todo el archivo ya cargó (así las funciones de Persona 4 ya existen)
document.addEventListener('DOMContentLoaded', Personalizador.iniciar);
