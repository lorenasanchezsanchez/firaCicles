import { ciclesData } from './ciclesData.js';
import { templates } from './templates.js';

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("dynamic-content");
  const pills = document.querySelectorAll("[data-content]");
  const menu = document.querySelector('.highlights');

  if (!container || pills.length === 0) {
    console.error("No se han encontrado los elementos");
    return;
  }

  function getCicleFromHash() {
    return window.location.hash.replace('#/', '').split('/')[0];
  }

  function mostrarOcultarElementos() {
    const alerta = document.getElementById('alerta-matricula');
    const dinamic = document.getElementById('dynamic-content');
    const cicle = getCicleFromHash();
    if (!cicle) {
      if (alerta) alerta.style.display = 'none';
      if (dinamic) dinamic.style.display = 'none';
      if (menu) menu.style.display = 'none';
    } else {
      if (alerta) alerta.style.display = '';
      if (dinamic) dinamic.style.display = '';
      if (menu) menu.style.display = '';
    }
  }

  function updateContent() {
    const cicle = getCicleFromHash();
    const titleEl = document.querySelector('.title-animated span');
    const contentEl = document.getElementById('dynamic-content');

    // Si hay hash y ciclo válido, carga ciclo:
    if (cicle && ciclesData[cicle] && ciclesData[cicle].pla) {
      if (titleEl) titleEl.textContent = ciclesData[cicle].titol;
      if (contentEl) contentEl.innerHTML = ciclesData[cicle].pla.join("");
      marcarPillActivo(cicle);
    } else {
      if (titleEl) titleEl.textContent = "Benvingut a IES Benigasló";
      if (contentEl) contentEl.innerHTML = templates["coneixerns"]; // o lo que quieras de default
      marcarPillActivo(null);
    }
  }

  function actualizarPagina() {
    updateContent();
    mostrarOcultarElementos();
  }

  function marcarPillActivo(cicle) {
    pills.forEach(p => {
      if (cicle && p.dataset.content === cicle) p.classList.add("active");
      else p.classList.remove("active");
    });
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
    // Si es un ciclo, cambia hash para disparar updateContent()
    if (ciclesData[key]) {
      window.location.hash = '/' + key;
      return;
    }
    // Si es un panel tradicional, LIMPIA EL HASH y muestra el template y resalta el pill
    history.replaceState(null, '', window.location.pathname + window.location.search);
    pills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    container.classList.add("hide");
    setTimeout(function () {
      container.innerHTML = templates[key] || '<div class="panel-section"><p>Contingut no disponible.</p></div>';
      container.classList.remove("hide");
      enableVideoFullscreen();
    }, 200);
    // No cambiamos el título para los paneles informativos
    const titleEl = document.querySelector('.title-animated span');
    if (titleEl) titleEl.textContent = "Benvingut a IES Benigasló";
    mostrarOcultarElementos(); // <--- Esto fuerza ocultar
  });
});

  // CARGA INICIAL
  if (getCicleFromHash()) {
    actualizarPagina();
  } else {
    // Si no hay hash, panel de bienvenida (coneixerns)
    const defaultPill = document.querySelector('[data-content="coneixerns"]') || pills[0];
    if (defaultPill) defaultPill.click();
  }

  // Cada vez que cambia el hash, mostramos el ciclo correspondiente
  window.addEventListener('hashchange', actualizarPagina);
});
