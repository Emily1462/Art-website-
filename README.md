# JanArt Gallery

This workspace contains a local art exhibition website for Janart with both:

- `index.html` — public gallery and contact page
- `admin.html` — admin panel for updating paintings and descriptions
- `styles.css` — shared responsive styling
- `script.js` — public gallery rendering logic
- `data.js` — shared painting data and storage helpers
- `admin.js` — local admin login and edit behavior

## How it works

- The user-facing gallery loads artwork from browser storage.
- The admin panel stores updates in `localStorage`, so edits persist locally.
- The gallery page can be opened directly and the admin page is available at `admin.html`.

## Getting started

1. Open `index.html` in your browser to view the gallery.
2. Open `admin.html` to log in and edit paintings.
3. Use the admin panel to change titles, upload new artwork images, update descriptions, or add new paintings.

## Admin password

- Password: `janartadmin`

## Tips

- In `admin.html`, use the file upload input to load a local image for a painting, or paste a URL into the Image URL field.
- Open `index.html` and click any painting card to view details and send an inquiry.
- After saving changes in the admin panel, refresh `index.html` if it was already open to see the latest collection.
