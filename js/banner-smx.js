const container = document.getElementById("dynamic-content");
const buttons = document.querySelectorAll("[data-content]");

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
          <li>Sostenibilitat</li>
          <li>Digitalització</li>
          <li>Projecte intermodular</li>
          <li>FCT</li>
        </ul>
      </div>
    </div>
  `,

  centre: `
    <h3>📍 Centre i contacte</h3>
    <p><strong>IES Benigasló</strong></p>
    <p>C/ Arcadi García, 1 · 12600 La Vall d’Uixó</p>
    <p>📞 964 738 955</p>
    <p>📧 12005751@edu.gva.es</p>
    <p>
      🌐
      <a href="https://portal.edu.gva.es/iesbenigaslo" target="_blank">
        portal.edu.gva.es/iesbenigaslo
      </a>
    </p>
  `,

  continu: `
    <h3>🚀 Continuïtat formativa</h3>
    <ul>
      <li>Curs d’especialització en Implementació de xarxes 5G</li>
      <li>Curs d’especialització en sistemes IoT</li>
      <li>Accés directe a cicles superiors d’Informàtica</li>
    </ul>
  `,

  eixides: `
    <h3>💼 Eixides professionals</h3>
    <ul>
      <li>Tècnic instal·lador-reparador</li>
      <li>Tècnic de suport informàtic</li>
      <li>Tècnic de xarxes de dades</li>
      <li>Operador de sistemes</li>
      <li>Reparador de perifèrics</li>
    </ul>
  `,

  oferim: `
    <h3>🧰 Què oferim</h3>
    <ul>
      <li>Aules digitalitzades</li>
      <li>Ordinador per alumne</li>
      <li>IoT i impressió 3D</li>
      <li>Llicències professionals (AWS, Azure, GitHub…)</li>
      <li>Preparació per a certificacions oficials</li>
    </ul>
  `
};

// Evento común
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.content;
    container.innerHTML = templates[key];
  });
});
