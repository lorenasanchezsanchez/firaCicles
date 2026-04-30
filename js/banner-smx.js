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

const ciclesData = {
    smx: {
      titol: "Sistemes Microinformàtics i Xarxes",
      descripcio: "SMX",
      pla: [
      '<div class="panel-section">',
      '<h3>📚 Pla de formació de 2000 hores</h3>',

      '<div class="plan-formacio">',

      '<div class="curs">',
      '<h4>1r curs</h4>',
      '<ul>',
      '<li>Montatge i manteniment d’equips</li>',
      '<li>Sistemes operatius monopost</li>',
      '<li>Aplicacions ofimàtiques</li>',
      '<li>Xarxes locals</li>',
      '<li>Anglés professional (GM)</li>',
      '<li>Itinerari personal per a l’ocupabilitat I</li>',
      '</ul>',
      '</div>',

      '<div class="curs">',
      '<h4>2n curs</h4>',
      '<ul>',
      '<li>Sistemes operatius en xarxa</li>',
      '<li>Seguretat informàtica</li>',
      '<li>Serveis en xarxa</li>',
      '<li>Aplicacions web</li>',
      '<li>Mòdul optatiu</li>',
      '<li>Itinerari personal per a l’ocupabilitat II</li>',
      '<li>Sostenibilitat aplicada al sistema productiu</li>',
      '<li>Digitalització aplicada al sistema productiu</li>',
      '<li>Projecte intermodular</li>',
      '<li>Formació en Centres de Treball (FCT)</li>',
      '</ul>',
      '</div>',

      '</div>',
      '</div>'
    ]
    },
    dam: {
      titol: "Desenvolupament d'Aplicacions Multiplataforma",
      descripcio: "DAM",
      pla: [
          '<div class="panel-section">',
          '<h3>📚 Pla de formació de 2000 hores</h3>',
        
          '<div class="plan-formacio">',
        
          '<div class="curs">',
          '<h4>1r curs</h4>',
          '<ul>',
          '<li>Anglés professional (GS)</li>',
          '<li>Llenguatges de marques i sistemes de gestió d\'informació</li>',
          '<li>Sistemes informàtics</li>',
          '<li>Bases de dades</li>',
          '<li>Programació</li>',
          '<li>Entorns de desenvolupament</li>',
          '<li>Itinerari personal per a l\'ocupabilitat I</li>',
          '<li>Projecte intermodular de desenvolupament d\'aplicacions multiplataforma (primer curs)</li>',
          '</ul>',
          '</div>',
        
          '<div class="curs">',
          '<h4>2n curs</h4>',
          '<ul>',
          '<li>Accés a dades</li>',
          '<li>Desenvolupament d\'interfícies</li>',
          '<li>Programació multimèdia i dispositius mòbils</li>',
          '<li>Programació de serveis i processos</li>',
          '<li>Sistemes de gestió empresarial</li>',
          '<li>Itinerari personal per a l\'ocupabilitat II</li>',
          '<li>Projecte intermodular de desenvolupament d\'aplicacions multiplataforma (segon curs)</li>',
          '<li>Mòdul optatiu</li>',
          '<li>Digitalització aplicada al sistema productiu (GS)</li>',
          '<li>Sostenibilitat aplicada al sistema productiu</li>',
          '<li>Formació en Centres de Treball (FCT)</li>',
          '</ul>',
          '</div>',
        
          '</div>',
          '</div>'
        ]
    },
    daw: {
      titol: "Desenvolupament d'Aplicacions Web",
      descripcio: "DAW"
    },
    fpb: {
      titol: "Formació Professional Bàsica",
      descripcio: "FPB"
    },
    fpqpi: {
      titol: "Programa Formatiu de Qualificació Bàsica",
      descripcio: "PFQB"
    },
    ceiabd: {
      titol: "Curs d'Especialització de Inteligència Artificial i Big Data",
      descripcio: "CEIABD"
    }
  };

   

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
  

  

  const templates = {

    coneixerns: [
      '<div class="panel-section">',
      "<h3>🎥 Vine a conèixer-nos</h3>",
      '<div class="video-panel-wrap">',
      '  <video class="video-panel" autoplay muted loop playsinline preload="metadata">',
      '    <source src="assets/Video.mp4" type="video/mp4" />',
      "    El teu navegador no suporta vídeo HTML5.",
      "  </video>",
      "</div>",
      "</div>"
    ].join(""),

  

    centre: [
      '<div class="panel-section centre-grid">',
      '  <div class="centre-text">',
      '    <h3>🏫 Centre i contacte</h3>',
      '    <p><strong>IES Benigasló</strong></p>',
      '    <p>C/ Arcadi García, 1 · 12600 La Vall d’Uixó</p>',
      '    <p>📞 964 738 955</p>',
      '    <p>📧 12005751@edu.gva.es</p>',
      '    <p>🌐 portal.edu.gva.es/iesbenigaslo</p>',
      '  </div>',
      '  <div class="centre-media">',
      '    <img class="centre-img" src="assets/img/ies.jpg" alt="IES Benigasló" loading="lazy" />',
      '  </div>',
      '</div>'
    ].join(""),

    continu: [
      '<div class="panel-section">',
      '<h3>🚀 Continuïtat formativa</h3>',
      '<ul>',
      '<li>Curs d’especialització en Implementació de xarxes 5G</li>',
      '<li>Curs d’especialització en sistemes IoT</li>',
      '<li>Accés directe a cicles superiors d’Informàtica</li>',
      '</ul>',
      '</div>'
    ].join(""),

    eixides: [
      '<div class="panel-section">',
      '<h3>💼 Eixides professionals</h3>',
      '<ul>',
      '<li>Tècnic instal·lador-reparador d’equips informàtics</li>',
      '<li>Tècnic de suport informàtic</li>',
      '<li>Tècnic de xarxes de dades</li>',
      '<li>Reparador de perifèrics</li>',
      '<li>Operador de sistemes i teleassistència</li>',
      '</ul>',
      '</div>'
    ].join(""),
    calendari: [
  '<div class="panel-section">',
  "<h3>📅 Calendari d'admissió</h3>",
  '<div class="pdf-wrap">',
  '  <iframe class="pdf-frame" src="assets/calendari.pdf" title="Calendari d\'admisió"></iframe>',
  "</div>",
  "</div>"
].join(""),

    oferim: [
      '<div class="panel-section">',
      '<h3>🧰 Què oferim</h3>',
      '<ul>',
      '<li>Aules digitalitzades amb ordinador per alumne</li>',
      '<li>Dispositius IoT i impressió 3D</li>',
      '<li>Xarxa Wi‑Fi per a l’alumnat</li>',
      '<li>Llicències professionals (AWS, Azure, GitHub…)</li>',
      '<li>Preparació per a certificacions oficials</li>',
      '</ul>',
      '</div>'
    ].join("")
  };

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


