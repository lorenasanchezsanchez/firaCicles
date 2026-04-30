import {ciclesData} from './ciclesData.js';
import {templates} from './templates.js';

document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("dynamic-content");
  const pills = document.querySelectorAll("[data-content]");

  if (!container || pills.length === 0) {
    console.error("No se han encontrado los elementos");
    return;
  }

  function getCicleFromHash() {
  // Extrae, por ejemplo, 'smx', 'dam', etc. de '#/smx'
  return window.location.hash.replace('#/', '').split('/')[0];
}
  // Detectar subruta
  const cicle = getCicleFromHash()

  
function mostrarOcultarElementos() {
  const alerta = document.getElementById('alerta-matricula');
  const dinamic = document.getElementById('dynamic-content');
   const cicle = getCicleFromHash();
  // Ocultar ambos si no hay ruta, mostrar ambos si hay ruta
  if (!cicle) {
    if (alerta) alerta.style.display = 'none';
    if (dinamic) dinamic.style.display = 'none';
    menu.style.display='none';
  } else {
    if (alerta) alerta.style.display = '';
    if (dinamic) dinamic.style.display = '';
    menu.style.display='';
  }
}
   

function updateContent() {
  const cicle = getCicleFromHash();
  const titleEl = document.querySelector('.title-animated span');
  const contentEl = document.getElementById('dynamic-content');

  if (cicle && ciclesData[cicle] && ciclesData[cicle].pla) {
    if (titleEl) titleEl.textContent = ciclesData[cicle].titol;
    if (contentEl) contentEl.innerHTML = ciclesData[cicle].pla.join("");
  } else {
    if (titleEl) titleEl.textContent = "Benvingut a IES Benigasló";
    if (contentEl) contentEl.innerHTML = ""; // o panel de bienvenida si quieres
  }
}

function actualizarPagina() {
  updateContent();
  mostrarOcultarElementos();
}
  

  

  

  function enableVideoFullscreen() {
    const video = container.querySelector("video.video-panel");
    if (!video) return;

    // Evita duplicar listener si vuelves a entrar al panel
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
        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen(); // Safari
        else if (video.msRequestFullscreen) video.msRequestFullscreen(); // antiguos
      } catch (e) {
        console.warn("No s'ha pogut activar pantalla completa:", e);
      }
    });
  }

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {

      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const key = pill.dataset.content;

      // "Matrícula": abrir enlace en otra pestaña (no cargar panel)
      if (key === "matricula") {
        window.open(
          "https://portal.edu.gva.es/adminova/es/fp/",
          "_blank",
          "noopener,noreferrer"
        );
        return;
      }

      container.classList.add("hide");

      setTimeout(function () {
        container.innerHTML = templates[key] || '<div class="panel-section"><p>Contingut no disponible.</p></div>';
        container.classList.remove("hide");
        enableVideoFullscreen();
      }, 200);
    });
  });

  // Carga inicial: "Vine a conéixer-nos" si existe; si no, el primero
  const defaultPill = document.querySelector('[data-content="coneixerns"]') || pills[0];
  defaultPill.click();


  // Cada vez que cambia el hash
  window.addEventListener('hashchange', actualizarPagina);
  // Al cargar por primera vez
if (getCicleFromHash()) {
  actualizarPagina();
} else {
  const defaultPill = document.querySelector('[data-content="coneixerns"]') || pills[0];
  if (defaultPill) defaultPill.click();
}

});


