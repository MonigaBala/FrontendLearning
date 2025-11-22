// Movies data (in production, load from movies.json)
const moviesData = [
    {id: 1, title: "Eternal Echo", poster: "https://prod5.agileticketing.net/images/user/thestate_3895/eternalechoposter2.jpg", genre: ["Drama", "Mystery"], year: 2024, duration: "2h 18m", rating: 4.5, language: "English", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 2, title: "காதல் கண் கட்டுதே ", poster: "https://wallpapercave.com/wp/wp8495040.jpg", genre: ["Romance", "Drama"], year: 2024, duration: "2h 35m", rating: 4.7, language: "Tamil", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 3, title: "जंग का मैदान", poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400", genre: ["Action", "War"], year: 2024, duration: "2h 45m", rating: 4.8, language: "Hindi", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 4, title: "Ponniyin selvan", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhatnoe6T6zbiURgbEXukMq5KnUFHVPYTzdw&s", genre: ["Thriller", "Crime"], year: 2024, duration: "2h 20m", rating: 4.6, language: "Telugu", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 5, title: "The Godfathe", poster: "https://m.media-amazon.com/images/I/81OTZtqXIIL._AC_UF894,1000_QL80_.jpg", genre: ["Horror", "Thriller"], year: 2023, duration: "1h 55m", rating: 4.2, language: "English", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 6, title: "സ്വപ്നം", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400", genre: ["Drama", "Family"], year: 2024, duration: "2h 10m", rating: 4.5, language: "Malayalam", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 7, title: "Beyond the Stars", poster: "https://w0.peakpx.com/wallpaper/854/411/HD-wallpaper-star-trek-beyond-2016-movie-poster-star-trek-thumbnail.jpg", genre: ["Sci-Fi", "Adventure"], year: 2025, duration: "2h 45m", rating: 4.8, language: "English", status: "Upcoming", trailer: "dQw4w9WgXcQ"},
    {id: 8, title: "விக்ரம் வேதா 2", poster: "https://m.media-amazon.com/images/M/MV5BN2U2YzA4ZTItODBjYy00ZmJmLThmODgtYTVjZGQ5ZmRlMGZhXkEyXkFqcGc@._V1_.jpg", genre: ["Action", "Thriller"], year: 2025, duration: "2h 30m", rating: 4.7, language: "Tamil", status: "Upcoming", trailer: "dQw4w9WgXcQ"},
    {id: 9, title: "पठान की वापसी", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400", genre: ["Action", "Spy"], year: 2025, duration: "2h 40m", rating: 4.9, language: "Hindi", status: "Upcoming", trailer: "dQw4w9WgXcQ"},
    {id: 10, title: "రాక్షస రాజ", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400", genre: ["Fantasy", "Action"], year: 2024, duration: "2h 55m", rating: 4.6, language: "Telugu", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 11, title: "Midnight Shadows", poster: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1651093498i/60894295.jpg", genre: ["Thriller", "Crime"], year: 2025, duration: "2h 15m", rating: 4.7, language: "English", status: "Upcoming", trailer: "dQw4w9WgXcQ"},
    {id: 12, title: "മൊഹബത്ത്", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400", genre: ["Romance", "Musical"], year: 2024, duration: "2h 25m", rating: 4.4, language: "Malayalam", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 13, title: "கொடும் கோடை", poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400", genre: ["Drama", "Social"], year: 2024, duration: "2h 15m", rating: 4.3, language: "Tamil", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 14, title: "धूम 4", poster: "https://images.unsplash.com/photo-1574267432644-f610c7a30bea?w=400", genre: ["Action", "Heist"], year: 2025, duration: "2h 30m", rating: 4.5, language: "Hindi", status: "Upcoming", trailer: "dQw4w9WgXcQ"},
    {id: 15, title: "The Quantum Paradox", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400", genre: ["Sci-Fi", "Mystery"], year: 2024, duration: "2h 28m", rating: 4.6, language: "English", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 16, title: "రాజు గారి గద్దె", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400", genre: ["Action", "Political"], year: 2024, duration: "2h 48m", rating: 4.7, language: "Telugu", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 17, title: "Love in Paris", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400", genre: ["Romance", "Drama"], year: 2025, duration: "1h 58m", rating: 4.3, language: "English", status: "Upcoming", trailer: "dQw4w9WgXcQ"},
    {id: 18, title: "കാലവർഷം", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400", genre: ["Drama", "Romance"], year: 2024, duration: "2h 18m", rating: 4.5, language: "Malayalam", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 19, title: "சர்க்கஸ் கும்பல்", poster: "https://images.unsplash.com/photo-1574267432644-f610c7a30bea?w=400", genre: ["Comedy", "Drama"], year: 2024, duration: "2h 22m", rating: 4.4, language: "Tamil", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 20, title: "गली का गुंडा", poster: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400", genre: ["Action", "Drama"], year: 2024, duration: "2h 35m", rating: 4.6, language: "Hindi", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 21, title: "Dragon's Legacy", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400", genre: ["Fantasy", "Adventure"], year: 2025, duration: "2h 30m", rating: 4.6, language: "English", status: "Upcoming", trailer: "dQw4w9WgXcQ"},
    {id: 22, title: "వీర తెలుగు", poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400", genre: ["Historical", "War"], year: 2024, duration: "3h 5m", rating: 4.9, language: "Telugu", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 23, title: "Silent Whispers", poster: "https://images.unsplash.com/photo-1574267432644-f610c7a30bea?w=400", genre: ["Drama", "Mystery"], year: 2024, duration: "2h 5m", rating: 4.4, language: "English", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 24, title: "കാട്ടുകഥകൾ", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400", genre: ["Adventure", "Mystery"], year: 2024, duration: "2h 12m", rating: 4.3, language: "Malayalam", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 25, title: "பெண் சக்தி", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400", genre: ["Action", "Thriller"], year: 2025, duration: "2h 28m", rating: 4.7, language: "Tamil", status: "Upcoming", trailer: "dQw4w9WgXcQ"},
    {id: 26, title: "गैंगस्टर की वापसी", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400", genre: ["Crime", "Thriller"], year: 2025, duration: "2h 42m", rating: 4.5, language: "Hindi", status: "Upcoming", trailer: "dQw4w9WgXcQ"},
    {id: 27, title: "The Last Stand", poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400", genre: ["Action", "War"], year: 2024, duration: "2h 35m", rating: 4.6, language: "English", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 28, title: "నేను నా దేశం", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400", genre: ["Drama", "Patriotic"], year: 2024, duration: "2h 40m", rating: 4.8, language: "Telugu", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 29, title: "കഥാപാത്രം", poster: "https://images.unsplash.com/photo-1574267432644-f610c7a30bea?w=400", genre: ["Drama", "Biographical"], year: 2024, duration: "2h 32m", rating: 4.6, language: "Malayalam", status: "Released", trailer: "dQw4w9WgXcQ"},
    {id: 30, title: "தீராத விலங்கு", poster: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400", genre: ["Thriller", "Action"], year: 2025, duration: "2h 25m", rating: 4.7, language: "Tamil", status: "Upcoming", trailer: "dQw4w9WgXcQ"}
];

let filteredMovies = [...moviesData];
let currentView = 'grid';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 1000, once: true });
    initializeFilters();
    renderMovies(moviesData);
    initScrollEffects();
    initThemeToggle();
});

// Initialize Filters
function initializeFilters() {
    populateGenreFilter();
    populateYearFilter();
    
    // Event listeners
    document.getElementById('searchInput').addEventListener('input', debounce(filterMovies, 300));
    document.getElementById('genreFilter').addEventListener('change', filterMovies);
    document.getElementById('yearFilter').addEventListener('change', filterMovies);
    document.getElementById('statusFilter').addEventListener('change', filterMovies);
    document.getElementById('sortFilter').addEventListener('change', filterMovies);
    
    // View toggle
    document.getElementById('gridView').addEventListener('click', () => toggleView('grid'));
    document.getElementById('listView').addEventListener('click', () => toggleView('list'));
}

// Populate Genre Filter
function populateGenreFilter() {
    const genres = new Set();
    moviesData.forEach(movie => {
        movie.genre.forEach(g => genres.add(g));
    });
    
    const select = document.getElementById('genreFilter');
    Array.from(genres).sort().forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        select.appendChild(option);
    });
}

// Populate Year Filter
function populateYearFilter() {
    const years = new Set();
    moviesData.forEach(movie => years.add(movie.year));
    
    const select = document.getElementById('yearFilter');
    Array.from(years).sort((a, b) => b - a).forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    });
}

// Updated Filter Movies Function
function filterMovies() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedGenre = document.getElementById('genreFilter').value;
    const selectedYear = document.getElementById('yearFilter').value;
    const selectedStatus = document.getElementById('statusFilter').value;
    const selectedLanguage = document.getElementById('languageFilter').value;
    const sortBy = document.getElementById('sortFilter').value;

    filteredMovies = moviesData.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchesGenre = !selectedGenre || movie.genre.includes(selectedGenre);
        const matchesYear = !selectedYear || movie.year.toString() === selectedYear;
        const matchesStatus = !selectedStatus || movie.status === selectedStatus;
        const matchesLanguage = !selectedLanguage || movie.language === selectedLanguage;

        return matchesSearch && matchesGenre && matchesYear && matchesStatus && matchesLanguage;
    });

    // Sort movies
    sortMovies(sortBy);

    // Render
    renderMovies(filteredMovies);
}


// Sort Movies
function sortMovies(sortBy) {
    switch(sortBy) {
        case 'newest':
            filteredMovies.sort((a, b) => b.year - a.year);
            break;
        case 'oldest':
            filteredMovies.sort((a, b) => a.year - b.year);
            break;
        case 'title':
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'rating':
            filteredMovies.sort((a, b) => b.rating - a.rating);
            break;
    }
}

// Render Movies
function renderMovies(movies) {
    const container = document.getElementById('moviesContainer');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    
    if (movies.length === 0) {
        container.innerHTML = '';
        noResults.classList.remove('d-none');
        resultsCount.textContent = '';
        return;
    }
    
    noResults.classList.add('d-none');
    resultsCount.textContent = `Showing ${movies.length} movie${movies.length !== 1 ? 's' : ''}`;
    
    container.innerHTML = movies.map(movie => {
        const isInWatchlist = checkWatchlist(movie.id);
        return `
            <div class="movie-card" data-aos="fade-up">
                <button class="watchlist-btn ${isInWatchlist ? 'active' : ''}" 
                        onclick="toggleWatchlist(${movie.id})"
                        title="${isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}">
                    <i class="fas fa-heart"></i>
                </button>
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span class="movie-genre">${movie.genre[0]}</span>
                        <span class="movie-year">${movie.year}</span>
                        <span class="movie-duration">${movie.duration}</span>
                    </div>
                    <div class="movie-meta">
                        <span style="color: var(--accent-gold);">
                            ${'★'.repeat(Math.floor(movie.rating))}${'☆'.repeat(5 - Math.floor(movie.rating))}
                        </span>
                        <span class="badge ${movie.status === 'Released' ? 'bg-success' : 'bg-warning'}">${movie.status}</span>
                    </div>
                    <div class="movie-actions">
                        <button class="btn-trailer" onclick="openTrailer('${movie.trailer}')">
                            <i class="fas fa-play"></i> Trailer
                        </button>
                        <button class="btn-details" onclick="window.location.href='movie-detail.html?id=${movie.id}'">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Toggle View
function toggleView(view) {
    currentView = view;
    const container = document.getElementById('moviesContainer');
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');
    
    if (view === 'grid') {
        container.className = 'movies-grid';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        container.className = 'movies-list';
        gridBtn.classList.remove('active');
        listBtn.classList.add('active');
    }
    
    renderMovies(filteredMovies);
}

// Watchlist Functions
function checkWatchlist(movieId) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    return watchlist.includes(movieId);
}

function toggleWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (watchlist.includes(movieId)) {
        watchlist = watchlist.filter(id => id !== movieId);
        showNotification('Removed from watchlist');
    } else {
        watchlist.push(movieId);
        showNotification('Added to watchlist');
    }
    
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    renderMovies(filteredMovies);
}

// Open Trailer
function openTrailer(videoId) {
    const modal = new bootstrap.Modal(document.getElementById('trailerModal'));
    const iframe = document.getElementById('trailerIframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.show();
    
    document.getElementById('trailerModal').addEventListener('hidden.bs.modal', function () {
        iframe.src = '';
    });
}

// Show Notification
function showNotification(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--accent-gold);
        color: var(--primary-dark);
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Scroll Effects
function initScrollEffects() {
    const nav = document.getElementById('mainNav');
    const scrollToTop = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        if (window.scrollY > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });
    
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const theme = localStorage.getItem('theme') || 'dark';
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.innerHTML = newTheme === 'light' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}

// Debounce Utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);