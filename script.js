const tabs = document.querySelectorAll(".tabs button");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    contents.forEach(c => c.classList.remove("active"));
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Mostrar la primera pestaña por defecto
contents[0].classList.add("active");
