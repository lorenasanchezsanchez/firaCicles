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
  function getCicleAndSectionFromHash() {
  // hash del tipo #/smx/pla
  const parts = window.location.hash.replace('#/', '').split('/');
  return {
    cicle: (parts[0] || '').toLowerCase(),
    section: (parts[1] || '').toLowerCase()
  };
}
function marcarPillActivo(key) {
  pills.forEach(p => {
    if (key && p.dataset.content.toLowerCase() === key) p.classList.add("active");
    else p.classList.remove("active");
  });
}
  function cicloValido() {
    const cicle = getCicleFromHash();
    return !!(cicle && ciclesData[cicle] && ciclesData[cicle].pla);
  }

  // Muestra/oculta todos los elementos principales según si hay ciclo válido
 function mostrarOcultarElementos() {
   // SIEMPRE se muestra el título y el container
    if (titulo) titulo.style.display = '';
    if (container) container.style.display = ''; // nunca se oculta
  if (!cicloValido()) {
    // OCULTAR
    if (alerta) alerta.style.display = 'none';
    if (menu) menu.style.display = 'none';
    
  } else {
    // MOSTRAR
    if (alerta) alerta.style.display = '';
    if (menu) menu.style.display = '';
  
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
  const { cicle, section } = getCicleAndSectionFromHash();

  // Si el ciclo es válido...
  if (cicle && ciclesData[cicle]) {
    // Mostrar título siempre
    if (tituloSpan) tituloSpan.textContent = ciclesData[cicle].titol || "";

    // Mostrar vídeo (bienvenida) si está en "coneixerns" o solo ciclo
    if (!section || section === "coneixerns") {
      container.innerHTML = templates["coneixerns"] || "<h3>Benvingut/da!</h3>";
      marcarPillActivo("coneixerns");
    } else if (section === "pla") {
      // Mostrar plan
      container.innerHTML = ciclesData[cicle].pla ? ciclesData[cicle].pla.join("") : "<p>No hi ha plan disponible.</p>";
      marcarPillActivo("pla");
    } else {
      container.innerHTML = "<h3>Opció no disponible</h3>";
      marcarPillActivo(null);
    }

    if (alerta) alerta.innerHTML = ciclesData[cicle].alerta || "";
    enableVideoFullscreen();
    return;
  }

  // Si no hay ciclo válido, muestra bienvenida general
  container.innerHTML = templates["coneixerns"] || "<h3>Benvingut/da! Vine a conèixer-nos.</h3>";
  if (tituloSpan) tituloSpan.textContent = "Vine a conèixer-nos";
  if (alerta) alerta.innerHTML = "";
  marcarPillActivo("coneixerns");
}

pills.forEach(function (pill) {
  pill.addEventListener("click", function () {
    const pillKey = pill.dataset.content.toLowerCase();
    const { cicle, section } = getCicleAndSectionFromHash();

    // Si es matrícula, abre link externo
    if (pillKey === "matricula") {
      window.open(
        "https://portal.edu.gva.es/adminova/es/fp/",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    // Tomar el ciclo activo del hash, o smx por defecto si no hay
    const cicloActivo = cicle || 'smx'; // o como prefieras
    let nuevoHash = '';

    if (pillKey === "coneixerns") {
      // Mostrar bienvenida del ciclo: #/smx
      nuevoHash = '/' + cicloActivo;
    } else {
      // Mostrar seccion (ejemplo: #/smx/pla)
      nuevoHash = '/' + cicloActivo + '/' + pillKey;
    }

    if (window.location.hash === '#' + nuevoHash) {
      actualizarPagina();
    } else {
      window.location.hash = nuevoHash;
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
