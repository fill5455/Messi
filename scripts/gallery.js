(() => {
  "use strict";
  const gallery = document.querySelector(".gallery-grid");
  const dialog = document.querySelector("#photo-dialog");
  if (!gallery || !dialog) return;

  const items = [...gallery.querySelectorAll("[data-gallery-item]")];
  const filters = [...document.querySelectorAll("[data-gallery-filter]")];
  const count = document.querySelector("#gallery-count");
  const image = document.querySelector("#photo-image");
  const caption = document.querySelector("#photo-caption");
  const position = document.querySelector("#photo-position");
  const closeButton = document.querySelector("#photo-close");
  const previousButton = document.querySelector("#photo-prev");
  const nextButton = document.querySelector("#photo-next");
  let visibleItems = items;
  let activeIndex = 0;
  let opener = null;

  function updateCount() {
    const n = visibleItems.length;
    count.textContent = n + (n === 1 ? " fotografia" : " fotografie");
  }

  function applyFilter(category, selectedButton) {
    visibleItems = items.filter((item) => category === "all" || item.dataset.category === category);
    items.forEach((item) => {
      item.hidden = !visibleItems.includes(item);
    });
    filters.forEach((button) => button.setAttribute("aria-pressed", String(button === selectedButton)));
    updateCount();
  }

  function showItem(index) {
    if (!visibleItems.length) return;
    activeIndex = (index + visibleItems.length) % visibleItems.length;
    const item = visibleItems[activeIndex];
    const source = item.querySelector("img");
    const title = item.querySelector("figcaption strong");
    image.onerror = () => {
      const current = image.getAttribute("src") || "";
      const alternate = current.replace(/\.(jpg|webp)(?=\?|$)/, (_, ext) => ext === "jpg" ? ".webp" : ".jpg");
      if (alternate !== current && image.dataset.fallback !== "tried") {
        image.dataset.fallback = "tried";
        image.src = alternate;
      } else {
        image.alt = "Immagine non disponibile";
      }
    };
    image.dataset.fallback = "";
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    caption.textContent = title ? title.textContent : source.alt;
    position.textContent = (activeIndex + 1) + " / " + visibleItems.length;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.galleryFilter, button));
  });

  gallery.addEventListener("click", (event) => {
    const button = event.target.closest(".gallery-open");
    if (!button) return;
    const item = button.closest("[data-gallery-item]");
    const index = visibleItems.indexOf(item);
    if (index < 0) return;
    opener = button;
    showItem(index);
    dialog.showModal();
    closeButton.focus();
  });

  previousButton.addEventListener("click", () => showItem(activeIndex - 1));
  nextButton.addEventListener("click", () => showItem(activeIndex + 1));
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => opener?.focus());
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showItem(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showItem(activeIndex + 1);
    }
  });

  applyFilter("all", filters.find((button) => button.dataset.galleryFilter === "all"));
})();

