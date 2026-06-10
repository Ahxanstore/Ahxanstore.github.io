// ===== LOCAL STORAGE KEYS =====
const STORAGE_KEYS = {
    USER: 'ahxan_user',
    IDS: 'ahxan_fire_ids',
    USERS: 'ahxan_users',
    ORDERS: 'ahxan_orders',
    ADMIN_USER: 'ahxan_admin_user'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// Initialize App
function initializeApp() {
    // Check if user is logged in
    const currentUser = localStorage.getItem(STORAGE_KEYS.USER);
    updateAuthUI(currentUser);
    
    // Check if admin
    if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.isAdmin) {
            showAdminButton();
        }
    }
    
    // Load data if on admin page
    if (window.location.pathname.includes('admin.html')) {
        loadAdminData();
    }
    
    // Load store if on store page
    if (window.location.pathname.includes('store.html')) {
        loadStore();
    }
    
    // Load profile if on profile page
    if (window.location.pathname.includes('profile.html')) {
        loadUserProfile();
    }
}

// ===== AUTHENTICATION FUNCTIONS =====
function updateAuthUI(user) {
    const authButtons = document.getElementById('authButtons');
    const userButtons = document.getElementById('userButtons');
    
    if (user) {
        if (authButtons) authButtons.style.display = 'none';
        if (userButtons) userButtons.style.display = 'flex';
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userButtons) userButtons.style.display = 'none';
    }
}

function showAdminButton() {
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) adminBtn.style.display = 'flex';
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
        });
    });
    
    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutBtnProfile = document.getElementById('logoutBtnProfile');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (logoutBtnProfile) logoutBtnProfile.addEventListener('click', logout);
    if (adminLogoutBtn) adminLogoutBtn.addEventListener('click', logout);
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
    
    // Google Login/Register
    const googleLogin = document.getElementById('googleLogin');
    const googleRegister = document.getElementById('googleRegister');
    
    if (googleLogin) googleLogin.addEventListener('click', () => {
        alert('🔐 Google Sign-In feature coming soon!');
    });
    
    if (googleRegister) googleRegister.addEventListener('click', () => {
        alert('🔐 Google Sign-Up feature coming soon!');
    });
    
    // Search on Store
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterStore);
    }
    
    // Admin ID Upload Form
    const idUploadForm = document.getElementById('idUploadForm');
    if (idUploadForm) {
        idUploadForm.addEventListener('submit', handleIdUpload);
    }
    
    // Admin Settings Form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettingsSave);
    }
}

// ===== AUTHENTICATION HANDLERS =====
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (in real app, this would be backend)
    if (email && password) {
        // Check if admin credentials
        if (email === 'admin@ahxanstore.com' && password === 'admin123') {
            const adminUser = {
                email,
                username: 'admin',
                name: 'Admin User',
                isAdmin: true,
                joinDate: new Date().toLocaleDateString()
            };
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(adminUser));
            alert('✅ Admin login successful!');
            window.location.href = 'admin.html';
        } else {
            const user = {
                email,
                username: email.split('@')[0],
                name: email.split('@')[0],
                isAdmin: false,
                joinDate: new Date().toLocaleDateString(),
                purchases: 0
            };
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
            alert('✅ Login successful!');
            window.location.href = 'index.html';
        }
    } else {
        alert('❌ Please fill in all fields');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('❌ Passwords do not match');
        return;
    }
    
    const user = {
        email,
        username,
        name: fullname,
        isAdmin: false,
        joinDate: new Date().toLocaleDateString(),
        purchases: 0
    };
    
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    alert('✅ Registration successful! Welcome to Ahxan FF Store!');
    window.location.href = 'profile.html';
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    alert('👋 Logged out successfully!');
    window.location.href = 'index.html';
}

// ===== CONTACT FORM =====
function handleContact(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    alert(`✅ Thank you ${name}!\n\nYour message has been sent. We'll respond to ${email} soon.`);
    e.target.reset();
}

// ===== ADMIN PANEL FUNCTIONS =====
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function showUploadForm() {
    document.getElementById('uploadForm').style.display = 'block';
    document.getElementById('uploadForm').scrollIntoView({ behavior: 'smooth' });
}

function hideUploadForm() {
    document.getElementById('uploadForm').style.display = 'none';
    document.getElementById('idUploadForm').reset();
}

function handleIdUpload(e) {
    e.preventDefault();
    
    const fireId = document.getElementById('fireId').value;
    const playerName = document.getElementById('playerName').value;
    const level = document.getElementById('level').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    
    // Get existing IDs
    let ids = JSON.parse(localStorage.getItem(STORAGE_KEYS.IDS) || '[]');
    
    // Create new ID object
    const newId = {
        id: Date.now(),
        fireId,
        playerName,
        level,
        price,
        description,
        image: image || 'https://via.placeholder.com/300x200?text=Fire+ID',
        uploadedAt: new Date().toLocaleDateString(),
        status: 'active'
    };
    
    ids.push(newId);
    localStorage.setItem(STORAGE_KEYS.IDS, JSON.stringify(ids));
    
    alert('✅ Fire ID uploaded successfully!');
    hideUploadForm();
    document.getElementById('idUploadForm').reset();
    loadAdminData();
    loadStore();
}

function deleteId(idId) {
    if (confirm('Are you sure you want to delete this ID?')) {
        let ids = JSON.parse(localStorage.getItem(STORAGE_KEYS.IDS) || '[]');
        ids = ids.filter(id => id.id !== idId);
        localStorage.setItem(STORAGE_KEYS.IDS, JSON.stringify(ids));
        alert('✅ ID deleted successfully!');
        loadAdminData();
        loadStore();
    }
}

function loadAdminData() {
    // Check if user is logged in as admin
    const currentUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (!currentUser || !JSON.parse(currentUser).isAdmin) {
        alert('❌ Admin access only!');
        window.location.href = 'login.html';
        return;
    }
    
    // Load statistics
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEYS.IDS) || '[]');
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    
    document.getElementById('totalIds').textContent = ids.length;
    document.getElementById('totalUsers').textContent = users.length + 1; // +1 for current user
    document.getElementById('totalOrders').textContent = orders.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.amount), 0);
    document.getElementById('totalRevenue').textContent = '$' + totalRevenue.toFixed(2);
    
    // Load IDs table
    const idsTableBody = document.getElementById('idsTableBody');
    if (idsTableBody) {
        if (ids.length === 0) {
            idsTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                        No IDs uploaded yet. <a href="#" onclick="showUploadForm()" style="color: var(--primary-color);">Upload one now</a>
                    </td>
                </tr>
            `;
        } else {
            idsTableBody.innerHTML = ids.map(id => `
                <tr>
                    <td>${id.fireId}</td>
                    <td>${id.playerName}</td>
                    <td>${id.level}</td>
                    <td>$${id.price}</td>
                    <td><span style="color: var(--primary-color);">● ${id.status}</span></td>
                    <td>
                        <button class="btn-edit" onclick="editId(${id.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteId(${id.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

function editId(idId) {
    alert('✏️ Edit functionality coming soon!');
}

function handleSettingsSave(e) {
    e.preventDefault();
    alert('✅ Settings saved successfully!');
}

// ===== STORE PAGE FUNCTIONS =====
function loadStore() {
    const idsContainer = document.getElementById('idsContainer');
    if (!idsContainer) return;
    
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEYS.IDS) || '[]');
    
    if (ids.length === 0) {
        idsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fas fa-inbox"></i>
                </div>
                <h3>No Free Fire IDs Available Yet</h3>
                <p>The store is currently empty. All Free Fire IDs are added exclusively through the Admin Panel.</p>
                <p style="margin-top: 1rem; color: var(--primary-color);">
                    <i class="fas fa-lock"></i> Only administrators can upload listings
                </p>
            </div>
        `;
    } else {
        idsContainer.innerHTML = ids.map(id => `
            <div class="id-card glass-card">
                <div class="id-card-image">
                    <img src="${id.image}" alt="${id.fireId}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="id-card-content">
                    <div class="id-card-id">ID: ${id.fireId}</div>
                    <p style="margin-bottom: 0.5rem; color: var(--text-secondary);">${id.playerName}</p>
                    <p style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-secondary);">Level ${id.level}</p>
                    <div class="id-card-price">$${id.price}</div>
                    <p class="id-card-desc">${id.description}</p>
                    <div class="id-card-buttons">
                        <button class="btn btn-primary btn-small" onclick="buyId(${id.id}, '${id.fireId}', ${id.price})">
                            <i class="fas fa-shopping-cart"></i> Buy Now
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="viewDetails(${id.id})">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function filterStore() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEYS.IDS) || '[]');
    
    const filtered = ids.filter(id => 
        id.fireId.includes(searchTerm) || 
        id.playerName.toLowerCase().includes(searchTerm) ||
        id.price.toString().includes(searchTerm)
    );
    
    const idsContainer = document.getElementById('idsContainer');
    if (filtered.length === 0) {
        idsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No IDs Found</h3>
                <p>Try a different search term</p>
            </div>
        `;
    } else {
        idsContainer.innerHTML = filtered.map(id => `
            <div class="id-card glass-card">
                <div class="id-card-image">
                    <img src="${id.image}" alt="${id.fireId}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="id-card-content">
                    <div class="id-card-id">ID: ${id.fireId}</div>
                    <p style="margin-bottom: 0.5rem; color: var(--text-secondary);">${id.playerName}</p>
                    <p style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-secondary);">Level ${id.level}</p>
                    <div class="id-card-price">$${id.price}</div>
                    <p class="id-card-desc">${id.description}</p>
                    <div class="id-card-buttons">
                        <button class="btn btn-primary btn-small" onclick="buyId(${id.id}, '${id.fireId}', ${id.price})">
                            <i class="fas fa-shopping-cart"></i> Buy Now
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="viewDetails(${id.id})">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function buyId(idId, fireId, price) {
    const currentUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (!currentUser) {
        alert('❌ Please login first to make a purchase');
        window.location.href = 'login.html';
        return;
    }
    
    if (confirm(`Purchase Fire ID ${fireId} for $${price}?`)) {
        alert('✅ Purchase successful! Check your email for account details.');
        
        // Add to orders
        let orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
        const user = JSON.parse(currentUser);
        
        orders.push({
            id: Date.now(),
            userId: user.email,
            fireId,
            amount: price,
            status: 'completed',
            date: new Date().toLocaleDateString()
        });
        
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        
        // Update user purchases
        user.purchases = (user.purchases || 0) + 1;
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
}

function viewDetails(idId) {
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEYS.IDS) || '[]');
    const id = ids.find(i => i.id === idId);
    
    if (id) {
        alert(`
Fire ID Details:
━━━━━━━━━━━━━━━━
ID: ${id.fireId}
Player: ${id.playerName}
Level: ${id.level}
Price: $${id.price}
Description: ${id.description}
        `);
    }
}

// ===== PROFILE PAGE FUNCTIONS =====
function loadUserProfile() {
    const currentUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (!currentUser) {
        alert('❌ Please login first');
        window.location.href = 'login.html';
        return;
    }
    
    const user = JSON.parse(currentUser);
    
    document.getElementById('displayName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('memberSince').textContent = user.joinDate;
    document.getElementById('totalPurchases').textContent = (user.purchases || 0) + ' IDs';
    
    // Load orders
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const userOrders = orders.filter(order => order.userId === user.email);
    
    const ordersContainer = document.getElementById('ordersContainer');
    if (userOrders.length === 0) {
        ordersContainer.innerHTML = `
            <p style="color: var(--text-secondary);">No orders yet. <a href="store.html" style="color: var(--primary-color);">Browse the store</a></p>
        `;
    } else {
        ordersContainer.innerHTML = `
            <div class="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>Fire ID</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${userOrders.map(order => `
                            <tr>
                                <td>${order.fireId}</td>
                                <td>$${order.amount}</td>
                                <td>${order.date}</td>
                                <td><span style="color: var(--primary-color);">● ${order.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}