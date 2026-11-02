const lightbox = document.getElementById("lightbox");
let aktuellerIndex = 0;
function zeigeBild(index) {
  const alleWrapper = document.querySelectorAll(".img_wrapper");
  const bild = alleWrapper[index].querySelector("img");

  lightbox.innerHTML = `
  
    <div class="schliessen">&times;</div>
    <button class="letztesBild spacel bildpfeil"><img
            src="./img/arrow_circle_left_100dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg"
            alt="" /></button>
    <img src="${bild.src}" alt="">
      <button class="naechstesBild spacer bildpfeil"><img
            src="./img/arrow_circle_right_100dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg"
            alt="" /></button>
    <div class="bildZaehler">${index + 1} / ${alleWrapper.length}</div>
  `;
  const naechstes = lightbox.querySelector(".naechstesBild");
  naechstes.addEventListener("click", function () {
    if (aktuellerIndex < alleWrapper.length - 1) {
      aktuellerIndex++;
      zeigeBild(aktuellerIndex);
    }
  });

  const letztes = lightbox.querySelector(".letztesBild");
  letztes.addEventListener("click", function () {
    if (aktuellerIndex > 0) {
      aktuellerIndex--;
      zeigeBild(aktuellerIndex);
    }
  });
}

document.addEventListener("click", function (evt) {
  const bildWrapper = evt.target.closest(".img_wrapper");
  if (!bildWrapper) return;

  const alleWrapper = document.querySelectorAll(".img_wrapper");

  aktuellerIndex = [...alleWrapper].indexOf(bildWrapper);

  zeigeBild(aktuellerIndex);

  lightbox.classList.add("zeigen");
});

lightbox.addEventListener("click", function (evt) {
  if (evt.target === lightbox || evt.target.classList.contains("schliessen")) {
    lightbox.classList.remove("zeigen");
    lightbox.innerHTML = "";
  }
});
