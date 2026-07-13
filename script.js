document.addEventListener("DOMContentLoaded", () => {
  const paintings = loadPaintings();
  renderGallery(paintings);
  const events = loadEvents();
  renderEvents(events);
  setupModal();
});

function renderGallery(paintings) {
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = paintings
    .map((painting) => {
      return `
        <article class="painting-card" data-id="${painting.id}">
          <div class="painting-image">
            <img src="${painting.image}" alt="${painting.title}" />
          </div>
          <div class="card-meta">
            <h3>${painting.title}</h3>
            <p>${painting.description}</p>
            <button class="secondary-button" data-action="open" data-id="${painting.id}">View details</button>
          </div>
        </article>
      `;
    })
    .join("");

  galleryGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action='open']");
    if (button) {
      const paintingId = Number(button.dataset.id);
      const painting = paintings.find((item) => item.id === paintingId);
      if (painting) openModal(painting);
      return;
    }

    // If user clicks the card or image, open details as well
    const card = event.target.closest(".painting-card");
    if (card) {
      const paintingId = Number(card.dataset.id);
      const painting = paintings.find((item) => item.id === paintingId);
      if (painting) openModal(painting);
    }
  });
}

function renderEvents(events) {
  const list = document.getElementById("eventsList");
  if (!list) return;

  // Sort upcoming events by date
  const sorted = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  list.innerHTML = sorted
    .map((ev) => {
      const date = new Date(ev.date);
      const dateLabel = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      return `
        <article class="event-item">
          <div class="event-date">${dateLabel}</div>
          <div class="event-body">
            <h3>${ev.title}</h3>
            <p class="muted">${ev.location}</p>
            <p class="event-desc">${ev.description}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function setupModal() {
  const modal = document.getElementById("paintingModal");
  const closeButton = document.getElementById("closeModal");
  const backdrop = modal.querySelector(".modal-backdrop");

  function close() {
    modal.classList.add("hidden");
  }

  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      close();
    }
  });
}

function openModal(painting) {
  const modal = document.getElementById("paintingModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalInquiry = document.getElementById("modalInquiry");

  modalImage.src = painting.image;
  modalImage.alt = painting.title;
  modalTitle.textContent = painting.title;
  modalDescription.textContent = painting.description;
  modalInquiry.href = `mailto:janart@example.com?subject=Inquiry%20about%20${encodeURIComponent(painting.title)}`;
  modal.classList.remove("hidden");
}
