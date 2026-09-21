"use strict";

/* =========================================
   BUSCADOR DE INICIO
   Demostración con resultados estáticos.
   ========================================= */

const buscador = document.querySelector("#buscador");

if (buscador) {
  const ingrediente = document.querySelector("#ingrediente");

  buscador.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const texto = ingrediente.value.trim();

    ingrediente.setCustomValidity(
      texto ? "" : "Escribe un ingrediente para continuar."
    );

    if (!buscador.reportValidity()) {
      return;
    }

    window.location.href = "resultados.html";
  });

  ingrediente.addEventListener("input", function () {
    ingrediente.setCustomValidity("");
  });
}

/* =========================================
   RECETAS LOCALES DE EJEMPLO
   Sin API ni consultas externas.
   ========================================= */

const recetas = {
  pollo: {
    nombre: "Pollo teriyaki",
    descripcion: "Una idea para transformar los ingredientes de tu cocina.",
    ilustracion: "🍗 🍚",
    descripcionImagen: "Ilustración de pollo acompañado de arroz",
    fondo: "fondo-pollo",

    ingredientes: [
      "Pechuga de pollo",
      "Arroz",
      "Salsa de soya",
      "Ajo",
      "Jengibre"
    ],

    nota: "Texto de muestra para la maquetación; no constituye una receta completa.",

    pasos: [
      "Prepara los ingredientes. Organiza el pollo, el arroz y los ingredientes de la salsa.",
      "Cocina el platillo. Este espacio presenta las indicaciones de cocción de la receta.",
      "Sirve y acompaña. Este espacio muestra las indicaciones finales de presentación."
    ],

    regreso: "resultados.html",
    textoRegreso: "← Volver a resultados"
  },

  tacos: {
    nombre: "Tacos de frijoles",
    descripcion: "Una combinación sencilla para compartir.",
    ilustracion: "🌮",
    descripcionImagen: "Ilustración de tacos de frijoles",
    fondo: "fondo-tacos",

    ingredientes: [
      "6 tortillas de maíz",
      "1 taza de frijoles cocidos",
      "1 tomate",
      "1/4 de cebolla",
      "1 aguacate",
      "Cilantro al gusto"
    ],

    nota: "Receta de ejemplo con datos estáticos.",

    pasos: [
      "Lava el tomate y el cilantro. Pica el tomate, la cebolla y el cilantro; corta el aguacate.",
      "Calienta los frijoles y las tortillas.",
      "Coloca una porción de frijoles sobre cada tortilla.",
      "Agrega el tomate, la cebolla, el cilantro y el aguacate.",
      "Sirve los tacos recién preparados."
    ],

    regreso: "index.html#tituloDestacadas",
    textoRegreso: "← Volver a recetas destacadas"
  },

  ensalada: {
    nombre: "Ensalada fresca",
    descripcion: "Una mezcla de vegetales para acompañar tu comida.",
    ilustracion: "🥗",
    descripcionImagen: "Ilustración de una ensalada fresca",
    fondo: "fondo-ensalada",

    ingredientes: [
      "2 tazas de lechuga",
      "1 tomate",
      "1 pepino",
      "1 zanahoria",
      "1 cucharada de aceite de oliva",
      "Jugo de medio limón",
      "Sal al gusto"
    ],

    nota: "Receta de ejemplo con datos estáticos.",

    pasos: [
      "Lava los vegetales.",
      "Corta la lechuga, el tomate y el pepino.",
      "Ralla la zanahoria y coloca todos los vegetales en un recipiente.",
      "Agrega el aceite de oliva, el jugo de limón y la sal.",
      "Mezcla suavemente y sirve."
    ],

    regreso: "index.html#tituloDestacadas",
    textoRegreso: "← Volver a recetas destacadas"
  },

  pasta: {
    nombre: "Pasta con tomate",
    descripcion: "Un clásico sencillo para cocinar en casa.",
    ilustracion: "🍝",
    descripcionImagen: "Ilustración de pasta con salsa de tomate",
    fondo: "fondo-pasta",

    ingredientes: [
      "200 gramos de pasta",
      "1 taza de tomate triturado",
      "1 diente de ajo",
      "1 cucharada de aceite de oliva",
      "Sal al gusto",
      "Queso rallado al gusto"
    ],

    nota: "Receta de ejemplo con datos estáticos.",

    pasos: [
      "Cuece la pasta siguiendo las indicaciones de su empaque.",
      "Pica el ajo y cocínalo brevemente en una sartén con el aceite, evitando que se queme.",
      "Agrega el tomate triturado y la sal. Cocina a fuego suave durante unos 10 minutos.",
      "Escurre la pasta y mézclala con la salsa.",
      "Sirve y agrega queso rallado al gusto."
    ],

    regreso: "index.html#tituloDestacadas",
    textoRegreso: "← Volver a recetas destacadas"
  }
};

/* =========================================
   MOSTRAR LA RECETA SELECCIONADA
   Este bloque solo actúa en receta.html.
   ========================================= */

const tituloReceta = document.querySelector("#tituloReceta");

if (tituloReceta) {
  const parametros = new URLSearchParams(window.location.search);
  const platillo = parametros.get("platillo");

  // Si no hay un platillo válido, muestra el pollo.
  const existeReceta = Object.prototype.hasOwnProperty.call(
    recetas,
    platillo
  );

  const receta = existeReceta ? recetas[platillo] : recetas.pollo;
  const ficha = tituloReceta.closest("article");

  // Cambia el título de la pestaña y del platillo.
  document.title = receta.nombre + " | FoodFinder";
  tituloReceta.textContent = receta.nombre;

  // Cambia la descripción.
  const descripcion = ficha.querySelector(".lead");

  if (descripcion) {
    descripcion.textContent = receta.descripcion;
  }

  // Cambia la ilustración y su color de fondo.
  const imagen = ficha.querySelector(".imagen-detalle");

  if (imagen) {
    imagen.classList.remove(
      "fondo-pollo",
      "fondo-tacos",
      "fondo-ensalada",
      "fondo-pasta"
    );

    imagen.classList.add(receta.fondo);
    imagen.setAttribute("aria-label", receta.descripcionImagen);

    const ilustracion = imagen.querySelector("span");

    if (ilustracion) {
      ilustracion.textContent = receta.ilustracion;
    }
  }

  // Sustituye los ingredientes.
  const listaIngredientes = ficha.querySelector(".lista-ingredientes");

  if (listaIngredientes) {
    listaIngredientes.replaceChildren();

    receta.ingredientes.forEach(function (ingrediente) {
      const elemento = document.createElement("li");
      elemento.textContent = ingrediente;
      listaIngredientes.appendChild(elemento);
    });
  }

  // Sustituye la preparación.
  const preparacion = ficha.querySelector(".preparacion");

  if (preparacion) {
    preparacion.replaceChildren();

    const etiqueta = document.createElement("p");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = "PASO A PASO";

    const titulo = document.createElement("h2");
    titulo.id = "tituloPreparacion";
    titulo.textContent = "Preparación";

    const nota = document.createElement("p");
    nota.className = "text-secondary";
    nota.textContent = receta.nota;

    preparacion.appendChild(etiqueta);
    preparacion.appendChild(titulo);
    preparacion.appendChild(nota);

    receta.pasos.forEach(function (paso, indice) {
      const parrafo = document.createElement("p");
      const numero = document.createElement("strong");

      numero.textContent = (indice + 1) + ". ";

      parrafo.appendChild(numero);
      parrafo.appendChild(document.createTextNode(paso));

      preparacion.appendChild(parrafo);
    });
  }

  // Ajusta el botón para regresar a la página correspondiente.
  const botonRegreso = ficha.querySelector("a.boton-principal");

  if (botonRegreso) {
    botonRegreso.href = receta.regreso;
    botonRegreso.textContent = receta.textoRegreso;
  }
}
