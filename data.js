const JANART_STORAGE_KEY = "janartPaintings";
const JANART_AUTH_KEY = "janartAdminAuth";
const JANART_ADMIN_PASSWORD = "janartadmin";

const defaultPaintings = [
  {
    id: 1,
    title: "Studio Morning Light - Oil on Canvas",
    image: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20640%20480'%3E%3Cdefs%3E%3Cfilter%20id='oil'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.02'%20numOctaves='5'%20result='noise'/%3E%3CfeDisplacementMap%20in='SourceGraphic'%20in2='noise'%20scale='20'/%3E%3C/filter%3E%3ClinearGradient%20id='a'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%23fef3c7'/%3E%3Cstop%20offset='0.5'%20stop-color='%23fde047'/%3E%3Cstop%20offset='1'%20stop-color='%23f59e0b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='100%25'%20height='100%25'%20fill='url(%23a)'%20filter='url(%23oil)'/%3E%3Cg%20opacity='0.3'%3E%3Ccircle%20cx='100'%20cy='100'%20r='80'%20fill='%23fbbf24'/%3E%3Ccircle%20cx='550'%20cy='400'%20r='60'%20fill='%23d97706'/%3E%3C/g%3E%3Ctext%20x='50%25'%20y='52%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-size='32'%20fill='%23541f0f'%20font-weight='bold'%3EOil%20on%20Canvas%3C/text%3E%3C/svg%3E",
    description: "A masterful oil painting capturing warm sunlight spilling through the artist's studio windows, with rich impasto technique and luminous glazing."
  },
  {
    id: 2,
    title: "Blue Horizon - Oil on Canvas",
    image: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20640%20480'%3E%3Cdefs%3E%3Cfilter%20id='oil'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.02'%20numOctaves='5'%20result='noise'/%3E%3CfeDisplacementMap%20in='SourceGraphic'%20in2='noise'%20scale='20'/%3E%3C/filter%3E%3ClinearGradient%20id='a'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%237c3aed'/%3E%3Cstop%20offset='0.5'%20stop-color='%234d7cff'/%3E%3Cstop%20offset='1'%20stop-color='%23296dd3'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='100%25'%20height='100%25'%20fill='url(%23a)'%20filter='url(%23oil)'/%3E%3Cg%20opacity='0.2'%3E%3Crect%20x='0'%20y='300'%20width='100%25'%20height='180'%20fill='%23000080'/%3E%3C/g%3E%3Ctext%20x='50%25'%20y='52%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-size='32'%20fill='%23ffffff'%20font-weight='bold'%3EOil%20on%20Canvas%3C/text%3E%3C/svg%3E",
    description: "A striking oil painting with bold, expressive brushstrokes depicting a dramatic coastal landscape with deep blues and layered horizon lines."
  },
  {
    id: 3,
    title: "Autumn Bloom - Oil on Canvas",
    image: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20640%20480'%3E%3Cdefs%3E%3Cfilter%20id='oil'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.02'%20numOctaves='5'%20result='noise'/%3E%3CfeDisplacementMap%20in='SourceGraphic'%20in2='noise'%20scale='20'/%3E%3C/filter%3E%3ClinearGradient%20id='a'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%23fbbf24'/%3E%3Cstop%20offset='0.5'%20stop-color='%23f97316'/%3E%3Cstop%20offset='1'%20stop-color='%23c2410c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='100%25'%20height='100%25'%20fill='url(%23a)'%20filter='url(%23oil)'/%3E%3Cg%20opacity='0.25'%3E%3Ccircle%20cx='320'%20cy='240'%20r='100'%20fill='%23dc2626'/%3E%3Ccircle%20cx='150'%20cy='150'%20r='70'%20fill='%23ea580c'/%3E%3Ccircle%20cx='500'%20cy='350'%20r='80'%20fill='%238b0000'/%3E%3C/g%3E%3Ctext%20x='50%25'%20y='52%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-size='32'%20fill='%23ffffff'%20font-weight='bold'%3EOil%20on%20Canvas%3C/text%3E%3C/svg%3E",
    description: "An expressive oil painting celebrating autumn florals with warm ochres, deep reds, and rich textural elements created with confident brushwork."
  }
];

function loadPaintings() {
  const stored = localStorage.getItem(JANART_STORAGE_KEY);
  if (!stored) {
    savePaintings(defaultPaintings);
    return [...defaultPaintings];
  }
  try {
    return JSON.parse(stored) || [...defaultPaintings];
  } catch (error) {
    console.warn("Failed to parse paintings storage, restoring defaults.", error);
    savePaintings(defaultPaintings);
    return [...defaultPaintings];
  }
}

function savePaintings(paintings) {
  localStorage.setItem(JANART_STORAGE_KEY, JSON.stringify(paintings));
}

function getAuthState() {
  return localStorage.getItem(JANART_AUTH_KEY) === "true";
}

function setAuthState(value) {
  localStorage.setItem(JANART_AUTH_KEY, value ? "true" : "false");
}

function checkPassword(password) {
  return password === JANART_ADMIN_PASSWORD;
}

function createPaintingTemplate() {
  const paintings = loadPaintings();
  const nextId = paintings.length ? Math.max(...paintings.map((item) => item.id)) + 1 : 1;
  return {
    id: nextId,
    title: "New painting",
    image: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20640%20480'%3E%3Cdefs%3E%3ClinearGradient%20id='a'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%239ca3af'/%3E%3Cstop%20offset='1'%20stop-color='%236b7280'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='100%25'%20height='100%25'%20fill='url(%23a)'/%3E%3Ctext%20x='50%25'%20y='52%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-size='32'%20fill='%23ffffff'%3ENew%20Painting%3C/text%3E%3C/svg%3E",
    description: "Update the title, image URL, and description for this painting."
  };
}
