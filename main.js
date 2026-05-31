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
  if (submenu.classList.contains("active")) {
    submenu.classList.remove("active");
  } else {
    submenu.classList.add("active");
  }
});
