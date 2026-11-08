document.addEventListener("DOMContentLoaded", () => {
  const categories = {
    felgen: {
      folder: "felgen",
      prefix: "felge",
      count: 54,
      title: "Felgen",
    },

    motorrad: {
      folder: "motorrad",
      prefix: "motorrad",
      count: 10,
      title: "Motorrad",
    },

    auspuff: {
      folder: "auspuff",
      prefix: "auspuff",
      count: 10,
      title: "Auspuffanlage",
    },
  }

  const images = Object.entries(categories).flatMap(([category, settings]) => {
    return Array.from({ length: settings.count }, (_, index) => {
      const number = String(index + 1).padStart(2, "0")

      return {
        src: `img/galerie/${settings.folder}/${settings.prefix}-${number}.jpg`,
        category,
        title: `${settings.title} ${number}`,
        alt: `${settings.title} ${number}`,
      }
    })
  })

  const gallery = document.querySelector(".fg-gallery")
  const lightbox = document.querySelector("#fg-lightbox")

  if (!gallery || !lightbox) return

  const grid = gallery.querySelector("#fg-gallery-grid")

  const filterButtons = [...gallery.querySelectorAll(".fg-gallery__filter")]

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

  function renderGallery() {
    grid.innerHTML = ""

    images.forEach((image, index) => {
      const button = document.createElement("button")

      button.className = "fg-gallery__item"
      button.type = "button"
      button.dataset.category = image.category
      button.dataset.index = index
      button.setAttribute("aria-label", `${image.title} vergrößern`)

      const img = document.createElement("img")

      img.src = image.src
      img.alt = image.alt
      img.loading = "lazy"
      img.decoding = "async"

      const caption = document.createElement("span")

      caption.className = "fg-gallery__item-caption"
      caption.textContent = image.title

      button.append(img, caption)

      grid.appendChild(button)
    })

    applyFilter("all")
  }

  function applyFilter(filter) {
    const items = [...grid.querySelectorAll(".fg-gallery__item")]

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

    const imageIndex = Number(item.dataset.index)

    const image = images[imageIndex]

    imageElement.src = image.src
    imageElement.alt = image.alt

    captionElement.textContent = image.title

    counterElement.textContent = `${currentIndex + 1} / ${visibleItems.length}`
  }

  function openLightbox(item) {
    visibleItems = [...grid.querySelectorAll(".fg-gallery__item:not([hidden])")]

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
    imageElement.alt = ""

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

  renderGallery()
})
