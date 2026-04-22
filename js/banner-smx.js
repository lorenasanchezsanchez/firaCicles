const items = document.querySelectorAll(".accordion-item");

items.forEach(item => {
  const header = item.querySelector(".accordion-header");
  const body = item.querySelector(".accordion-body");

  header.addEventListener("click", () => {

    // Cierra los demás
    items.forEach(i => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".accordion-body").style.maxHeight = null;
      }
    });

    // Abre o cierra el actual
    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = null;
    }
  });
});
