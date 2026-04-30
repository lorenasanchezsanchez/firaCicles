import { ciclesData } from './ciclesData.js';
import { templates } from './templates.js';

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("dynamic-content");
  const pills = document.querySelectorAll("[data-content]");
  const menu = document.querySelector('.highlights');
  const titulo = document.querySelector('.title-animated span');
  const alerta = document.getElementById('alerta-matricula');

  if (!container || pills.length === 0) {
    console.error("No se han encontrado los elementos");
    return;
  }

  function getCicleFromHash() {
    return window.location.hash.replace('#/', '').split('/')[0];
  }

  function mostrarOcultarElementos() {
    const tieneHash = !!window.location.hash && window.location.hash.length > 1;
    if (!tieneHash) {
      // Oculta todo si NO hay hash
      if (alerta) alerta.style.display = 'none';
      if (container) container.style.display = 'none';
      if (menu) menu.style.display = 'none';
    } else {
      // Muestra todo si hay cualquier hash
      if (alerta) alerta.style.display = '';
      if (container) container.style.display = '';
      if (menu) menu.style.display = '';
    }
  }

  function marcarPillActivo(cicle) {
    pills.forEach(p => {
      if (cicle && p.dataset.content === cicle) p.classList.add("active");
      else if (!cicle && p.dataset.content === "coneixerns") p.classList.add("active");
      else p.classList.remove("active");
    });
  }

  function updateContent() {
    const cicle = getCicleFromHash();
    // Si NO hay hash, no cargues nada
    if (!cicle) {
      if (titulo) titulo.textContent = "";
      container.innerHTML = "";
      marcarPillActivo(null);
      return;
    }

    // Siempre mostrar el panel "Vine a conèixer-nos" en primer lugar
    let html = templates["coneixerns"];

    // Si el hash es un ciclo válido, añade el plan y cambia el título
    if (ciclesData[cicle] && ciclesData[cicle].pla) {
      if (titulo) titulo.textContent = ciclesData[cicle].titol;
      html += ciclesData[cicle].pla.join("");
      marcarPillActivo(cicle);
    } else {
      // Si NO es ciclo, pon el título de bienvenida
      if (titulo) titulo.textContent = "Benvingut a IES Benigasló";
      marcarPillActivo(cicle); // marcar informativos si tienes más pills
    }
    container.innerHTML = html;
    enableVideoFullscreen();
  }

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

  // Pills: cambio de sección/hash
  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      const key = pill.dataset.content;
      // "Matrícula": abrir enlace en otra pestaña
      if (key === "matricula") {
        window.open(
          "https://portal.edu.gva.es/adminova/es/fp/",
          "_blank",
          "noopener,noreferrer"
        );
        return;
      }
      // Cambia hash siempre
      window.location.hash = '/' + key;
    });
  });

  // --- Manejador general el hash ---
  function actualizarPagina() {
    updateContent();
    mostrarOcultarElementos();
  }
  window.addEventListener('hashchange', actualizarPagina);

  // Carga inicial: si ya hay hash, ejecuta, si no oculta todo
  actualizarPagina();
});
