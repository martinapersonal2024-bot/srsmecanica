
/*
   SRS MECÁNICA
   Cada bloque se puede copiar a otro proyecto por separado,
   siempre que el HTML tenga los mismos id.
*/


/* NIVEL 1: INTERACCIONES BÁSICAS (DOM y eventos) */


/* MENÚ */
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
  const abierto = menu.classList.toggle("abierto");
  btnMenu.setAttribute("aria-expanded", abierto);
  btnMenu.textContent = abierto ? "✕" : "☰";
});

menu.querySelectorAll("a").forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    menu.classList.remove("abierto");
    btnMenu.setAttribute("aria-expanded", false);
    btnMenu.textContent = "☰";
  });
});


/* MODO CLARO / OSCURO */
const btnTema = document.getElementById("btn-tema");

function aplicarTema(oscuro) {
  document.body.classList.toggle("oscuro", oscuro);
  btnTema.textContent = oscuro ? "☀️" : "🌙";
}

aplicarTema(localStorage.getItem("tema") === "oscuro");

btnTema.addEventListener("click", function () {
  const ahoraOscuro = !document.body.classList.contains("oscuro");
  aplicarTema(ahoraOscuro);
  localStorage.setItem("tema", ahoraOscuro ? "oscuro" : "claro");
});


/* BOTÓN VOLVER ARRIBA */
const btnArriba = document.getElementById("btn-arriba");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    btnArriba.classList.remove("oculto");
  } else {
    btnArriba.classList.add("oculto");
  }
});

btnArriba.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* SALUDO SEGÚN LA HORA Y AÑO AUTOMÁTICO */
function obtenerSaludo() {
  const hora = new Date().getHours();

  if (hora < 6) {
    return "¡Buenas noches! 🌙";
  } else if (hora < 12) {
    return "¡Buen día! ☀️";
  } else if (hora < 20) {
    return "¡Buenas tardes! 🌤️";
  } else {
    return "¡Buenas noches! 🌙";
  }
}

document.getElementById("saludo").textContent =
  obtenerSaludo() + " Bienvenido a SRS Mecánica";

document.getElementById("anio").textContent = new Date().getFullYear();


/* GALERÍA CON IMAGEN AMPLIADA */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".miniatura").forEach(function (miniatura) {
  miniatura.addEventListener("click", function () {
    lightboxImg.src = miniatura.src;
    lightboxImg.alt = miniatura.alt;
    lightbox.classList.remove("oculto");
  });
});

lightbox.addEventListener("click", function () {
  lightbox.classList.add("oculto");
});

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    lightbox.classList.add("oculto");
  }
});


/* NIVEL 2: ARRAYS, OBJETOS Y BUCLES */


/* CATÁLOGO DE SERVICIOS */
const productos = [
  {
    id: 1,
    nombre: "Mecánica de motos",
    categoria: "motos",
    emoji: "01",
    descripcion: "Service y reparación de motos de mediana y alta cilindrada, de calle y competición."
  },
  {
    id: 2,
    nombre: "Autos de competición",
    categoria: "competicion",
    emoji: "02",
    descripcion: "Suspensiones, puesta a punto y acompañamiento técnico en pista."
  },
  {
    id: 3,
    nombre: "Suspensiones y amortiguadores",
    categoria: "motos",
    emoji: "03",
    descripcion: "Reparación, mantenimiento y fabricación de componentes para distintos vehículos."
  },
  {
    id: 4,
    nombre: "Adquisición de datos",
    categoria: "competicion",
    emoji: "04",
    descripcion: "Información del vehículo y del piloto para analizar y mejorar el rendimiento."
  },
  {
    id: 5,
    nombre: "Fabricación",
    categoria: "industria",
    emoji: "05",
    descripcion: "Amortiguadores, partes, repuestos y herramientas específicas para suspensiones."
  },
  {
    id: 6,
    nombre: "Mecanizados CNC",
    categoria: "industria",
    emoji: "06",
    descripcion: "Trabajos con torno y fresadora a control numérico. Mecanizados en serie para empresas."
  },
  {
    id: 7,
    nombre: "Asesoramiento y capacitaciones",
    categoria: "motos",
    emoji: "07",
    descripcion: "Asesoramiento técnico y capacitación en mantenimiento de suspensiones de bicicletas."
  },
  {
    id: 8,
    nombre: "Equipamiento para empresas",
    categoria: "industria",
    emoji: "08",
    descripcion: "Fabricación y asesoramiento técnico. Experiencia en equipamiento para operaciones de la vista."
  }
];


/* CATÁLOGO DE ACCESORIOS Y REPUESTOS */
const productosAccesorios = [
  {
    id: 1,
    nombre: "Puños para moto",
    categoria: "accesorios",
    descripcion: "Puños de goma antideslizantes para mayor comodidad.",
    precio: 12000
  },
  {
    id: 2,
    nombre: "Casco",
    categoria: "proteccion",
    descripcion: "Casco para motocicletas.",
    precio: 30000
  },
  {
    id: 3,
    nombre: "Disco embrague",
    categoria: "accesorios",
    descripcion: "Disco de embrague para motos.",
    precio: 15000
  },
  {
    id: 4,
    nombre: "Pastilla de freno",
    categoria: "accesorios",
    descripcion: "Pastillas de freno para motos.",
    precio: 15000
  },
  {
    id: 5,
    nombre: "Amortiguador",
    categoria: "accesorios",
    descripcion: "Amortiguador para motos.",
    precio: 50000
  },
  {
    id: 6,
    nombre: "Guantes moto",
    categoria: "proteccion",
    descripcion: "Guantes para motociclistas.",
    precio: 22000
  },
  {
    id: 7,
    nombre: "Retenes",
    categoria: "accesorios",
    descripcion: "Retenes para motos.",
    precio: 14000
  },
  {
    id: 8,
    nombre: "Protector de tanque",
    categoria: "proteccion",
    descripcion: "Protector para evitar rayones en el tanque.",
    precio: 11000
  },
  {
    id: 9,
    nombre: "Bujia",
    categoria: "accesorios",
    descripcion: "Bujia para motos.",
    precio: 14000
  },
  {
    id: 10,
    nombre: "Nada",
    categoria: "accesorios",
    descripcion: "Ningun producto detectado.",
    precio: 0
  }
];


/* MOSTRAR SERVICIOS */
const listaProductos = document.getElementById("lista-productos");
const sinResultados = document.getElementById("sin-resultados");

function mostrarProductos(lista) {
  listaProductos.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    const p = lista[i];

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    tarjeta.innerHTML =
      '<div class="emoji">' + p.emoji + "</div>" +
      "<h3>" + p.nombre + "</h3>" +
      '<p class="descripcion">' + p.descripcion + "</p>" +
      '<p class="precio">Consultar presupuesto</p>' +
      '<a class="btn" href="#contacto">Consultar</a>';

    listaProductos.appendChild(tarjeta);
  }

  sinResultados.classList.toggle("oculto", lista.length > 0);
}


/* FILTROS Y BUSCADOR DE SERVICIOS */
let categoriaActual = "todos";
let textoBusqueda = "";

function aplicarFiltros() {
  const filtrados = productos.filter(function (p) {
    const coincideCategoria =
      categoriaActual === "todos" || p.categoria === categoriaActual;

    const coincideTexto =
      p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());

    return coincideCategoria && coincideTexto;
  });

  mostrarProductos(filtrados);
}

// IMPORTANTE: solamente seleccionamos los filtros de servicios.
const botonesFiltro = document.querySelectorAll("#filtros .filtro");

botonesFiltro.forEach(function (boton) {
  boton.addEventListener("click", function () {
    categoriaActual = boton.dataset.categoria;

    botonesFiltro.forEach(function (b) {
      b.classList.remove("activo");
    });

    boton.classList.add("activo");
    aplicarFiltros();
  });
});

document.getElementById("buscador").addEventListener("input", function (evento) {
  textoBusqueda = evento.target.value;
  aplicarFiltros();
});

aplicarFiltros();


/* PREGUNTAS FRECUENTES */
document.querySelectorAll(".faq-pregunta").forEach(function (boton) {
  boton.addEventListener("click", function () {
    const item = boton.parentElement;
    const abierto = item.classList.toggle("abierto");

    boton.querySelector("span").textContent = abierto ? "−" : "+";
  });
});


/* NIVEL 3: FUNCIONES Y LÓGICA */


/* FORMULARIO DE CONTACTO */
const formContacto = document.getElementById("form-contacto");
const campoNombre = document.getElementById("nombre");
const campoEmail = document.getElementById("email");
const campoMensaje = document.getElementById("mensaje");
const mensajeExito = document.getElementById("form-exito");

function validarNombre(valor) {
  if (valor.trim() === "") return "Escribí tu nombre.";
  if (valor.trim().length < 3) return "El nombre es muy corto.";
  return "";
}

function validarEmail(valor) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (valor.trim() === "") return "Escribí tu email.";
  if (!patron.test(valor)) return "El email no es válido.";

  return "";
}

function validarMensaje(valor) {
  if (valor.trim() === "") return "Escribí tu mensaje.";
  if (valor.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";

  return "";
}

function mostrarError(campo, idError, texto) {
  document.getElementById(idError).textContent = texto;
  campo.classList.toggle("invalido", texto !== "");
}

formContacto.addEventListener("submit", function (evento) {
  evento.preventDefault();
  mensajeExito.classList.add("oculto");

  const errorNombre = validarNombre(campoNombre.value);
  const errorEmail = validarEmail(campoEmail.value);
  const errorMensaje = validarMensaje(campoMensaje.value);

  mostrarError(campoNombre, "error-nombre", errorNombre);
  mostrarError(campoEmail, "error-email", errorEmail);
  mostrarError(campoMensaje, "error-mensaje", errorMensaje);

  if (errorNombre === "" && errorEmail === "" && errorMensaje === "") {
    mensajeExito.classList.remove("oculto");
    formContacto.reset();
  }
});


/* CUENTA REGRESIVA PARA EL 50 ANIVERSARIO */
const fechaPromo = new Date("2027-01-01T00:00:00");
const cuentaRegresiva = document.getElementById("cuenta-regresiva");

function actualizarCuentaRegresiva() {
  const ahora = new Date();
  const diferencia = fechaPromo - ahora;

  if (diferencia <= 0) {
    cuentaRegresiva.textContent =
      "¡Llegó nuestro año aniversario! 50 años de SRS Mecánica.";

    clearInterval(temporizadorCuenta);
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  cuentaRegresiva.textContent =
    dias + " días · " + horas + " h · " +
    minutos + " min · " + segundos + " s";
}

const temporizadorCuenta = setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();


/* CATÁLOGO DE PRODUCTOS Y ACCESORIOS */
const listaAccesorios = document.getElementById("lista-accesorios");
const sinAccesorios = document.getElementById("sin-accesorios");
const buscadorAccesorios = document.getElementById("buscador-accesorios");

let categoriaAccesorioActual = "todos";
let textoAccesorio = "";

function mostrarAccesorios(lista) {
  listaAccesorios.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    const p = lista[i];

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    tarjeta.innerHTML =
      "<h3>" + p.nombre + "</h3>" +
      '<p class="descripcion">' + p.descripcion + "</p>" +
      '<p class="precio">' + formatearPrecio(p.precio) + "</p>";

    listaAccesorios.appendChild(tarjeta);
  }

  sinAccesorios.classList.toggle("oculto", lista.length > 0);
}

function aplicarFiltrosAccesorios() {
  const filtrados = productosAccesorios.filter(function (p) {

    // "Nada" se usa en la IA, pero no aparece en el catálogo.
    if (p.nombre === "Nada") return false;

    const coincideCategoria =
      categoriaAccesorioActual === "todos" ||
      p.categoria === categoriaAccesorioActual;

    const coincideTexto =
      p.nombre.toLowerCase().includes(textoAccesorio.toLowerCase());

    return coincideCategoria && coincideTexto;
  });

  mostrarAccesorios(filtrados);
}


// Filtros de accesorios
document.querySelectorAll("#filtros-accesorios .filtro").forEach(function (boton) {
  boton.addEventListener("click", function () {
    categoriaAccesorioActual = boton.dataset.categoriaAccesorio;

    document.querySelectorAll("#filtros-accesorios .filtro").forEach(function (b) {
      b.classList.remove("activo");
    });

    boton.classList.add("activo");
    aplicarFiltrosAccesorios();
  });
});


// Buscador de accesorios
buscadorAccesorios.addEventListener("input", function (evento) {
  textoAccesorio = evento.target.value;
  aplicarFiltrosAccesorios();
});

aplicarFiltrosAccesorios();


/* FUNCIONES PARA EL RECONOCEDOR DE INTELIGENCIA ARTIFICIAL */

// Busca un producto por su ID.
function buscarProducto(id) {
  return productosAccesorios.find(function (producto) {
    return producto.id === id;
  });
}

// Formatea el precio en pesos argentinos.
function formatearPrecio(precio) {
  return precio.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  });
}

// Acción temporal para el botón del reconocedor.
// Todavía no hay un carrito real implementado.
function agregarAlCarrito(id) {
  const producto = buscarProducto(id);

  if (producto && producto.nombre !== "Nada") {
    alert("Seleccionaste: " + producto.nombre);
  }
}
