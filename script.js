// Global variables - gue suka define di atas biar gampang track
let currentPage = 1;
let animationsEnabled = true;
let nsfwEnabled = true;
let coins = []; // array buat nyimpen data coins
let filteredCoins = []; // buat hasil search

// Dummy data - nanti ini diganti sama API real
const dummyCoins = [
    {
        id: 1,
        name: "DogeCoin Supreme",
        symbol: "DOGES",
        image: "🐕",
        marketCap: "1.2M",
        price: "$0.0023",
        change24h: "+12.5%",
        volume: "234K",
        description: "The ultimate dog coin experience"
    },
    {
        id: 2,
        name: "Moon Rocket",
        symbol: "MOON",
        image: "🚀",
        marketCap: "890K",
        price: "$0.0156",
        change24h: "-3.2%",
        volume: "156K",
        description: "To the moon and beyond"
    },
    {
        id: 3,
        name: "Pepe Gold",
        symbol: "PEPEG",
        image: "🐸",
        marketCap: "2.1M",
        price: "$0.0067",
        change24h: "+45.8%",
        volume: "567K",
        description: "Rare pepe collection token"
    },
    {
        id: 4,
        name: "Cat Vibes",
        symbol: "CATV",
        image: "🐱",
        marketCap: "450K",
        price: "$0.0012",
        change24h: "+8.9%",
        volume: "89K",
        description: "Meow your way to profits"
    },
    {
        id: 5,
        name: "Pizza Token",
        symbol: "PIZZA",
        image: "🍕",
        marketCap: "678K",
        price: "$0.0089",
        change24h: "-1.2%",
        volume: "234K",
        description: "Slice your way to success"
    },
    {
        id: 6,
        name: "Diamond Hands",
        symbol: "DIAMOND",
        image: "💎",
        marketCap: "3.4M",
        price: "$0.0234",
        change24h: "+67.3%",
        volume: "890K",
        description: "Hold tight, never let go"
    }
];

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...'); // debug log
    coins = [...dummyCoins]; // copy dummy data
    filteredCoins = [...coins];
    renderCoins();
    setupEventListeners();
    loadUserPreferences(); // load saved settings
});

// Setup event listeners - gue bikin function terpisah biar organized
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Toggle buttons
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', handleToggle);
    });
    
    // Form submission
    const createForm = document.getElementById('createCoinForm');
    if (createForm) {
        createForm.addEventListener('submit', handleCreateCoin);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('createModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCreateModal();
            }
        });
    }
}

// Debounce function - biar search ga terlalu banyak request
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

// Handle search - simple text matching
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredCoins = [...coins];
    } else {
        filteredCoins = coins.filter(coin => 
            coin.name.toLowerCase().includes(searchTerm) ||
            coin.symbol.toLowerCase().includes(searchTerm) ||
            coin.description.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1; // reset to first page
    renderCoins();
    updatePageNumber();
}

// Handle toggle switches
function handleToggle(e) {
    const button = e.target;
    const toggleType = button.getAttribute('data-toggle');
    const isOn = button.textContent === 'on';
    
    // Remove active class from siblings
    const siblings = button.parentNode.querySelectorAll('.toggle-btn');
    siblings.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Update global state
    if (toggleType === 'animations') {
        animationsEnabled = isOn;
        localStorage.setItem('animationsEnabled', isOn);
        updateAnimations();
    } else if (toggleType === 'nsfw') {
        nsfwEnabled = isOn;
        localStorage.setItem('nsfwEnabled', isOn);
        filterContent();
    }
}

// Update animations based on setting
function updateAnimations() {
    const coinCards = document.querySelectorAll('.coin-card');
    coinCards.forEach(card => {
        if (animationsEnabled) {
            card.classList.add('fade-in');
        } else {
            card.classList.remove('fade-in');
        }
    });
}

// Filter content based on NSFW setting
function filterContent() {
    // For now, just a placeholder
    // In real app, you'd filter out NSFW content
    renderCoins();
}

// Render coins to the grid
function renderCoins() {
    const grid = document.getElementById('trendingGrid');
    if (!grid) return;
    
    const coinsPerPage = 6;
    const startIndex = (currentPage - 1) * coinsPerPage;
    const endIndex = startIndex + coinsPerPage;
    const coinsToShow = filteredCoins.slice(startIndex, endIndex);
    
    grid.innerHTML = ''; // clear existing content
    
    if (coinsToShow.length === 0) {
        grid.innerHTML = '<div class="no-results">No coins found matching your search.</div>';
        return;
    }
    
    coinsToShow.forEach((coin, index) => {
        const coinCard = createCoinCard(coin, index);
        grid.appendChild(coinCard);
    });
    
    // Add animations if enabled
    if (animationsEnabled) {
        setTimeout(() => {
            const cards = grid.querySelectorAll('.coin-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100); // stagger animation
            });
        }, 50);
    }
}

// Create individual coin card - ini yang penting banget
function createCoinCard(coin, index) {
    const card = document.createElement('div');
    card.className = 'coin-card';
    
    // Determine change color
    const changeColor = coin.change24h.startsWith('+') ? '#4ecdc4' : '#ff6b6b';
    
    card.innerHTML = `
        <div class="coin-header">
            <div class="coin-image">${coin.image}</div>
            <div class="coin-info">
                <h3>${coin.name}</h3>
                <div class="coin-symbol">${coin.symbol}</div>
            </div>
        </div>
        <p class="coin-description">${coin.description}</p>
        <div class="coin-stats">
            <div class="stat-item">
                <div class="stat-value">${coin.marketCap}</div>
                <div class="stat-label">Market Cap</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${coin.price}</div>
                <div class="stat-label">Price</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" style="color: ${changeColor}">${coin.change24h}</div>
                <div class="stat-label">24h Change</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${coin.volume}</div>
                <div class="stat-label">Volume</div>
            </div>
        </div>
    `;
    
    // Add click event
    card.addEventListener('click', () => {
        showCoinDetails(coin);
    });
    
    return card;
}

// Show coin details (placeholder)
function showCoinDetails(coin) {
    alert(`Clicked on ${coin.name}\nPrice: ${coin.price}\nMarket Cap: ${coin.marketCap}`);
    // In real app, this would open a detailed view
}

// Pagination functions
function nextPage() {
    const totalPages = Math.ceil(filteredCoins.length / 6);
    if (currentPage < totalPages) {
        currentPage++;
        renderCoins();
        updatePageNumber();
        scrollToTop();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderCoins();
        updatePageNumber();
        scrollToTop();
    }
}

function updatePageNumber() {
    const pageElement = document.getElementById('currentPage');
    if (pageElement) {
        pageElement.textContent = currentPage;
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal functions
function showCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // prevent scrolling
    }
}

function closeCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset form
        const form = document.getElementById('createCoinForm');
        if (form) form.reset();
    }
}

// Handle create coin form submission
function handleCreateCoin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newCoin = {
        id: coins.length + 1,
        name: document.getElementById('coinName').value,
        symbol: document.getElementById('coinSymbol').value.toUpperCase(),
        image: "🪙", // default emoji
        marketCap: "0",
        price: "$0.001",
        change24h: "+0.0%",
        volume: "0",
        description: document.getElementById('coinDescription').value
    };
    
    // Add to coins array
    coins.unshift(newCoin); // add to beginning
    filteredCoins = [...coins];
    
    // Re-render and close modal
    renderCoins();
    closeCreateModal();
    
    // Show success message
    showNotification('Coin created successfully!', 'success');
    
    console.log('New coin created:', newCoin); // debug log
}

// Show notification (simple implementation)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: 'white',
        fontSize: '14px',
        zIndex: '9999',
        background: type === 'success' ? '#4ecdc4' : '#ff6b6b',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Load user preferences from localStorage
function loadUserPreferences() {
    const savedAnimations = localStorage.getItem('animationsEnabled');
    const savedNsfw = localStorage.getItem('nsfwEnabled');
    
    if (savedAnimations !== null) {
        animationsEnabled = savedAnimations === 'true';
        updateToggleButton('animations', animationsEnabled);
    }
    
    if (savedNsfw !== null) {
        nsfwEnabled = savedNsfw === 'true';
        updateToggleButton('nsfw', nsfwEnabled);
    }
}

// Update toggle button state
function updateToggleButton(type, isEnabled) {
    const buttons = document.querySelectorAll(`[data-toggle="${type}"]`);
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if ((isEnabled && btn.textContent === 'on') || (!isEnabled && btn.textContent === 'off')) {
            btn.classList.add('active');
        }
    });
}

// Add some utility functions that might be useful later
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function generateRandomPrice() {
    return '$' + (Math.random() * 0.1).toFixed(4);
}

function generateRandomChange() {
    const change = (Math.random() * 200 - 100).toFixed(1);
    return (change >= 0 ? '+' : '') + change + '%';
}

// Auto-refresh data every 30 seconds (placeholder)
setInterval(() => {
    console.log('Auto-refreshing data...'); // debug log
    // In real app, this would fetch new data from API
    updateRandomPrices();
}, 30000);

function updateRandomPrices() {
    coins.forEach(coin => {
        coin.price = generateRandomPrice();
        coin.change24h = generateRandomChange();
    });
    
    if (filteredCoins.length > 0) {
        renderCoins();
    }
}

// Error handling for missing elements
function safeGetElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with id '${id}' not found`);
    }
    return element;
}

// Export functions for debugging (optional)
if (typeof window !== 'undefined') {
    window.pumpApp = {
        coins,
        filteredCoins,
        currentPage,
        renderCoins,
        showCreateModal,
        closeCreateModal
    };
}
