// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Shopping Cart
let cart = [];
const cartModal = document.getElementById('cartModal');
const cartLink = document.querySelector('.cart-link');

cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

function addToCart(productName, price) {
    cart.push({ name: productName, price: price, id: Date.now() });
    updateCartCount();
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Přidáno';
    btn.style.background = 'var(--primary-color)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1000);
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function openCart() {
    cartModal.style.display = 'block';
    updateCartDisplay();
}

function closeCart() {
    cartModal.style.display = 'none';
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Košík je prázdný</p>';
        checkoutBtn.style.display = 'none';
        document.getElementById('cartTotal').textContent = '0 Kč';
    } else {
        cartItemsDiv.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} Kč</div>
                </div>
                <button class="btn btn-small" style="background: #e74c3c; color: white;" onclick="removeFromCart(${item.id})">
                    Odebrat
                </button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('cartTotal').textContent = total + ' Kč';
        checkoutBtn.style.display = 'block';
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Váš košík je prázdný!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const items = cart.map(item => `- ${item.name} (${item.price} Kč)`).join('\n');
    
    const message = `Objednávka z webu:\n\n${items}\n\nCelkem: ${total} Kč\n\nProsím kontaktujte nás pro potvrzení a doličení detailů.`;
    
    const emailSubject = encodeURIComponent('Nová objednávka z webu');
    const emailBody = encodeURIComponent(message);
    
    // Redirect to email - replace with actual email
    window.location.href = `mailto:info@farmamestankovi.cz?subject=${emailSubject}&body=${emailBody}`;
    
    // Clear cart after checkout
    cart = [];
    updateCartCount();
    updateCartDisplay();
    closeCart();
}

// Close cart modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
});

// Product Filter
function filterProducts(category) {
    const items = document.querySelectorAll('.shop-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    alert('Děkujeme za vaši zprávu! Budeme vám odpovídat co nejdříve.');
    e.target.reset();
});