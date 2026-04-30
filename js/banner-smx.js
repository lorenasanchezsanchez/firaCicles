import { ciclesData } from './ciclesData.js';
import { templates } from './templates.js';

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("dynamic-content");
  const pills = document.querySelectorAll("[data-content]");
  const menu = document.querySelector('.highlights');
  const titulo = document.querySelector('.title-animated');
  const tituloSpan =document.querySelector('.title-animated span');
  const alerta = document.getElementById('alerta-matricula');

  if (!container || pills.length === 0) {
    console.error("No se han encontrado los elementos");
    return;
  }

  function getCicleFromHash() {
    return window.location.hash.replace('#/', '').split('/')[0];
  }

  function cicloValido() {
    const cicle = getCicleFromHash();
    return !!(cicle && ciclesData[cicle] && ciclesData[cicle].pla);
  }

  // Muestra/oculta todos los elementos principales según si hay ciclo válido
 function mostrarOcultarElementos() {
  if (!cicloValido()) {
    // OCULTAR
    if (alerta) alerta.style.display = 'none';
    if (menu) menu.style.display = 'none';
    if (titulo) titulo.style.display = 'none';
    if (tituloSpan) tituloSpan.textContent = "";
  } else {
    // MOSTRAR
    if (alerta) alerta.style.display = '';
    if (menu) menu.style.display = '';
    if (titulo) titulo.style.display = '';
  }
}

  // Marca como activo el ciclo sólo cuando es válido
  function marcarPillActivo(cicle) {
    pills.forEach(p => {
      if (cicle && p.dataset.content === cicle) p.classList.add("active");
      else p.classList.remove("active");
    });
  }

  // Main update
  function updateContent() {
  const cicle = getCicleFromHash();
  if (!cicle || !ciclesData[cicle] || !ciclesData[cicle].pla) {
    // Limpiar y ocultar todo
    if (tituloSpan) tituloSpan.textContent = "";
    if (alerta) alerta.innerHTML = "";
    marcarPillActivo(null);
    return;
  }
  // MOSTRAR TODOS
  if (titulo) titulo.style.display = '';
  if (menu) menu.style.display = '';
  if (alerta) alerta.style.display = '';

  let html = templates["coneixerns"];
  if (tituloSpan) tituloSpan.textContent = ciclesData[cicle].titol || "";
  html += ciclesData[cicle].pla.join("");

  marcarPillActivo(cicle);
  if (alerta) alerta.innerHTML = ciclesData[cicle].alerta || "";
  enableVideoFullscreen();
}

  pills.forEach(function (pill) {
  pill.addEventListener("click", function () {
    const key = pill.dataset.content.toLowerCase();

    if (key === "matricula") {
      window.open(
        "https://portal.edu.gva.es/adminova/es/fp/",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    // Calcula el hash esperado para este botón
    const expectedHash = '/' + key;
    // Calcula el hash actual (quitando primero el #)
    const currentHash = window.location.hash.replace('#','');

    if (currentHash === expectedHash) {
      // Ya estamos en ese hash, solo recarga el contenido
      actualizarPagina();
    } else {
      // Si es distinto, cambia el hash
      window.location.hash = expectedHash;
    }
  });
});

  function actualizarPagina() {
    updateContent();
    mostrarOcultarElementos();
  }

  window.addEventListener('hashchange', actualizarPagina);

  // Carga inicial
  actualizarPagina();

  // --- Video fullscreen extra ---
  function enableVideoFullscreen() {
    const video = container.querySelector("video.video-panel");
    if (!video) return;
    if (video.dataset.fsBound === "1") return;
    video.dataset.fsBound = "1";
    video.style.cursor = "pointer";
    video.title = "Clica per veure en pantalla completa";
    video.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          return;
        }
        if (video.requestFullscreen) await video.requestFullscreen();
        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
        else if (video.msRequestFullscreen) video.msRequestFullscreen();
      } catch (e) {
        console.warn("No s'ha pogut activar pantalla completa:", e);
      }
    });
  }
});
