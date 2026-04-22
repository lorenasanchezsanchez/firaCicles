// Contenedor central donde se carga el contenido
const container = document.getElementById("dynamic-content");

// Píldoras clicables
const pills = document.querySelectorAll("[data-content]");

// Plantillas de contenido
const templates = {

  pla: `
    <h3>📚 Pla de formació (currículum oficial GVA)</h3>

    <div class="plan-formacio">
      <div class="curs">
        <h4>1r curs</h4>
        <ul>
          <li>Montatge i manteniment d’equips</li>
          <li>Sistemes operatius monopost</li>
          <li>Aplicacions ofimàtiques</li>
          <li>Xarxes locals</li>
          <li>Anglés professional (GM)</li>
          <li>Itinerari personal per a l’ocupabilitat I</li>
        </ul>
      </div>

      <div class="curs">
        <h4>2n curs</h4>
        <ul>
          <li>Sistemes operatius en xarxa</li>
          <li>Seguretat informàtica</li>
          <li>Serveis en xarxa</li>
          <li>Aplicacions web</li>
          <li>Mòdul optatiu</li>
          <li>Itinerari personal per a l’ocupabilitat II</li>
          <li>Sostenibilitat aplicada al sistema productiu</li>
          <li>Digitalització aplicada al sistema productiu</li>
          <li>Projecte intermodular</li>
          <li>Formació en Centres de Treball (FCT)</li>
        </ul>
      </div>
    </div>

    <p style="opacity:.85; margin-top:1.2rem;">
      <em>
        Pla de formació segons el currículum oficial del CFGM de
        Sistemes Microinformàtics i Xarxes de la Generalitat Valenciana.
      </em>
    </p>
  `,

  centre: `
    <h3>📍 Centre i contacte</h3>
    <p><strong>IES Benigasló</strong></p>
    <p>C/ Arcadi García, 1 · 12600 La Vall d’Uixó</p>
    <p>📞 964 738 955</p>
    <p>📧 12005751@edu.gva.es</p>
    <p>
      🌐
      https://portal.edu.gva.es/iesbenigaslo
        portal.edu.gva.es/iesbenigaslo
      </a>
    </p>
  `,

  continu: `
    <h3>🚀 Continuïtat formativa</h3>
    <ul>
      <li>Curs d’especialització en Implementació de xarxes 5G</li>
      <li>Curs d’especialització en sistemes connectats a Internet (IoT)</li>
      <li>
        Accés directe a cicles superiors de la família
        d’Informàtica i Comunicacions
      </li>
    </ul>
  `,

  eixides: `
    <h3>💼 Eixides professionals</h3>
    <ul>
      <li>Tècnic instal·lador-reparador d’equips informàtics</li>
      <li>Tècnic de suport informàtic</li>
      <li>Tècnic de xarxes de dades</li>
      <li>Reparador de perifèrics</li>
      <li>Operador de sistemes i teleassistència</li>
    </ul>
  `,

  oferim: `
    <h3>🧰 Què oferim</h3>
    <ul>
      <li>Aules digitalitzades amb ordinador per alumne</li>
      <li>Dispositius IoT i impressió 3D</li>
      <li>Xarxa Wi‑Fi per a l’alumnat</li>
      <li>
        Llicències professionals gratuïtes:
        Windows, GitHub, AWS, Azure, Office 365, Cisco…
      </li>
      <li>Preparació per a certificacions oficials</li>
    </ul>
  `
};

// Eventos: clicar en una píldora carga el contenido correspondiente
pills.forEach(pill => {
  pill.addEventListener("click", () => {
    const key = pill.dataset.content;

    // Sustituye completamente el contenido central
    container.innerHTML = templates[key];
  });
});
