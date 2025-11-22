// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Initialize components
    initTypewriter();
    initCounters();
    initScrollEffects();
    initThemeToggle();
    initNewsTicker();
    loadUpcomingMovies();
    loadFeaturedTalent();
    loadAwards();
    
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1000);
}

// ===========================
// TYPEWRITER EFFECT
// ===========================
function initTypewriter() {
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Creating Cinematic Masterpieces',
                'Inspiring Global Audiences',
                'Bringing Stories to Life'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
}

// ===========================
// COUNTER ANIMATION
// ===========================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const options = {
        root: null,
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                
                const countUp = new CountUp(counter, target, {
                    duration: 2,
                    separator: ',',
                    suffix: '+'
                });
                
                if (!countUp.error) {
                    countUp.start();
                }
                
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => observer.observe(counter));
}

// ===========================
// SCROLL EFFECTS
// ===========================
function initScrollEffects() {
    const nav = document.getElementById('mainNav');
    const scrollToTop = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Scroll to top button
        if (window.scrollY > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// THEME TOGGLE
// ===========================
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

// ===========================
// NEWS TICKER
// ===========================
function initNewsTicker() {
    const newsData = [
        "🎬 'Eternal Echo' wins Best Picture at International Film Awards!",
        "⭐ New thriller 'Midnight Shadows' announced for 2025 release",
        "🏆 Director Sarah Chen receives Lifetime Achievement Award",
        "🎭 'Urban Legends' surpasses $500M worldwide box office",
        "📽️ Production begins on sci-fi epic 'Beyond the Stars'"
    ];
    
    const tickerText = document.getElementById('tickerText');
    if (tickerText) {
        const newsString = newsData.join(' • ') + ' • ';
        tickerText.innerHTML = newsString + newsString; // Duplicate for seamless loop
    }
}

// ===========================
// LOAD UPCOMING MOVIES
// ===========================
function loadUpcomingMovies() {
    const moviesData = [
        {
            id: 1,
            title: "Midnight Shadows",
            poster: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400",
            genre: "Thriller",
            year: 2025,
            duration: "2h 15m",
            trailer: "dQw4w9WgXcQ"
        },
        {
            id: 2,
            title: "Beyond the Stars",
            poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
            genre: "Sci-Fi",
            year: 2025,
            duration: "2h 45m",
            trailer: "dQw4w9WgXcQ"
        },
        {
            id: 3,
            title: "Love in Paris",
            poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400",
            genre: "Romance",
            year: 2025,
            duration: "1h 58m",
            trailer: "dQw4w9WgXcQ"
        },
        {
            id: 4,
            title: "Dragon's Legacy",
            poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400",
            genre: "Fantasy",
            year: 2025,
            duration: "2h 30m",
            trailer: "dQw4w9WgXcQ"
        },
        {
            id: 5,
            title: "Urban Legends II",
            poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
            genre: "Horror",
            year: 2025,
            duration: "1h 45m",
            trailer: "dQw4w9WgXcQ"
        }
    ];
    
    const container = document.getElementById('upcomingMovies');
    if (!container) return;
    
    container.innerHTML = moviesData.map(movie => `
        <div class="swiper-slide">
            <div class="movie-card">
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span class="movie-genre">${movie.genre}</span>
                        <span class="movie-year">${movie.year}</span>
                        <span class="movie-duration">${movie.duration}</span>
                    </div>
                    <div class="movie-actions">
                        <button class="btn-trailer" onclick="openTrailer('${movie.trailer}')">
                            <i class="fas fa-play"></i> Trailer
                        </button>
                        <button class="btn-details" onclick="window.location.href='pages/movie-detail.html?id=${movie.id}'">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Initialize Swiper
    new Swiper('.upcomingSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        }
    });
}

// ===========================
// LOAD FEATURED TALENT
// ===========================
function loadFeaturedTalent() {
    const talentData = [
        {
            id: 1,
            name: "Sarah Chen",
            role: "Director",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
        },
        {
            id: 2,
            name: "Michael Torres",
            role: "Lead Actor",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
        },
        {
            id: 3,
            name: "Emily Parker",
            role: "Cinematographer",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
        },
        {
            id: 4,
            name: "David Kim",
            role: "Producer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
        }
    ];
    
    const container = document.getElementById('featuredTalent');
    if (!container) return;
    
    container.innerHTML = talentData.map(talent => `
        <div class="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${talent.id * 100}">
            <div class="talent-card" onclick="window.location.href='pages/profile.html?id=${talent.id}'">
                <div class="talent-image-container">
                    <img src="${talent.image}" alt="${talent.name}" class="talent-image">
                    <div class="talent-overlay">
                        <h4 class="talent-name">${talent.name}</h4>
                        <p class="talent-role">${talent.role}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ===========================
// LOAD AWARDS
// ===========================
function loadAwards() {
    const awardsData = [
        {
            title: "Best Picture",
            film: "Eternal Echo",
            year: 2024,
            icon: "fa-trophy"
        },
        {
            title: "Best Director",
            film: "Midnight Dreams",
            year: 2023,
            icon: "fa-award"
        },
        {
            title: "Best Cinematography",
            film: "Silent Whispers",
            year: 2024,
            icon: "fa-camera"
        },
        {
            title: "Audience Choice",
            film: "Urban Legends",
            year: 2023,
            icon: "fa-star"
        },
        {
            title: "Best Screenplay",
            film: "The Last Stand",
            year: 2024,
            icon: "fa-pen-fancy"
        }
    ];
    
    const container = document.getElementById('awardsContainer');
    if (!container) return;
    
    container.innerHTML = awardsData.map(award => `
        <div class="swiper-slide">
            <div class="award-card">
                <i class="fas ${award.icon} award-icon"></i>
                <h4 class="award-title">${award.title}</h4>
                <p class="award-film">${award.film}</p>
                <p class="award-year">${award.year}</p>
            </div>
        </div>
    `).join('');
    
    // Initialize Awards Swiper
    new Swiper('.awardsSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        }
    });
}

// ===========================
// TRAILER MODAL
// ===========================
function openTrailer(videoId) {
    const modal = new bootstrap.Modal(document.getElementById('trailerModal'));
    const iframe = document.getElementById('trailerIframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.show();
    
    document.getElementById('trailerModal').addEventListener('hidden.bs.modal', function () {
        iframe.src = '';
    });
}

// ===========================
// DEBOUNCE UTILITY
// ===========================
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

// ===========================
// LAZY LOADING IMAGES
// ===========================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// NEWSLETTER FORM
// ===========================
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        alert('Thank you for subscribing! You will receive updates at: ' + email);
        this.reset();
    }
});

// ===========================
// WATCHLIST FUNCTIONALITY
// ===========================
function addToWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert('Added to your watchlist!');
    } else {
        alert('Already in your watchlist!');
    }
}

function removeFromWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    watchlist = watchlist.filter(id => id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert('Removed from your watchlist!');
}

function isInWatchlist(movieId) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    return watchlist.includes(movieId);
}

// ===========================
// EXPORT FOR OTHER PAGES
// ===========================
window.movieProduction = {
    openTrailer,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    debounce
};