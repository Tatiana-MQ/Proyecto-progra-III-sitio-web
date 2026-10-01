/* personalizador.js | Personaliza tu pulsera: panel de modelos, colores y visor 360°. */

// ================= PERSONA 3: personalizador semi-3D =================
// Panel con los 3 modelos: el usuario elige uno y luego su color.
// Se muestra solo el modelo elegido, girando con el visor 360°.


// ---------- 1. DATOS: los 3 modelos y sus colores ----------
const CARPETA = 'assets/images/360/';

const MODELOS = [
  {
    id: 'piedras', nombre: 'Piedras naturales', dije: 'Sin dije',
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
    id: 'piedrasDije', nombre: 'Piedras con dije', dije: 'Corazón metálico',
    variantes: [
      { nombre: 'Aventurina verde', color: '#8fcca0', imagen: 'corazon-aventurina-dorado.webp' },
      { nombre: 'Cuarzo rosa',      color: '#f2b6c4', imagen: 'corazon-cuarzo-rosa-oro-rosa.webp' },
      { nombre: 'Howlita blanca',   color: '#f1f0eb', imagen: 'corazon-howlita-oro-rosa.webp' }
    ]
  },
  {
    id: 'macrame', nombre: 'Macramé', dije: 'Dije yin yang',
    variantes: [
      { nombre: 'Negro',       color: '#161616', imagen: 'macrame-negro.webp' },
      { nombre: 'Rojo',        color: '#9c1c24', imagen: 'macrame-rojo.webp' },
      { nombre: 'Azul marino', color: '#1d2b4d', imagen: 'macrame-azul-marino.webp' },
      { nombre: 'Café',        color: '#5b3a22', imagen: 'macrame-cafe.webp' },
      { nombre: 'Beige',       color: '#d8c6a4', imagen: 'macrame-beige.webp' }
    ]
  }
];

// Lo que el usuario tiene elegido en este momento
let modeloElegido = MODELOS[0];
let colorElegido = modeloElegido.variantes[0];


// ---------- 2. VISOR 360° ----------
// Cada imagen tiene 36 fotos de la pulsera, acomodadas en una cuadrícula
// de 6 columnas y 6 filas. Mostrando una foto tras otra, la pulsera "gira".
const TOTAL_FOTOS = 36;
const COLUMNAS = 6;

let visor;              // el div donde se ve la pulsera
let fotoActual = 0;     // número de foto que se está mostrando (de 0 a 35)
let girando = true;     // si está girando sola
let arrastrando = false;
let inicioX = 0;        // dónde empezó el arrastre
let fotoInicio = 0;     // qué foto se veía al empezar a arrastrar

// Muestra la foto número "numero" moviendo la imagen de fondo.
// Con 6 columnas, las posiciones son 0%, 20%, 40%, 60%, 80% y 100%.
function mostrarFoto(numero) {
  const columna = numero % COLUMNAS;             // resto de la división: 0 a 5
  const fila = Math.floor(numero / COLUMNAS);    // división sin decimales: 0 a 5
  visor.style.backgroundPosition = (columna * 20) + '% ' + (fila * 20) + '%';
}

// Avanza una foto. Al llegar a la última, vuelve a la primera.
function siguienteFoto() {
  if (girando === false) {
    return;
  }
  fotoActual = fotoActual + 1;
  if (fotoActual === TOTAL_FOTOS) {
    fotoActual = 0;
  }
  mostrarFoto(fotoActual);
}

// Cambia la imagen del visor (cuando se elige otro modelo o color)
function cambiarImagen(imagen) {
  visor.style.backgroundImage = 'url("' + CARPETA + imagen + '")';
}

// Al presionar el mouse o el dedo sobre el visor, se detiene el giro
function empezarArrastre(evento) {
  arrastrando = true;
  girando = false;
  inicioX = evento.clientX;
  fotoInicio = fotoActual;
  visor.setPointerCapture(evento.pointerId);
}

// Mientras se arrastra: cada 10 píxeles de movimiento se avanza una foto
function arrastrar(evento) {
  if (arrastrando === false) {
    return;
  }
  const pasos = Math.round((inicioX - evento.clientX) / 10);
  let foto = (fotoInicio + pasos) % TOTAL_FOTOS;
  if (foto < 0) {
    foto = foto + TOTAL_FOTOS;   // si se arrastra hacia atrás, sigue desde la última foto
  }
  fotoActual = foto;
  mostrarFoto(fotoActual);
}

// Al soltar, espera 2 segundos y vuelve a girar sola
function soltar() {
  arrastrando = false;
  setTimeout(function () {
    if (arrastrando === false) {
      girando = true;
    }
  }, 2000);
}


// ---------- 3. PANEL DE MODELOS ----------
// Crea un botón por cada modelo, con la primera foto de su primer color
function pintarModelos() {
  const panel = document.getElementById('panel-modelos');
  panel.innerHTML = '';

  for (let i = 0; i < MODELOS.length; i++) {
    const modelo = MODELOS[i];
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'flex flex-col overflow-hidden rounded-xl border border-stone-300 bg-white text-left hover:border-stone-500 ' +
                      'aria-pressed:border-lime-500 aria-pressed:ring-2 aria-pressed:ring-lime-200';
    boton.setAttribute('aria-pressed', modelo === modeloElegido);
    boton.innerHTML =
      '<span class="block aspect-[16/10] w-full bg-stone-50 bg-no-repeat" ' +
            'style="background-image:url(\'' + CARPETA + modelo.variantes[0].imagen + '\'); background-size:600% 600%; background-position:0 0"></span>' +
      '<span class="px-3 py-2 text-sm">' +
        '<span class="block font-medium text-stone-900">' + modelo.nombre + '</span>' +
        '<span class="text-stone-500">' + modelo.dije + '</span>' +
      '</span>';

    boton.addEventListener('click', function () {
      elegirModelo(modelo);
    });
    panel.appendChild(boton);
  }
}


// ---------- 4. COLORES DEL MODELO ELEGIDO ----------
// Crea un círculo de color por cada variante del modelo elegido
function pintarColores() {
  const panel = document.getElementById('panel-colores');
  panel.innerHTML = '';

  for (let i = 0; i < modeloElegido.variantes.length; i++) {
    const variante = modeloElegido.variantes[i];
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.title = variante.nombre;
    boton.className = 'h-9 w-9 rounded-full ring-1 ring-black/15 ring-offset-2 aria-pressed:ring-2 aria-pressed:ring-stone-900';
    boton.style.background = variante.color;
    boton.setAttribute('aria-label', variante.nombre);
    boton.setAttribute('aria-pressed', variante === colorElegido);

    boton.addEventListener('click', function () {
      elegirColor(variante);
    });
    panel.appendChild(boton);
  }

  document.getElementById('color-nombre').textContent = colorElegido.nombre;
}


// ---------- 5. ELEGIR Y MOSTRAR ----------
// Al elegir un modelo, se muestra con su primer color
function elegirModelo(modelo) {
  modeloElegido = modelo;
  colorElegido = modelo.variantes[0];
  actualizar();
}

function elegirColor(variante) {
  colorElegido = variante;
  actualizar();
}

// Vuelve a dibujar los paneles, cambia la imagen y el total
function actualizar() {
  pintarModelos();
  pintarColores();
  cambiarImagen(colorElegido.imagen);
  // El precio lo calcula Persona 4 (calcularTotal y formatoColones están en pedidos.js)
  const precio = calcularTotal(modeloElegido.id);
  document.getElementById('customizer-total').textContent = formatoColones(precio);
}


// ---------- 6. PEDIDO POR WHATSAPP ----------
function pedir(evento) {
  evento.preventDefault();   // evita que el formulario recargue la página

  const form = document.getElementById('customizer-form');
  const error = document.getElementById('customizer-error');
  const nombre = form.elements.cliente.value.trim();

  if (nombre.length < 3) {
    error.textContent = 'Escribe tu nombre para identificar el pedido (mínimo 3 letras).';
    form.elements.cliente.focus();
    return;
  }
  error.textContent = '';

  // El mensaje y el envío por WhatsApp los hace Persona 4 (pedidos.js)
  const pedido = {
    id: modeloElegido.id,
    nombre: modeloElegido.nombre,
    color: colorElegido.nombre,
    dije: modeloElegido.dije
  };
  pedirPorWhatsApp(pedido, nombre);
}


// ---------- 7. INICIO ----------
function iniciarPersonalizador() {
  const form = document.getElementById('customizer-form');
  const contenedor = document.getElementById('viewer-3d');
  if (form === null || contenedor === null) {
    return;
  }

  // Se reemplaza el recuadro vacío del HTML por el visor
  contenedor.className = 'grid aspect-square place-items-center rounded-3xl border border-stone-200 bg-stone-50 p-4';
  contenedor.innerHTML =
    '<div class="w-full">' +
      '<div class="visor aspect-[16/10] w-full cursor-grab touch-pan-y select-none bg-no-repeat" ' +
           'role="img" aria-label="Vista 360° de tu pulsera"></div>' +
      '<p class="mt-4 text-center text-sm text-stone-400">Arrastra para girar</p>' +
    '</div>';

  visor = contenedor.querySelector('.visor');
  visor.style.backgroundSize = '600% 600%';   // la imagen es 6 veces más grande: se ve una sola foto

  // Arrastrar con mouse o dedo
  visor.addEventListener('pointerdown', empezarArrastre);
  visor.addEventListener('pointermove', arrastrar);
  visor.addEventListener('pointerup', soltar);
  visor.addEventListener('pointercancel', soltar);   // en celular, si el usuario hace scroll

  form.addEventListener('submit', pedir);

  actualizar();
  mostrarFoto(0);
  setInterval(siguienteFoto, 250);   // una foto cada 0.25 s: 36 fotos = una vuelta en 9 s
}

iniciarPersonalizador();
