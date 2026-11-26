
/*
   NIVEL 5: INTELIGENCIA ARTIFICIAL (Teachable Machine)
   Reconocedor de productos de SRS Mecánica.
*/


/* PASO 1: enlace del modelo */
const URL_MODELO = "https://teachablemachine.withgoogle.com/models/vGCDMP9w0/";


/* PASO 2: clases del modelo y sus productos */
const clasesIA = {
  "Puños para moto": 1,
  "Casco": 2,
  "Disco embrague": 3,
  "Pastillas de freno": 4,
  "Amortiguador": 5,
  "Guantes para moto": 6,
  "Retenes": 7,
  "Protector de tanque": 8,
  "Bujia": 9,
  "Nada": null
};


/* PASO 3: confianza mínima */
const CONFIANZA_MINIMA = 0.8;


/* PASO 4: reseñas de ejemplo */
const RESENAS_DE_EJEMPLO = true;

const resenas = {
  1: [
    { autor: "Serena M.", estrellas: 5, texto: "Muy cómodos y antideslizantes. Se nota la diferencia al manejar." },
    { autor: "Matías F.", estrellas: 5, texto: "Excelente calidad y muy fáciles de colocar." },
    { autor: "Emma B.", estrellas: 4, texto: "Muy buen producto, cumplen perfectamente su función." }
  ],

  2: [
    { autor: "Ricardo S.", estrellas: 5, texto: "Muy buena calidad y excelente terminación. Lo recomiendo." },
    { autor: "Tomás B.", estrellas: 5, texto: "Cómodo y práctico para usar todos los días." },
    { autor: "Federico B.", estrellas: 4, texto: "Buen producto y buena relación calidad-precio." }
  ],

  3: [
    { autor: "Martina S.", estrellas: 5, texto: "Excelente funcionamiento. La moto responde muy bien." },
    { autor: "Bruno T.", estrellas: 5, texto: "Muy buena calidad, llegó todo en perfectas condiciones." }
  ],

  4: [
    { autor: "Juan B.", estrellas: 5, texto: "Muy buen rendimiento y excelente calidad." },
    { autor: "Iván S.", estrellas: 5, texto: "Funcionan perfectamente. Muy conforme con la compra." },
    { autor: "Juani A.", estrellas: 4, texto: "Buen producto y buena atención." }
  ],

  5: [
    { autor: "Marcos G.", estrellas: 5, texto: "Excelente calidad. Mejoró mucho el andar de la moto." },
    { autor: "Pablo M.", estrellas: 5, texto: "Muy conforme con el producto y su funcionamiento." }
  ],

  6: [
    { autor: "Emiliano G.", estrellas: 5, texto: "Muy cómodos y con buen agarre. Ideales para manejar." },
    { autor: "Fernando S.", estrellas: 5, texto: "Excelente calidad y muy buen ajuste." }
  ],

  7: [
    { autor: "Diego L.", estrellas: 5, texto: "Muy buena calidad y excelente ajuste." },
    { autor: "Alejandro T.", estrellas: 4, texto: "Cumplen perfectamente su función. Buena compra." }
  ],

  8: [
    { autor: "Lucas B.", estrellas: 5, texto: "Queda muy bien colocado y protege el tanque de rayones." },
    { autor: "Franco V.", estrellas: 5, texto: "Muy buen producto, práctico y fácil de instalar." }
  ],

  9: [
    { autor: "Santiago L.", estrellas: 5, texto: "Excelente funcionamiento y muy buena calidad." },
    { autor: "Sergio Z.", estrellas: 5, texto: "Todo perfecto. La moto funciona muy bien." },
    { autor: "Mariano B.", estrellas: 4, texto: "Buen producto y llegó en buen estado." }
  ]
};


/* ============ DE ACÁ PARA ABAJO NO HACE FALTA TOCAR ============ */

const iaEstado = document.getElementById("ia-estado");
const iaVisor = document.getElementById("ia-visor");
const iaBarras = document.getElementById("ia-barras");
const iaResultado = document.getElementById("ia-resultado");
const iaArchivo = document.getElementById("ia-archivo");
const btnCamara = document.getElementById("btn-camara");
const btnFoto = document.getElementById("btn-foto");
const iaDemo = document.getElementById("ia-demo");

const modoDemo = URL_MODELO.trim() === "";
let modelo = null;
let webcam = null;
let camaraEncendida = false;
let ultimaClaseMostrada = "";


/* Cargar el modelo */
async function cargarModelo() {
  if (modelo) return modelo;

  if (typeof tmImage === "undefined") {
    throw new Error("No se pudo cargar la librería de Teachable Machine. Revisá tu conexión a internet.");
  }

  let url = URL_MODELO.trim();
  if (!url.endsWith("/")) url += "/";

  iaEstado.textContent = "Cargando el modelo… ⏳";

  modelo = await tmImage.load(
    url + "model.json",
    url + "metadata.json"
  );

  iaEstado.textContent = "Modelo listo ✅";
  return modelo;
}


/* Mostrar porcentajes de cada clase */
function mostrarBarras(predicciones) {
  for (const p of predicciones) {
    let fila = iaBarras.querySelector(
      '[data-clase="' + p.className + '"]'
    );

    if (!fila) {
      fila = document.createElement("div");
      fila.className = "ia-fila";
      fila.dataset.clase = p.className;

      fila.innerHTML =
        '<span class="ia-nombre">' + p.className + "</span>" +
        '<span class="ia-pista"><span class="ia-relleno"></span></span>' +
        '<span class="ia-porcentaje">0%</span>';

      iaBarras.appendChild(fila);
    }

    const porcentaje = Math.round(p.probability * 100);

    fila.querySelector(".ia-relleno").style.width =
      porcentaje + "%";

    fila.querySelector(".ia-porcentaje").textContent =
      porcentaje + "%";
  }
}


/* Mostrar el producto detectado */
function mostrarResultado(predicciones) {
  const mejor = predicciones.reduce(function (a, b) {
    return a.probability > b.probability ? a : b;
  });

  iaBarras.querySelectorAll(".ia-fila").forEach(function (fila) {
    fila.classList.toggle(
      "ganadora",
      fila.dataset.clase === mejor.className
    );
  });

  let clave;
  const id = clasesIA[mejor.className];

  if (mejor.probability < CONFIANZA_MINIMA) {
    clave = "duda";
  } else if (id === null || id === undefined) {
    clave = "nada:" + mejor.className;
  } else {
    clave = "producto:" + id;
  }

  if (clave === ultimaClaseMostrada) return;
  ultimaClaseMostrada = clave;

  if (clave === "duda") {
    iaResultado.innerHTML =
      '<p class="ia-aviso">🤔 No estoy seguro. Acercá el producto o probá con más luz.</p>';

  } else if (clave.startsWith("nada")) {
    iaResultado.innerHTML =
      '<p class="ia-aviso">👀 No veo ningún producto. Mostrame uno.</p>';

  } else {
    const producto = buscarProducto(id);

    if (!producto) {
      iaResultado.innerHTML =
        '<p class="ia-aviso">⚠️ La clase "' +
        mejor.className +
        '" apunta al id ' +
        id +
        ", pero ese producto no existe en el catálogo.</p>";
      return;
    }

    const emojiProducto = producto.emoji || "🔧";

    iaResultado.innerHTML =
      '<div class="ia-tarjeta">' +
        '<div class="emoji">' + emojiProducto + "</div>" +
        "<div>" +
          '<p class="ia-etiqueta">Detectamos</p>' +
          "<h3>" + producto.nombre + "</h3>" +
          '<p class="descripcion">' + producto.descripcion + "</p>" +
          '<p class="precio">' + formatearPrecio(producto.precio) + "</p>" +
          '<button class="btn" data-ia-id="' + producto.id + '">Agregar al pedido</button>' +
        "</div>" +
      "</div>" +
      armarResenas(producto.id);
  }
}


/* Dibujar estrellas */
function dibujarEstrellas(cantidad) {
  const llenas = Math.round(cantidad);
  return "★".repeat(llenas) + "☆".repeat(5 - llenas);
}


/* Mostrar reseñas */
function armarResenas(id) {
  const lista = resenas[id];

  if (!lista || lista.length === 0) {
    return '<p class="ia-aviso">Este producto todavía no tiene reseñas.</p>';
  }

  let suma = 0;

  for (const r of lista) {
    suma += r.estrellas;
  }

  const promedio = suma / lista.length;

  let html =
    '<div class="ia-resenas">' +
      '<div class="ia-resenas-cabecera">' +
        '<span class="estrellas" aria-label="' + promedio.toFixed(1) + ' de 5 estrellas">' +
          dibujarEstrellas(promedio) +
        "</span>" +
        "<strong>" + promedio.toFixed(1).replace(".", ",") + "</strong>" +
        "<span>(" + lista.length + " opiniones)</span>" +
        (RESENAS_DE_EJEMPLO
          ? '<span class="ia-ejemplo">Reseñas de ejemplo</span>'
          : "") +
      "</div>";

  for (const r of lista) {
    html +=
      '<blockquote class="ia-resena">' +
        '<span class="estrellas" aria-label="' + r.estrellas + ' de 5 estrellas">' +
          dibujarEstrellas(r.estrellas) +
        "</span>" +
        "<p>“" + r.texto + "”</p>" +
        "<cite>— " + r.autor + "</cite>" +
      "</blockquote>";
  }

  return html + "</div>";
}


/* Enviar imagen al modelo */
async function predecir(elemento) {
  const predicciones = await modelo.predict(elemento);
  mostrarBarras(predicciones);
  mostrarResultado(predicciones);
}


/* ---------- CÁMARA ---------- */

async function bucleCamara() {
  if (!camaraEncendida) return;

  webcam.update();
  await predecir(webcam.canvas);

  requestAnimationFrame(bucleCamara);
}

btnCamara.addEventListener("click", async function () {
  if (camaraEncendida) {
    camaraEncendida = false;
    webcam.stop();

    btnCamara.textContent = "📷 Usar cámara";
    iaEstado.textContent = "Cámara apagada.";
    return;
  }

  try {
    await cargarModelo();

    iaEstado.textContent = "Pidiendo permiso para la cámara…";

    webcam = new tmImage.Webcam(300, 300, true);

    await webcam.setup();
    await webcam.play();

    iaVisor.innerHTML = "";
    iaVisor.appendChild(webcam.canvas);

    camaraEncendida = true;
    btnCamara.textContent = "⏹ Apagar cámara";
    iaEstado.textContent = "Mostrale un producto a la cámara 🎥";

    bucleCamara();

  } catch (error) {
    iaEstado.textContent =
      "❌ " + (error.message || "No se pudo usar la cámara. Revisá los permisos del navegador.");
  }
});


/* ---------- SUBIR UNA FOTO ---------- */

btnFoto.addEventListener("click", function () {
  iaArchivo.click();
});

iaArchivo.addEventListener("change", async function () {
  const archivo = iaArchivo.files[0];
  if (!archivo) return;

  if (camaraEncendida) {
    btnCamara.click();
  }

  const img = document.createElement("img");
  img.alt = "Foto subida";
  img.src = URL.createObjectURL(archivo);

  iaVisor.innerHTML = "";
  iaVisor.appendChild(img);

  img.onload = async function () {
    try {
      await cargarModelo();

      ultimaClaseMostrada = "";
      await predecir(img);

      iaEstado.textContent = "Listo ✅ Probá con otra foto si querés.";

    } catch (error) {
      iaEstado.textContent = "❌ " + error.message;
    }
  };

  iaArchivo.value = "";
});


/* ---------- AGREGAR AL PEDIDO ---------- */

iaResultado.addEventListener("click", function (evento) {
  const boton = evento.target.closest("[data-ia-id]");

  if (boton) {
    agregarAlCarrito(Number(boton.dataset.iaId));
    boton.textContent = "✅ Agregado";
  }
});


/* ---------- MODO DEMO ---------- */

function simularPredicciones(claseElegida) {
  const nombres = Object.keys(clasesIA);
  const confianza = 0.85 + Math.random() * 0.12;

  const azar = nombres.map(function () {
    return Math.random();
  });

  let sumaOtras = 0;

  nombres.forEach(function (n, i) {
    if (n !== claseElegida) {
      sumaOtras += azar[i];
    }
  });

  return nombres.map(function (nombre, i) {
    const probabilidad = nombre === claseElegida
      ? confianza
      : (1 - confianza) * azar[i] / sumaOtras;

    return {
      className: nombre,
      probability: probabilidad
    };
  });
}


if (modoDemo) {
  btnCamara.classList.add("oculto");
  btnFoto.classList.add("oculto");

  iaEstado.textContent =
    "Modo demo: los resultados son simulados. Tocá un producto para mostrárselo a la IA.";

  for (const nombre of Object.keys(clasesIA)) {
    const producto = clasesIA[nombre]
      ? buscarProducto(clasesIA[nombre])
      : null;

    const emojiProducto = producto && producto.emoji
      ? producto.emoji
      : "🔧";

    const boton = document.createElement("button");
    boton.className = "ia-muestra";
    boton.type = "button";

    boton.innerHTML =
      '<span class="emoji">' +
      (producto ? emojiProducto : "🫥") +
      "</span>" +
      nombre;

    boton.addEventListener("click", function () {
      iaDemo.querySelectorAll(".ia-muestra").forEach(function (b) {
        b.classList.remove("activo");
      });

      boton.classList.add("activo");

      iaVisor.innerHTML =
        '<span class="ia-visor-emoji">' +
        (producto ? emojiProducto : "🫥") +
        "</span>";

      iaEstado.textContent = "Analizando… 🔍";

      setTimeout(function () {
        ultimaClaseMostrada = "";

        const predicciones = simularPredicciones(nombre);

        mostrarBarras(predicciones);
        mostrarResultado(predicciones);

        iaEstado.textContent =
          "Modo demo: los resultados son simulados.";
      }, 500);
    });

    iaDemo.appendChild(boton);
  }

  iaDemo.querySelector(".ia-muestra").click();

} else {
  iaDemo.classList.add("oculto");
}
