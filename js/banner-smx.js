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
    const cicle = getCicleFromHash();
    // SIEMPRE muestra la bienvenida
    container.innerHTML = templates["coneixerns"] || "<h3>Benvingut/da! Vine a conèixer-nos.</h3>";

    if (!cicle || !ciclesData[cicle] || !ciclesData[cicle].pla) {
      // Sin ciclo válido: título por defecto y pill de bienvenida activo
      if (tituloSpan) tituloSpan.textContent = "Vine a conèixer-nos";
      if (alerta) alerta.innerHTML = "";
      marcarPillActivo("coneixerns");
      return;
    }
    // Con ciclo válido
    if (tituloSpan) tituloSpan.textContent = ciclesData[cicle].titol || "";
    if (alerta) alerta.innerHTML = ciclesData[cicle].alerta || "";
    container.innerHTML += ciclesData[cicle].pla.join("");
    marcarPillActivo(cicle);
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
