document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("dynamic-content");
  const pills = document.querySelectorAll("[data-content]");

  if (!container || pills.length === 0) {
    console.error("Elementos no encontrados");
    return;
  }

  const templates = {

    pla: `
      <div class="panel-section">
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
      </div>
    `,

    centre: `
      <div class="panel-section">
        <h3>🏫 Centre i contacte</h3>
        <p><strong>IES Benigasló</strong></p>
        <p>C/ Arcadi García, 1 · 12600 La Vall d’Uixó</p>
        <p>📞 964 738 955</p>
        <p>📧 12005751@edu.gva.es</p>
        <p>🌐 portal.edu.gva.es/iesbenigaslo</p>
      </div>
    `,

    continu: `
      <div class="panel-section">
        <h3>🚀 Continuïtat formativa</h3>
        <ul>
          <li>Curs d’especialització en Implementació de xarxes 5G</li>
          <li>Curs d’especialització en sistemes IoT</li>
          <li>Accés directe a cicles superiors d’Informàtica</li>
        </ul>
      </div>
    `,

    eixides: `
      <div class="panel-section">
        <h3>💼 Eixides professionals</h3>
        <ul>
          <li>Tècnic instal·lador-reparador d’equips informàtics</li>
          <li>Tècnic de suport informàtic</li>
          <li>Tècnic de xarxes de dades</li>
          <li>Reparador de perifèrics</li>
          <li>Operador de sistemes i teleassistència</li>
        </ul>
      </div>
    `,

    oferim: `
      <div class="panel-section">
        <h3>🧰 Què oferim</h3>
        <ul>
          <li>Aules digitalitzades amb ordinador per alumne</li>
          <li>Dispositius IoT i impressió 3D</li>
          <li>Xarxa Wi‑Fi per a l’alumnat</li>
          <li>Llicències professionals (AWS, Azure, GitHub…)</li>
          <li>Preparació per a certificacions oficials</li>
        </ul>
      </div>
    `
  };

  // INTERACCIÓN CON PÍLDORAS
  pills.forEach(pill => {
    pill.addEventListener("click", () => {

      // Botón activo
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const key = pill.dataset.content;

      // Animación de salida
      container.classList.add("hide");

      setTimeout(() => {
        container.innerHTML = templates[key];
        container.classList.remove("hide");
      }, 200);
    });
  });

  // CARGA INICIAL (impactante)
  pills[0].click();

});
