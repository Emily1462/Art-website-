document.addEventListener("DOMContentLoaded", () => {
  const loginPanel = document.getElementById("loginPanel");
  const adminPanel = document.getElementById("adminPanel");
  const paintingList = document.getElementById("paintingList");
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  const adminMessage = document.getElementById("adminMessage");
  const addPaintingButton = document.getElementById("addPainting");
  const logoutButton = document.getElementById("logout");
  const newPaintingForm = document.getElementById("newPaintingForm");
  const saveNewPaintingButton = document.getElementById("saveNewPainting");
  const cancelNewPaintingButton = document.getElementById("cancelNewPainting");
  const newTitleInput = document.getElementById("newTitle");
  const newImageInput = document.getElementById("newImage");
  const newFileInput = document.getElementById("newFile");
  const newDescriptionInput = document.getElementById("newDescription");

  function renderAdmin() {
    const paintings = loadPaintings();
    paintingList.innerHTML = paintings
      .map(
        (painting) => `
        <article class="admin-card">
          <div class="painting-image">
            <img src="${painting.image}" alt="${painting.title}" />
          </div>
          <div class="form-field">
            <label for="title-${painting.id}">Title</label>
            <input id="title-${painting.id}" type="text" value="${painting.title}" />
          </div>
          <div class="form-field">
            <label for="image-${painting.id}">Image URL</label>
            <input id="image-${painting.id}" type="text" value="${painting.image}" />
          </div>
          <div class="form-field">
            <label for="file-${painting.id}">Upload local image</label>
            <input id="file-${painting.id}" type="file" accept="image/*" />
          </div>
          <div class="form-field">
            <label for="description-${painting.id}">Description</label>
            <textarea id="description-${painting.id}">${painting.description}</textarea>
          </div>
          <div class="admin-actions">
            <button class="save-button" data-action="save" data-id="${painting.id}">Save</button>
            <button class="delete-button" data-action="delete" data-id="${painting.id}">Delete</button>
          </div>
        </article>
      `
      )
      .join("");
  }

  function showLogin() {
    loginPanel.classList.remove("hidden");
    adminPanel.classList.add("hidden");
    loginMessage.classList.add("hidden");
  }

  function showAdmin() {
    loginPanel.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    renderAdmin();
  }

  function showStatus(message, element) {
    element.textContent = message;
    element.classList.remove("hidden");
    setTimeout(() => {
      element.classList.add("hidden");
    }, 3000);
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value.trim();
    if (checkPassword(password)) {
      setAuthState(true);
      passwordInput.value = "";
      showAdmin();
      showStatus("Signed in successfully.", adminMessage);
    } else {
      showStatus("Incorrect password. Try again.", loginMessage);
    }
  });

  addPaintingButton.addEventListener("click", () => {
    // Show the inline new painting form
    if (newPaintingForm) newPaintingForm.classList.remove("hidden");
    if (addPaintingButton) addPaintingButton.disabled = true;
  });

  cancelNewPaintingButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (newPaintingForm) newPaintingForm.classList.add("hidden");
    if (addPaintingButton) addPaintingButton.disabled = false;
    // clear fields
    newTitleInput.value = "";
    newImageInput.value = "";
    newFileInput.value = "";
    newDescriptionInput.value = "";
  });

  saveNewPaintingButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = newTitleInput.value.trim() || "Untitled painting";
    const description = newDescriptionInput.value.trim() || "No description provided.";
    const paintings = loadPaintings();
    const template = createPaintingTemplate();

    const file = newFileInput.files && newFileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        template.title = title;
        template.description = description;
        template.image = reader.result;
        paintings.push(template);
        savePaintings(paintings);
        renderAdmin();
        if (newPaintingForm) newPaintingForm.classList.add("hidden");
        if (addPaintingButton) addPaintingButton.disabled = false;
        newTitleInput.value = "";
        newImageInput.value = "";
        newFileInput.value = "";
        newDescriptionInput.value = "";
        showStatus("New painting saved.", adminMessage);
      };
      reader.readAsDataURL(file);
    } else {
      template.title = title;
      template.description = description;
      template.image = newImageInput.value.trim() || template.image;
      paintings.push(template);
      savePaintings(paintings);
      renderAdmin();
      if (newPaintingForm) newPaintingForm.classList.add("hidden");
      if (addPaintingButton) addPaintingButton.disabled = false;
      newTitleInput.value = "";
      newImageInput.value = "";
      newFileInput.value = "";
      newDescriptionInput.value = "";
      showStatus("New painting saved.", adminMessage);
    }
  });

  logoutButton.addEventListener("click", () => {
    setAuthState(false);
    showLogin();
    showStatus("Logged out.", loginMessage);
  });

  function commitPaintingSave(paintings, painting, message) {
    savePaintings(paintings);
    renderAdmin();
    showStatus(message, adminMessage);
  }

  paintingList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const action = button.dataset.action;
    const id = Number(button.dataset.id);
    const paintings = loadPaintings();
    const painting = paintings.find((item) => item.id === id);
    if (!painting) return;

    if (action === "save") {
      const titleInput = document.getElementById(`title-${id}`);
      const imageInput = document.getElementById(`image-${id}`);
      const fileInput = document.getElementById(`file-${id}`);
      const descriptionInput = document.getElementById(`description-${id}`);

      painting.title = titleInput.value.trim() || "Untitled painting";
      painting.description = descriptionInput.value.trim() || "No description provided.";

      const file = fileInput.files && fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          painting.image = reader.result;
          commitPaintingSave(paintings, painting, "Painting updated successfully.");
        };
        reader.readAsDataURL(file);
      } else {
        painting.image = imageInput.value.trim() || painting.image;
        commitPaintingSave(paintings, painting, "Painting updated successfully.");
      }
    }

    if (action === "delete") {
      const ok = confirm("Are you sure you want to delete this painting?");
      if (!ok) return;
      const filtered = paintings.filter((item) => item.id !== id);
      savePaintings(filtered);
      renderAdmin();
      showStatus("Painting deleted.", adminMessage);
    }
  });

  if (getAuthState()) {
    showAdmin();
  } else {
    showLogin();
  }
});
