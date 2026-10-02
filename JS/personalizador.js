/* personalizador.js | Personaliza tu pulsera: elegir modelo y color, verla girar y pedirla. */

// ================= PERSONA 3: personalizador semi-3D =================


// =============================================================
// 1. DATOS: los 3 modelos y sus colores
// =============================================================
// Cada color tiene su imagen. Las imágenes están en assets/images/360/
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

// Lo que el usuario tiene elegido en este momento (al inicio: el primero de cada lista)
let modeloElegido = MODELOS[0];
let colorElegido = MODELOS[0].variantes[0];


// =============================================================
// 2. ELEMENTOS DEL HTML
// =============================================================
const visor = document.querySelector('#visor');
const panelModelos = document.querySelector('#panel-modelos');
const panelColores = document.querySelector('#panel-colores');
const textoColor = document.querySelector('#color-nombre');
const textoTotal = document.querySelector('#customizer-total');
const formularioPersonalizar = document.querySelector('#customizer-form');
const inputCliente = document.querySelector('#customizer-cliente');
const mensajeError = document.querySelector('#customizer-error');
const botonAgregar = document.querySelector('#customizer-agregar');


// =============================================================
// 3. HACER GIRAR LA PULSERA
// =============================================================
/*
Cada imagen tiene 36 fotos de la pulsera, acomodadas como una tabla
de 6 columnas y 6 filas:

  fila 0:  foto foto foto foto foto foto
  fila 1:  foto foto foto foto foto foto
  ...
  fila 5:  foto foto foto foto foto foto

En el HTML, la imagen se agranda 6 veces (background-size: 600%),
así en el visor solo cabe UNA foto. Moviendo la imagen de foto en foto
muy rápido, la pulsera parece girar (como un folioscopio).
*/
let columna = 0;   // columna de la foto que se ve (de 0 a 5)
let fila = 0;      // fila de la foto que se ve (de 0 a 5)

// Mueve la imagen para mostrar la foto de la columna y fila actuales.
// Con 6 columnas, las posiciones van de 20% en 20%: 0%, 20%, 40%, 60%, 80%, 100%
function mostrarFoto() {
  visor.style.backgroundPosition = `${columna * 20}% ${fila * 20}%`;
}

// Pasa a la siguiente foto, como un reloj:
// al terminar una fila, baja a la siguiente; al terminar la última, vuelve al inicio.
function siguienteFoto() {
  columna = columna + 1;
  if (columna === 6) {
    columna = 0;
    fila = fila + 1;
  }
  if (fila === 6) {
    fila = 0;
  }
  mostrarFoto();
}

// Igual que siguienteFoto(), pero hacia atrás
function fotoAnterior() {
  columna = columna - 1;
  if (columna === -1) {
    columna = 5;
    fila = fila - 1;
  }
  if (fila === -1) {
    fila = 5;
  }
  mostrarFoto();
}

// ----- Arrastrar con el mouse o el dedo -----
let arrastrando = false;   // true mientras el usuario tiene presionado el visor
let ultimoX = 0;           // posición horizontal del mouse en el último movimiento

// Al presionar: empieza el arrastre y se guarda dónde está el mouse
visor.addEventListener('pointerdown', function (event) {
  arrastrando = true;
  ultimoX = event.clientX;
  visor.setPointerCapture(event.pointerId);   // sigue el arrastre aunque el mouse salga del visor
});

// Al mover: cada 10 píxeles se cambia de foto
visor.addEventListener('pointermove', function (event) {
  if (arrastrando === false) {
    return;
  }
  const diferencia = event.clientX - ultimoX;

  if (diferencia >= 10) {          // se movió 10 px a la derecha
    fotoAnterior();
    ultimoX = event.clientX;
  }
  if (diferencia <= -10) {         // se movió 10 px a la izquierda
    siguienteFoto();
    ultimoX = event.clientX;
  }
});

// Al soltar (o si el celular interrumpe el toque para hacer scroll): termina el arrastre
visor.addEventListener('pointerup', function () {
  arrastrando = false;
});
visor.addEventListener('pointercancel', function () {
  arrastrando = false;
});

// Giro automático: cada 250 milisegundos avanza una foto, menos mientras se arrastra.
// 36 fotos x 0.25 segundos = una vuelta cada 9 segundos.
setInterval(function () {
  if (arrastrando === false) {
    siguienteFoto();
  }
}, 250);


// =============================================================
// 4. MOSTRAR LOS MODELOS (tarjetas para elegir)
// =============================================================
function mostrarModelos() {

  // Limpiamos lo que había, para no repetir tarjetas
  panelModelos.innerHTML = '';

  MODELOS.forEach(function (modelo) {

    const boton = document.createElement('button');
    boton.type = 'button';

    // El modelo elegido se marca con borde verde
    if (modelo === modeloElegido) {
      boton.className = 'flex flex-col overflow-hidden rounded-xl border-2 border-lime-500 bg-white text-left';
    } else {
      boton.className = 'flex flex-col overflow-hidden rounded-xl border-2 border-stone-200 bg-white text-left hover:border-stone-400';
    }

    // La foto es la primera de la tabla de 36 (esquina de arriba a la izquierda)
    boton.innerHTML = `
      <span class="miniatura block aspect-[16/10] w-full bg-stone-50 bg-no-repeat bg-[length:600%_600%]"></span>
      <span class="px-3 py-2 text-sm">
        <span class="block font-medium text-stone-900">${modelo.nombre}</span>
        <span class="text-stone-500">${modelo.dije}</span>
      </span>
    `;

    // Ponemos la foto de la miniatura desde JS (cambia según el modelo)
    boton.querySelector('.miniatura').style.backgroundImage = `url('${CARPETA + modelo.variantes[0].imagen}')`;

    boton.addEventListener('click', function () {
      elegirModelo(modelo);
    });

    panelModelos.appendChild(boton);
  });
}


// =============================================================
// 5. MOSTRAR LOS COLORES DEL MODELO ELEGIDO
// =============================================================
function mostrarColores() {

  panelColores.innerHTML = '';

  modeloElegido.variantes.forEach(function (variante) {

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.title = variante.nombre;               // nombre que aparece al pasar el mouse
    boton.style.backgroundColor = variante.color;

    // El color elegido se marca con un anillo oscuro
    if (variante === colorElegido) {
      boton.className = 'h-9 w-9 rounded-full ring-2 ring-stone-900 ring-offset-2';
    } else {
      boton.className = 'h-9 w-9 rounded-full ring-1 ring-black/15 ring-offset-2';
    }

    boton.addEventListener('click', function () {
      elegirColor(variante);
    });

    panelColores.appendChild(boton);
  });

  textoColor.textContent = colorElegido.nombre;
}


// =============================================================
// 6. ELEGIR Y ACTUALIZAR
// =============================================================
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

// Vuelve a dibujar todo según lo elegido: tarjetas, colores, imagen y total
function actualizar() {
  mostrarModelos();
  mostrarColores();

  // Cambiamos la imagen del visor por la del color elegido
  visor.style.backgroundImage = `url('${CARPETA + colorElegido.imagen}')`;

  // Actualizamos el precio del modelo 3D (calcularTotal y formatoColones están en pedidos.js)
  textoTotal.textContent = formatoColones(calcularTotal(modeloElegido.id));
}


// =============================================================
// 7. PEDIR AHORA (por WhatsApp)
// =============================================================
formularioPersonalizar.addEventListener('submit', function (event) {

  // Evitamos que el formulario recargue la página
  event.preventDefault();

  const nombre = inputCliente.value.trim();

  // Validación: el nombre debe tener al menos 3 letras
  if (nombre.length < 3) {
    mensajeError.textContent = 'Escribe tu nombre para identificar el pedido (mínimo 3 letras).';
    inputCliente.focus();
    return;
  }
  mensajeError.textContent = '';

  // El mensaje y el envío por WhatsApp los hace Persona 4 (pedidos.js)
  const pedido = {
    id: modeloElegido.id,
    nombre: modeloElegido.nombre,
    color: colorElegido.nombre,
    dije: modeloElegido.dije
  };
  pedirPorWhatsApp(pedido, nombre);
});


// =============================================================
// 8. AGREGAR AL CARRITO
// =============================================================
botonAgregar.addEventListener('click', function () {

  // agregarAlCarrito está en carrito.js
  agregarAlCarrito({
    clave: modeloElegido.id + '-' + colorElegido.nombre,   // identifica la combinación
    nombre: modeloElegido.nombre,
    color: colorElegido.nombre,
    dije: modeloElegido.dije,
    precio: calcularTotal(modeloElegido.id)
  });

  // Aviso en el mismo botón durante 1.5 segundos
  botonAgregar.textContent = '¡Agregada! ✓';
  setTimeout(function () {
    botonAgregar.textContent = 'Agregar al carrito';
  }, 1500);
});


// =============================================================
// 9. PRIMER DIBUJO
// =============================================================
// Al cargar la página se muestran los modelos, los colores y la primera pulsera
actualizar();
mostrarFoto();
