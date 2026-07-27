const button = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

button.addEventListener("click", function () {
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    button.classList.remove("active");
  } else {
    menu.classList.add("open");
    button.classList.add("active");
  }
});

const subbtn = document.getElementById("menu3");
const sub = document.getElementById("submenu");

subbtn.addEventListener("click", function () {
  if (sub.classList.contains("active")) {
    sub.classList.remove("active");
  } else {
    sub.classList.add("active");
  }
});

// Menü schließen bei Klick außerhalb
document.addEventListener("click", function (event) {
  const klickImMenue = menu.contains(event.target);
  const klickAufButton = button.contains(event.target);

  if (!klickImMenue && !klickAufButton) {
    menu.classList.remove("open");
    button.classList.remove("active");

    // Untermenü ebenfalls schließen
    sub.classList.remove("active");
  }
});
