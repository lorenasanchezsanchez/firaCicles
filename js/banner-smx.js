const container = document.getElementById("dynamic-content");
const pills = document.querySelectorAll("[data-content]");

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
            <li>FCT</li>
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
