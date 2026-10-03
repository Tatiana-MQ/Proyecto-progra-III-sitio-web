// personalizador.js: elegir modelo y color, ver la pulsera girar y pedirla

// Persona 3: personalizador semi-3D

// cada color tiene su imagen en assets/images/360/
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

// lo que está elegido (al inicio el primero de cada uno)
let modeloElegido = MODELOS[0];
let colorElegido = MODELOS[0].variantes[0];


// elementos del html
const visor = document.querySelector('#visor');
const panelModelos = document.querySelector('#panel-modelos');
const panelColores = document.querySelector('#panel-colores');
const textoColor = document.querySelector('#color-nombre');
const textoTotal = document.querySelector('#customizer-total');
const formularioPersonalizar = document.querySelector('#customizer-form');
const inputCliente = document.querySelector('#customizer-cliente');
const mensajeError = document.querySelector('#customizer-error');
const botonAgregar = document.querySelector('#customizer-agregar');


// girar la pulsera
// cada imagen trae 36 fotos en una tabla de 6 x 6
// el visor solo enseña una y al cambiar rápido parece que gira
let columna = 0;   // columna actual (0 a 5)
let fila = 0;      // fila actual (0 a 5)

// mueve la imagen a la foto actual (de 20% en 20%)
function mostrarFoto() {
  visor.style.backgroundPosition = `${columna * 20}% ${fila * 20}%`;
}

// siguiente foto, al final vuelve a empezar
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

// lo mismo pero hacia atrás
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

// arrastrar con el mouse o el dedo
let arrastrando = false;   // true mientras se arrastra
let ultimoX = 0;           // última posición horizontal

// al presionar
visor.addEventListener('pointerdown', function (event) {
  arrastrando = true;
  ultimoX = event.clientX;
  visor.setPointerCapture(event.pointerId);   // así sigue aunque el mouse se salga del visor
});

// al mover, cada 10 px cambia de foto
visor.addEventListener('pointermove', function (event) {
  if (arrastrando === false) {
    return;
  }
  const diferencia = event.clientX - ultimoX;

  if (diferencia >= 10) {          // hacia la derecha
    fotoAnterior();
    ultimoX = event.clientX;
  }
  if (diferencia <= -10) {         // hacia la izquierda
    siguienteFoto();
    ultimoX = event.clientX;
  }
});

// al soltar o si se cancela
visor.addEventListener('pointerup', function () {
  arrastrando = false;
});
visor.addEventListener('pointercancel', function () {
  arrastrando = false;
});

// giro automático, una foto cada 250 ms (menos si se está arrastrando)
setInterval(function () {
  if (arrastrando === false) {
    siguienteFoto();
  }
}, 250);


// una tarjeta por modelo, la elegida tiene borde verde
function mostrarModelos() {

  panelModelos.innerHTML = '';

  MODELOS.forEach(function (modelo) {

    const boton = document.createElement('button');
    boton.type = 'button';

    if (modelo === modeloElegido) {
      boton.className = 'flex flex-col overflow-hidden rounded-xl border-2 border-lime-500 bg-white text-left';
    } else {
      boton.className = 'flex flex-col overflow-hidden rounded-xl border-2 border-stone-200 bg-white text-left hover:border-stone-400';
    }

    // miniatura: la primera foto de la tabla
    boton.innerHTML = `
      <span class="miniatura block aspect-[16/10] w-full bg-stone-50 bg-no-repeat bg-[length:600%_600%]"></span>
      <span class="px-3 py-2 text-sm">
        <span class="block font-medium text-stone-900">${modelo.nombre}</span>
        <span class="text-stone-500">${modelo.dije}</span>
      </span>
    `;

    boton.querySelector('.miniatura').style.backgroundImage = `url('${CARPETA + modelo.variantes[0].imagen}')`;

    boton.addEventListener('click', function () {
      elegirModelo(modelo);
    });

    panelModelos.appendChild(boton);
  });
}


// un círculo por cada color del modelo, el elegido lleva anillo oscuro
function mostrarColores() {

  panelColores.innerHTML = '';

  modeloElegido.variantes.forEach(function (variante) {

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.title = variante.nombre;               // sale al pasar el mouse
    boton.style.backgroundColor = variante.color;

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


// al elegir un modelo arranca con su primer color
function elegirModelo(modelo) {
  modeloElegido = modelo;
  colorElegido = modelo.variantes[0];
  actualizar();
}

function elegirColor(variante) {
  colorElegido = variante;
  actualizar();
}

// vuelve a dibujar todo
function actualizar() {
  mostrarModelos();
  mostrarColores();

  visor.style.backgroundImage = `url('${CARPETA + colorElegido.imagen}')`;

  textoTotal.textContent = formatoColones(calcularTotal(modeloElegido.id));
}


// pedir ahora: revisa el nombre y manda el pedido (pedirPorWhatsApp está en pedidos.js)
formularioPersonalizar.addEventListener('submit', function (event) {

  event.preventDefault();   // para que no recargue la página

  const nombre = inputCliente.value.trim();

  if (nombre.length < 3) {
    mensajeError.textContent = 'Escribe tu nombre para identificar el pedido (mínimo 3 letras).';
    inputCliente.focus();
    return;
  }
  mensajeError.textContent = '';

  const pedido = {
    id: modeloElegido.id,
    nombre: modeloElegido.nombre,
    color: colorElegido.nombre,
    dije: modeloElegido.dije
  };
  pedirPorWhatsApp(pedido, nombre);
});


// agregar al carrito (agregarAlCarrito está en carrito.js)
botonAgregar.addEventListener('click', function () {

  agregarAlCarrito({
    clave: modeloElegido.id + '-' + colorElegido.nombre,   // modelo + color
    nombre: modeloElegido.nombre,
    color: colorElegido.nombre,
    dije: modeloElegido.dije,
    precio: calcularTotal(modeloElegido.id)
  });

  // cambia el texto del botón por un momento
  botonAgregar.textContent = '¡Agregada!';
  setTimeout(function () {
    botonAgregar.textContent = 'Agregar al carrito';
  }, 1500);
});


// al cargar la página
actualizar();
mostrarFoto();
