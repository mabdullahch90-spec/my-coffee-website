/* ============================================
   BEAN BOUTIQUE COFFEE SHOP - INTERACTIVE JS
   ============================================ */

// ============= MODAL POPUP =============
const modal = document.getElementById('welcomeModal');
const closeBtn = document.querySelector('.close-modal');

// Show modal on first visit
window.addEventListener('load', function() {
    if (!localStorage.getItem('visitedBefore')) {
        setTimeout(function() {
            modal.classList.add('active');
            localStorage.setItem('visitedBefore', 'true');
        }, 1000);
    }
});

// Close modal
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove('active');
    }
});

// ============= SLIDESHOW =============
let slideIndex = 0;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides.length > 0) {
        slides[slideIndex].classList.add('active');
    }
    if (dots.length > 0) {
        dots[slideIndex].classList.add('active');
    }
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlide(slideIndex);
}

// Auto-rotate slideshow
function autoSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        nextSlide();
        setTimeout(autoSlide, 5000);
    }
}

// Start auto-slide on page load
window.addEventListener('load', autoSlide);

// ============= SEARCH FUNCTIONALITY =============
const searchBar = document.getElementById('searchBar');

if (searchBar) {
    searchBar.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const items = document.querySelectorAll('[data-searchable]');
        const resultsContainer = document.getElementById('searchResults');
        
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
        
        if (searchTerm.length > 0) {
            let matchCount = 0;
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    matchCount++;
                    
                    if (resultsContainer) {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        resultItem.textContent = item.querySelector('h3')?.textContent || 'Found item';
                        resultItem.style.cursor = 'pointer';
                        resultItem.addEventListener('click', function() {
                            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            item.style.backgroundColor = 'rgba(212, 165, 116, 0.2)';
                            setTimeout(() => {
                                item.style.backgroundColor = '';
                            }, 2000);
                        });
                        resultsContainer.appendChild(resultItem);
                    }
                } else {
                    item.classList.add('hidden');
                }
            });
        } else {
            items.forEach(item => item.classList.remove('hidden'));
        }
    });
}

// ============= SHOPPING CART =============
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' added to cart!');
    updateCartDisplay();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartContainer) {
        cartContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)} x ${item.quantity}</p>
                    <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });
        
        if (cartTotal) {
            cartTotal.innerHTML = `Total: <strong>$${total.toFixed(2)}</strong>`;
        }
    }
}

// Display cart on page load
window.addEventListener('load', updateCartDisplay);

// ============= FORM SUBMISSION =============
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Simple validation
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    
    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Store subscription/registration data
    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        date: new Date().toLocaleString()
    };
    
    let storedData = JSON.parse(localStorage.getItem('registrations')) || [];
    storedData.push(data);
    localStorage.setItem('registrations', JSON.stringify(storedData));
    
    alert(`Thank you for registering, ${firstName}! We'll send details to ${email}.`);
    form.reset();
}

// ============= QUANTITY SELECTOR =============
function increaseQuantity(elementId) {
    const input = document.getElementById(elementId);
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity(elementId) {
    const input = document.getElementById(elementId);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// ============= SMOOTH SCROLLING =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============= RESPONSIVE MENU TOGGLE =============
function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// ============= DARK MODE TOGGLE (OPTIONAL) =============
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
window.addEventListener('load', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});
