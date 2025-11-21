const ADMIN_PASSWORD = "admin123"; // simple admin password

// Fetch JSON or load from localStorage
let dishes = JSON.parse(localStorage.getItem('menuItems')) || [];

fetch('json/menu.json')
  .then(res => res.json())
  .then(data => {
    if (dishes.length === 0) dishes = data.menuItems;
    renderAll();
  })
  .catch(err => console.error(err));

const cardsContainer = document.getElementById('menuCardsContainer');
const tableBody = document.getElementById('menuTableBody');
const offersList = document.getElementById('offersList');
const searchInput = document.getElementById('searchInput');
const filtersContainer = document.querySelector('.menu-filters');

let currentFilter = 'all';

// -----------------------------
// Dynamic Filters
// -----------------------------
function renderFilters() {
  const categories = ['all', ...new Set(dishes.map(d => d.category))];
  filtersContainer.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.dataset.type = cat;
    if (cat === 'all') btn.classList.add('active');
    filtersContainer.appendChild(btn);

    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = cat;
      renderMenu();
    });
  });
}

// -----------------------------
// Render Cards & Table
// -----------------------------
function renderMenu() {
  const query = searchInput.value.toLowerCase();
  const filtered = dishes.filter(d => {
    const matchCategory = currentFilter === 'all' || d.category === currentFilter;
    const matchSearch = d.name.toLowerCase().includes(query) ||
                        d.description.toLowerCase().includes(query) ||
                        d.category.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  // Cards
  cardsContainer.innerHTML = '';
  filtered.forEach(d => {
    const card = document.createElement('div');
    card.classList.add('menu-card');
    card.innerHTML = `
      <div class="menu-card-inner">
        <img src="${d.image}" alt="${d.name}">
        <div class="badges">
          ${d.featured ? '<span class="badge featured-badge">⭐ Chef\'s Recommendation</span>' : ''}
          ${d.dishOfTheDay ? '<span class="badge dish-of-the-day-badge">🆕 Dish of the Day</span>' : ''}
          ${d.special && d.offer ? `<span class="badge special-badge">🔥 ${d.offer}</span>` : ''}
        </div>
        <div class="menu-card-content">
          <h3>${d.name}</h3>
          <p>${d.description}</p>
          <p class="price">${d.price}</p>
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);
  });

  // Table
  tableBody.innerHTML = '';
  filtered.forEach(d => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${d.name}</td><td>${d.description}</td><td>${d.price}</td>`;
    tableBody.appendChild(row);
  });

  renderOffers();
}

// -----------------------------
// Chef's Recommendations
// -----------------------------
function renderOffers() {
  offersList.innerHTML = '';
  dishes.filter(d => d.featured).forEach(d => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="offer-card">
        <img src="${d.image}" alt="${d.name}">
        <div class="offer-info">
          <h4>${d.name}</h4>
          <p>${d.description}</p>
          <p class="price">${d.price}</p>
        </div>
      </div>
    `;
    offersList.appendChild(li);
  });
}

// -----------------------------
// Search
// -----------------------------
searchInput.addEventListener('input', renderMenu);

// -----------------------------
// Admin Panel
// -----------------------------
const editBtn = document.getElementById('editMenuBtn');
const adminModal = document.getElementById('adminModal');
const adminClose = document.getElementById('adminClose');
const dishForm = document.getElementById('dishForm');
const adminTableBody = document.getElementById('adminTableBody');

editBtn.addEventListener('click', () => {
  const pass = prompt("Enter admin password:");
  if (pass === ADMIN_PASSWORD) {
    adminModal.style.display = 'flex';
    renderAdminTable();
  } else alert("Incorrect password!");
});

adminClose.addEventListener('click', () => adminModal.style.display = 'none');

// Add/Edit Dish
dishForm.addEventListener('submit', e => {
  e.preventDefault();
  const index = document.getElementById('dishIndex').value;
  const newDish = {
    name: document.getElementById('dishName').value,
    description: document.getElementById('dishDesc').value,
    price: document.getElementById('dishPrice').value,
    image: document.getElementById('dishImage').value,
    category: document.getElementById('dishCategory').value.toLowerCase(),
    featured: document.getElementById('dishFeatured').checked,
    special: document.getElementById('dishSpecial').checked,
    offer: document.getElementById('dishOffer').value,
    dishOfTheDay: document.getElementById('dishOfTheDay').checked
  };

  if (index === '') {
    dishes.push(newDish);
  } else {
    dishes[index] = newDish;
  }

  localStorage.setItem('menuItems', JSON.stringify(dishes));
  dishForm.reset();
  document.getElementById('dishIndex').value = '';
  renderAll();
  renderAdminTable();
});

// Render admin table
function renderAdminTable() {
  adminTableBody.innerHTML = '';
  dishes.forEach((d, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${d.name}</td>
      <td>${d.category}</td>
      <td>
        <button class="btn edit-dish">Edit</button>
        <button class="btn delete-dish">Delete</button>
      </td>
    `;
    adminTableBody.appendChild(row);

    row.querySelector('.edit-dish').addEventListener('click', () => {
      document.getElementById('dishIndex').value = i;
      document.getElementById('dishName').value = d.name;
      document.getElementById('dishDesc').value = d.description;
      document.getElementById('dishPrice').value = d.price;
      document.getElementById('dishImage').value = d.image;
      document.getElementById('dishCategory').value = d.category;
      document.getElementById('dishFeatured').checked = d.featured;
      document.getElementById('dishSpecial').checked = d.special;
      document.getElementById('dishOffer').value = d.offer;
      document.getElementById('dishOfTheDay').checked = d.dishOfTheDay;
    });

    row.querySelector('.delete-dish').addEventListener('click', () => {
      if (confirm(`Delete ${d.name}?`)) {
        dishes.splice(i, 1);
        localStorage.setItem('menuItems', JSON.stringify(dishes));
        renderAll();
        renderAdminTable();
      }
    });
  });
}

// -----------------------------
// Initial Render
// -----------------------------
function renderAll() {
  renderFilters();
  renderMenu();
}
