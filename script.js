"use strict";

/*
  FOODFINDER — FASE 2

  Este archivo únicamente controla una interacción de interfaz.
  No realiza consultas a una API ni genera recetas dinámicas.

  El menú móvil utiliza el componente Collapse de Bootstrap,
  incluido en bootstrap.bundle.min.js.
*/

const buscador = document.querySelector("#buscador");

if (buscador) {
  const ingrediente = document.querySelector("#ingrediente");

  buscador.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Evita aceptar una entrada formada únicamente por espacios.
    const texto = ingrediente.value.trim();

    ingrediente.setCustomValidity(
      texto ? "" : "Escribe un ingrediente para continuar."
    );

    if (!buscador.reportValidity()) {
      return;
    }

    /*
      Navegación de demostración:
      siempre abre la página estática de recetas con pollo.
    */
    window.location.href = "resultados.html";
  });

  // Elimina el mensaje anterior cuando el usuario vuelve a escribir.
  ingrediente.addEventListener("input", function () {
    ingrediente.setCustomValidity("");
  });
}