;(() => {
  const gallery = document.querySelector(".fg-gallery")
  const lightbox = document.querySelector("#fg-lightbox")

  // Abbrechen, wenn die Galerie auf dieser Seite nicht existiert.
  if (!gallery || !lightbox) return

  // DOM-Elemente auswählen
  const filterButtons = [...gallery.querySelectorAll(".fg-gallery__filter")]

  const grid = gallery.querySelector(".fg-gallery__grid")

  const emptyMessage = gallery.querySelector(".fg-gallery__empty")

  const imageElement = lightbox.querySelector(".fg-lightbox__image")

  const captionElement = lightbox.querySelector(".fg-lightbox__caption")

  const counterElement = lightbox.querySelector(".fg-lightbox__counter")

  const closeButtons = lightbox.querySelectorAll("[data-lightbox-close]")

  const previousButton = lightbox.querySelector(".fg-lightbox__nav--prev")

  const nextButton = lightbox.querySelector(".fg-lightbox__nav--next")

  let visibleItems = []
  let currentIndex = 0
  let lastFocusedElement = null

  function getAllItems() {
    return [...grid.querySelectorAll(".fg-gallery__item")]
  }

  function applyFilter(filter) {
    const items = getAllItems()

    items.forEach((item) => {
      const category = item.dataset.category

      item.hidden = filter !== "all" && category !== filter
    })

    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter

      button.classList.toggle("is-active", active)

      button.setAttribute("aria-pressed", String(active))
    })

    visibleItems = items.filter((item) => !item.hidden)

    emptyMessage.hidden = visibleItems.length > 0
  }

  function showImage(index) {
    if (!visibleItems.length) return

    currentIndex = (index + visibleItems.length) % visibleItems.length

    const item = visibleItems[currentIndex]

    const thumbnail = item.querySelector("img")

    const fullImage = item.dataset.full || thumbnail.src

    imageElement.src = fullImage

    imageElement.alt = thumbnail.alt || ""

    captionElement.textContent = item.dataset.caption || thumbnail.alt || ""

    counterElement.textContent = `${currentIndex + 1} / ${visibleItems.length}`
  }

  function openLightbox(item) {
    visibleItems = getAllItems().filter((entry) => !entry.hidden)

    currentIndex = visibleItems.indexOf(item)

    if (currentIndex < 0) return

    lastFocusedElement = document.activeElement

    showImage(currentIndex)

    lightbox.classList.add("is-open")

    lightbox.setAttribute("aria-hidden", "false")

    document.body.classList.add("fg-lightbox-open")

    lightbox.querySelector(".fg-lightbox__close").focus()
  }

  function closeLightbox() {
    if (!lightbox.classList.contains("is-open")) return

    lightbox.classList.remove("is-open")

    lightbox.setAttribute("aria-hidden", "true")

    document.body.classList.remove("fg-lightbox-open")

    imageElement.src = ""

    if (lastFocusedElement) {
      lastFocusedElement.focus()
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter)
    })
  })

  grid.addEventListener("click", (event) => {
    const item = event.target.closest(".fg-gallery__item")

    if (item && !item.hidden) {
      openLightbox(item)
    }
  })

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeLightbox)
  })

  previousButton.addEventListener("click", () => {
    showImage(currentIndex - 1)
  })

  nextButton.addEventListener("click", () => {
    showImage(currentIndex + 1)
  })

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return

    if (event.key === "Escape") {
      closeLightbox()
    }

    if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1)
    }

    if (event.key === "ArrowRight") {
      showImage(currentIndex + 1)
    }
  })

  applyFilter("all")
})()
