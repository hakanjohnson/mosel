(function () {
  const galleryCards = document.querySelectorAll(".card");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.getElementById("modalClose");

  galleryCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const src =
        card.getAttribute("data-src") || card.querySelector("img").src;
      modalImg.src = src;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  // "Mehr anzeigen" Platzhalter (hier nur visuell)
  const moreBtn = document.getElementById("moreBtn");
  moreBtn.addEventListener("click", () => {
    // Platzhalter: man kann hier weitere Bilder per AJAX / Fetch laden.
    alert("Mehr Bilder laden (hier Ihre Implementierung einfügen).");
  });
})();

//Update: 09.08.2026 - verbesserte Galerie;
//Bilder Array mit allen Bildern;
const bilder = [
  "./img/PXL_20251004_184537077.JPG",
  "./img/PXL_20251004_184636252.JPG",
];

//aktueller Index als Variable;

//Verbindung zwischen JS und HTML herstellen;
const lightboxBild = document.querySelector("#lightbox");
