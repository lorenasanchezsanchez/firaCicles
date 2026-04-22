document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("dynamic-content");
  const pills = document.querySelectorAll("[data-content]");

  // Seguridad básica
  if (!container || pills.length === 0) {
    console.error("No se han encontrado los elementos interactivos");
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
