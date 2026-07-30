// ============================================================
// ESCAPADE ARCACHON — script principal
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- GALLERY ---------------- */
const photos = [
  { src: 'images/sejour-1.jpg', cat: 'sejour', alt: 'Séjour, canapé et coin repas', size: 'wide' },
  { src: 'images/sejour-2.jpg', cat: 'sejour', alt: 'Salon lumineux avec poutre en bois', size: 'tall' },
  { src: 'images/sejour-3.jpg', cat: 'sejour', alt: "Séjour ouvert sur la cuisine", size: '' },
  { src: 'images/sejour-4.jpg', cat: 'sejour', alt: 'Coin cuisine et repas', size: '' },
  { src: 'images/sejour-5.jpg', cat: 'sejour', alt: 'Pièce à vivre, cuisine ouverte et poutres apparentes', size: 'wide' },
  { src: 'images/sejour-6.jpg', cat: 'sejour', alt: 'Cuisine équipée', size: '' },
  { src: 'images/sejour-7.jpg', cat: 'sejour', alt: 'Cuisine et séjour', size: '' },
  { src: 'images/sejour-8.jpg', cat: 'sejour', alt: 'Cuisine, plan de travail', size: '' },
  { src: 'images/chambre-1.jpg', cat: 'chambre', alt: 'Chambre avec tête de lit terracotta', size: 'tall' },
  { src: 'images/chambre-2.jpg', cat: 'chambre', alt: 'Chambre cosy', size: '' },
  { src: 'images/chambre-3.jpg', cat: 'chambre', alt: 'Chambre esprit bord de mer', size: '' },
  { src: 'images/chambre-4.jpg', cat: 'chambre', alt: 'Chambre lumineuse', size: '' },
  { src: 'images/chambre-5.jpg', cat: 'chambre', alt: 'Chambre', size: 'wide' },
  { src: 'images/chambre-6.jpg', cat: 'chambre', alt: 'Chambre', size: '' },
  { src: 'images/chambre-7.jpg', cat: 'chambre', alt: 'Chambre', size: '' },
  { src: 'images/chambre-8.jpg', cat: 'chambre', alt: 'Chambre', size: '' },
  { src: 'images/chambre-9.jpg', cat: 'chambre', alt: 'Chambre', size: '' },
  { src: 'images/salle-de-bain-1.jpg', cat: 'sdb', alt: "Salle d'eau", size: 'tall' },
  { src: 'images/salle-de-bain-2.jpg', cat: 'sdb', alt: "Salle d'eau avec douche", size: '' },
  { src: 'images/terrasse-1.jpg', cat: 'exterieur', alt: 'Terrasse et coin repas extérieur', size: 'wide' },
];

const galleryGrid = document.getElementById('galleryGrid');
let currentFilter = 'all';
let currentList = [];

function renderGallery(filter){
  currentFilter = filter;
  currentList = photos.filter(p => filter === 'all' || p.cat === filter);
  galleryGrid.innerHTML = currentList.map((p, i) => `
    <figure class="${p.size}" data-index="${i}">
      <img src="${p.src}" alt="${p.alt}" loading="lazy">
    </figure>
  `).join('');
  galleryGrid.querySelectorAll('figure').forEach(fig => {
    fig.addEventListener('click', () => openLightbox(parseInt(fig.dataset.index)));
  });
}
renderGallery('all');

document.querySelectorAll('.gtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderGallery(tab.dataset.filter);
  });
});

/* ---------------- LIGHTBOX ---------------- */
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
let lbIndex = 0;

function openLightbox(i){
  lbIndex = i;
  updateLightbox();
  lightbox.classList.add('open');
}
function updateLightbox(){
  const p = currentList[lbIndex];
  lbImage.src = p.src;
  lbImage.alt = p.alt;
  lbCaption.textContent = p.alt;
}
document.getElementById('lbClose').addEventListener('click', () => lightbox.classList.remove('open'));
document.getElementById('lbPrev').addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + currentList.length) % currentList.length;
  updateLightbox();
});
document.getElementById('lbNext').addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % currentList.length;
  updateLightbox();
});
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') lightbox.classList.remove('open');
  if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
  if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
});

/* ---------------- CALENDAR ---------------- */
const calGrid = document.getElementById('calGrid');
const calLabel = document.getElementById('calLabel');
const dowNames = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
let unavailableRanges = [];
let viewDate = new Date();
viewDate.setDate(1);

function toLocalISODate(d){
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dateInRanges(d){
  const iso = toLocalISODate(d);
  return unavailableRanges.some(r => iso >= r.debut.slice(0,10) && iso <= r.fin.slice(0,10));
}

function renderCalendar(){
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  calLabel.textContent = viewDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  let html = dowNames.map(d => `<div class="cal-dow">${d}</div>`).join('');

  const firstDay = new Date(year, month, 1);
  let startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date(); today.setHours(0,0,0,0);

  for (let i = 0; i < startOffset; i++){
    html += `<div class="cal-day empty"></div>`;
  }
  for (let day = 1; day <= daysInMonth; day++){
    const d = new Date(year, month, day);
    let cls = 'cal-day';
    if (d < today) cls += ' past';
    else if (dateInRanges(d)) cls += ' unavailable';
    else cls += ' available';
    html += `<div class="${cls}">${day}</div>`;
  }
  calGrid.innerHTML = html;
}

document.getElementById('calPrev').addEventListener('click', () => {
  viewDate.setMonth(viewDate.getMonth() - 1);
  renderCalendar();
});
document.getElementById('calNext').addEventListener('click', () => {
  viewDate.setMonth(viewDate.getMonth() + 1);
  renderCalendar();
});

fetch('content/disponibilites.json')
  .then(r => r.json())
  .then(data => {
    unavailableRanges = data.sejours_indisponibles || [];
    renderCalendar();
  })
  .catch(() => { renderCalendar(); });

/* ---------------- RESERVATION FORM (Netlify) ---------------- */
const form = document.getElementById('reservationForm');
const formSuccess = document.getElementById('formSuccess');

function encode(data){
  return Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
}

form.addEventListener('submit', function(e){
  e.preventDefault();
  const formData = new FormData(form);
  const payload = {};
  formData.forEach((value, key) => payload[key] = value);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode(payload),
  })
    .then(() => {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    })
    .catch(() => {
      alert("Une erreur est survenue lors de l'envoi. Vous pouvez aussi nous écrire directement à marjorie.bonadei@gmail.com.");
    });
});
