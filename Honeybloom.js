// Save this as Honeybloom.js
document.addEventListener('DOMContentLoaded', function () {
    // ========== 1. VARIABLE DECLARATIONS ==========
    const searchBar = document.querySelector('.search-bar');
    const searchOpenBtn = document.querySelector('.nav-search');
    const searchCancelBtn = document.getElementById('searchCancel');
    const loginFormContainer = document.querySelector('.form');
    const navUserBtn = document.querySelector('.nav-user');
    const signUpBtn = document.querySelector('.sign-up-btn');
    const alreadyAccountBtn = document.querySelector('.already-account');
    const formCancelBtns = document.querySelectorAll('.form-cancel');
    const loginCancelBtn = document.getElementById('loginCancel');
    const signupCancelBtn = document.getElementById('signupCancel');
    const header = document.querySelector('header');
    const dropdowns = document.querySelectorAll('.dropdown');
    const loginFormElement = document.querySelector('.login-form form');
    const signupFormElement = document.querySelector('.sign-up-form form');
    const subscribeForm = document.querySelector('.subscribe-box');
    const searchForm = document.querySelector('.search-input');
    const menuCheckbox = document.querySelector('.menu-btn');
    const menuLinks = document.querySelectorAll('.menu a');
    const cartCountElement = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.nav-cart');
    const addToCartButtons = document.querySelectorAll('.product-cart-btn');
    
    // WhatsApp Configuration - CHANGE THIS TO YOUR NUMBER!
    const WHATSAPP_NUMBER = "94766690980"; // Replace with your number
    
    // Delivery Fee Configuration - CHANGED TO Rs.500
    const DELIVERY_FEE = 500; // Changed from 250 to 500
    
    // Initialize cart count
    let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    
    // ========== 2. SEARCH FUNCTIONALITY ==========
    if (searchOpenBtn && searchBar) {
        searchOpenBtn.addEventListener('click', function () {
            console.log('Search button clicked');
            searchBar.classList.add('search-bar-active');
            document.body.classList.add('search-active');
            // Focus on search input
            setTimeout(() => {
                const searchInput = document.querySelector('.search-input input[name="search"]');
                if (searchInput) searchInput.focus();
            }, 100);
        });
    }
    
    if (searchCancelBtn && searchBar) {
        searchCancelBtn.addEventListener('click', function () {
            console.log('Search cancel button clicked');
            searchBar.classList.remove('search-bar-active');
            document.body.classList.remove('search-active');
            // Clear search results
            clearSearchResults();
        });
    }
    
    // ========== 3. LOGIN/SIGNUP FORM FUNCTIONALITY ==========
    if (navUserBtn && loginFormContainer) {
        navUserBtn.addEventListener('click', function () {
            loginFormContainer.classList.add('login-active');
            loginFormContainer.classList.remove('sign-up-active');
        });
    }
    
    if (signUpBtn && loginFormContainer) {
        signUpBtn.addEventListener('click', function () {
            loginFormContainer.classList.remove('login-active');
            loginFormContainer.classList.add('sign-up-active');
        });
    }
    
    if (alreadyAccountBtn && loginFormContainer) {
        alreadyAccountBtn.addEventListener('click', function () {
            loginFormContainer.classList.add('login-active');
            loginFormContainer.classList.remove('sign-up-active');
        });
    }
    
    // Individual cancel button event listeners
    if (loginCancelBtn && loginFormContainer) {
        loginCancelBtn.addEventListener('click', function () {
            loginFormContainer.classList.remove('login-active');
        });
    }
    
    if (signupCancelBtn && loginFormContainer) {
        signupCancelBtn.addEventListener('click', function () {
            loginFormContainer.classList.remove('sign-up-active');
        });
    }
    
    // ========== 4. HEADER SCROLL EFFECT ==========
    let lastScrollY = window.scrollY;
    
    if (header) {
        window.addEventListener('scroll', function () {
            const currentScroll = window.scrollY;
            
            if (currentScroll === 0) {
                header.classList.remove('header-fix');
            } else if (currentScroll < lastScrollY) {
                header.classList.add('header-fix');
            } else {
                header.classList.remove('header-fix');
            }
            
            lastScrollY = currentScroll;
        });
    }
    
    // ========== 5. DROPDOWN MENU FUNCTIONALITY ==========
    if (dropdowns) {
        dropdowns.forEach(dropdown => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            if (dropdownMenu) {
                dropdown.addEventListener('mouseenter', function () {
                    dropdownMenu.style.display = 'flex';
                });
                
                dropdown.addEventListener('mouseleave', function () {
                    dropdownMenu.style.display = 'none';
                });
            }
        });
    }
    
    // ========== 6. FORM SUBMISSION ==========
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="password"]').value;
            
            console.log('Login attempt:', { email, password });
            showNotification('Login successful!');
            
            if (loginFormContainer) {
                loginFormContainer.classList.remove('login-active');
            }
        });
    }
    
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const fullname = this.querySelector('input[name="fullname"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const phone = this.querySelector('input[name="phone"]').value;
            const password = this.querySelector('input[name="password"]').value;
            
            console.log('Signup attempt:', { fullname, email, phone, password });
            showNotification('Account created successfully!');
            
            if (loginFormContainer) {
                loginFormContainer.classList.remove('sign-up-active');
                loginFormContainer.classList.add('login-active');
            }
        });
    }
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[name="subscribe"]').value;
            
            console.log('Subscription:', email);
            showNotification('Thank you for subscribing!');
            
            this.querySelector('input[name="subscribe"]').value = '';
        });
    }
    
    // ========== 7. SEARCH FORM SUBMISSION & REAL-TIME SEARCH ==========
    function initializeSearch() {
        const allProducts = document.querySelectorAll('.product-box');
        const searchInput = document.querySelector('.search-input input[name="search"]');
        const searchBar = document.querySelector('.search-bar');
        
        if (!searchInput || !allProducts.length) return;
        
        console.log('Initializing search with', allProducts.length, 'products');
        
        // Create search results dropdown
        const searchResults = document.createElement('div');
        searchResults.className = 'search-results-dropdown';
        searchResults.id = 'searchResults';
        
        // Insert after search input
        const searchForm = document.querySelector('.search-input');
        if (searchForm) {
            searchForm.style.position = 'relative';
            searchForm.appendChild(searchResults);
        }
        
        // Function to scroll to and highlight product
        function scrollAndHighlightProduct(product) {
            if (!product) return;
            
            console.log('Scrolling to product:', product.id);
            
            // Remove previous highlights
            document.querySelectorAll('.search-highlight-active, .search-highlight-border').forEach(box => {
                box.classList.remove('search-highlight-active', 'search-highlight-border');
            });
            
            // Add highlight classes
            product.classList.add('search-highlight-border');
            
            setTimeout(() => {
                product.classList.add('search-highlight-active');
            }, 100);
            
            // Get position
            const productRect = product.getBoundingClientRect();
            const currentScroll = window.scrollY;
            const productTop = productRect.top + currentScroll;
            
            // Calculate scroll position
            const headerHeight = 120; // Account for fixed header
            const scrollPosition = productTop - headerHeight;
            
            console.log('Scrolling to position:', scrollPosition);
            
            // Smooth scroll
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
            
            // Remove highlights after animation
            setTimeout(() => {
                product.classList.remove('search-highlight-border');
            }, 1500);
            
            setTimeout(() => {
                product.classList.remove('search-highlight-active');
            }, 2000);
        }
        
        // Function to perform search
        function performSearch(searchTerm) {
            const term = searchTerm.toLowerCase().trim();
            
            if (term === '') {
                // Show all products if search is empty
                allProducts.forEach(product => {
                    product.style.display = '';
                    product.classList.remove('search-match');
                });
                searchResults.style.display = 'none';
                document.body.classList.remove('search-active');
                return;
            }
            
            let foundResults = false;
            const resultsHTML = [];
            
            // Show all products first
            allProducts.forEach(product => {
                product.style.display = '';
                product.classList.remove('search-match');
            });
            
            // Search through all products
            allProducts.forEach((product, index) => {
                const productNameElement = product.querySelector('.product-text-title');
                const productCategoryElement = product.querySelector('.product-category');
                
                if (productNameElement && productCategoryElement) {
                    const productName = productNameElement.textContent.toLowerCase();
                    const productCategory = productCategoryElement.textContent.toLowerCase();
                    
                    // Check if search term matches product name or category
                    const nameMatch = productName.includes(term);
                    const categoryMatch = productCategory.includes(term);
                    
                    if (nameMatch || categoryMatch) {
                        foundResults = true;
                        product.classList.add('search-match');
                        
                        // Add to dropdown results
                        const productImage = product.querySelector('img');
                        const productPrice = product.querySelector('.current-price');
                        
                        resultsHTML.push(`
                            <div class="search-result-item" data-product-index="${index}">
                                ${productImage ? `<img src="${productImage.src}" alt="${productName}">` : ''}
                                <div class="search-result-info">
                                    <h4>${productNameElement.textContent}</h4>
                                    <div class="price">${productPrice ? productPrice.textContent : ''}</div>
                                    <div class="category">${productCategoryElement.textContent}</div>
                                </div>
                            </div>
                        `);
                    } else {
                        product.classList.remove('search-match');
                        if (searchBar.classList.contains('search-bar-active')) {
                            product.style.display = 'none';
                        }
                    }
                }
            });
            
            // Update search results dropdown
            if (foundResults) {
                searchResults.innerHTML = resultsHTML.join('');
                searchResults.style.display = 'block';
                document.body.classList.add('search-active');
                
                // Add click handlers to search results
                searchResults.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const index = this.getAttribute('data-product-index');
                        const targetProduct = allProducts[index];
                        
                        if (targetProduct) {
                            console.log('Selected product index:', index);
                            
                            // Close search bar
                            if (searchBar) {
                                searchBar.classList.remove('search-bar-active');
                            }
                            searchResults.style.display = 'none';
                            searchInput.value = '';
                            document.body.classList.remove('search-active');
                            
                            // Show only this product as match
                            allProducts.forEach(p => {
                                p.classList.remove('search-match');
                                p.style.display = '';
                            });
                            
                            targetProduct.classList.add('search-match');
                            
                            // Wait for search bar to close, then scroll
                            setTimeout(() => {
                                scrollAndHighlightProduct(targetProduct);
                            }, 300);
                        }
                    });
                });
            } else {
                searchResults.innerHTML = '<div class="no-results">No products found. Try different keywords.</div>';
                searchResults.style.display = 'block';
                document.body.classList.add('search-active');
            }
        }
        
        // Event listener for search input
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
        
        // Event listener for Enter key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
        
        // Clear search when closing search bar
        const searchCancelBtn = document.getElementById('searchCancel');
        if (searchCancelBtn) {
            searchCancelBtn.addEventListener('click', function() {
                clearSearchResults();
                searchResults.style.display = 'none';
            });
        }
        
        // Close search results when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchForm.contains(event.target) && searchResults.style.display === 'block') {
                searchResults.style.display = 'none';
            }
        });
    }
    
    function clearSearchResults() {
        const allProducts = document.querySelectorAll('.product-box');
        allProducts.forEach(product => {
            product.style.display = '';
            product.classList.remove('search-match', 'search-highlight-active', 'search-highlight-border');
        });
        
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        
        const searchInput = document.querySelector('.search-input input[name="search"]');
        if (searchInput) {
            searchInput.value = '';
        }
        
        document.body.classList.remove('search-active');
    }
    
    // ========== 8. MOBILE MENU TOGGLE ==========
    if (menuLinks && menuCheckbox) {
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 850) {
                    menuCheckbox.checked = false;
                }
            });
        });
    }
    
    // ========== 9. NOTIFICATION FUNCTION ==========
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f74b65;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // ========== 10. IMAGE LAZY LOADING ==========
    const lazyImages = document.querySelectorAll('img');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            imageObserver.observe(img);
        });
    }
    
    // ========== 11. SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========== 12. CART FUNCTIONALITY ==========
    function getProductImageFromBox(productBox) {
        const imgElement = productBox.querySelector('img');
        if (imgElement && imgElement.src) {
            return imgElement.src;
        }
        
        const productNameElement = productBox.querySelector('.product-text-title');
        const productName = productNameElement ? productNameElement.textContent.trim() : '';
        
        const imageMap = {
            'Dark Red Bouquets': 'images/p1.png',
            'Cute Bouquets': 'images/p2.png',
            'Lovely Pink Bouquets': 'images/p3.png',
            'Sun Flower & Roses Bouquets': 'images/p4.png',
            'Red & White Roses Bouquets': 'images/p5.png',
            'Little Love Bouquets': 'images/p6.png',
            'Roses with Love Bouquets': 'images/p7.png',
            'Tulip Bouquets': 'images/p8.png'
            
        };
        
        for (const [key, value] of Object.entries(imageMap)) {
            if (productName.includes(key) || key.includes(productName)) {
                return value;
            }
        }
        
        const allProducts = document.querySelectorAll('.product-box');
        const index = Array.from(allProducts).indexOf(productBox);
        if (index !== -1) {
            const imageNumber = (index % 8) + 1;
            return `images/p${imageNumber}.png`;
        }
        
        return 'images/default-product.png';
    }
    
    function extractProductPrice(productBox) {
        const strategies = [
            () => {
                const priceElement = productBox.querySelector('.product-price');
                if (priceElement) {
                    const text = priceElement.textContent.trim();
                    return extractPriceFromText(text);
                }
                return null;
            },
            () => {
                const spans = productBox.querySelectorAll('span');
                for (let span of spans) {
                    const text = span.textContent.trim();
                    if (text && (text.includes('Rs') || text.includes('රු') || /\d/.test(text))) {
                        const price = extractPriceFromText(text);
                        if (price !== 'Rs.0') {
                            return price;
                        }
                    }
                }
                return null;
            },
            () => {
                const productText = productBox.querySelector('.product-text');
                if (productText) {
                    const text = productText.textContent.trim();
                    const price = extractPriceFromText(text);
                    if (price !== 'Rs.0') return price;
                }
                return null;
            },
            () => {
                const text = productBox.textContent;
                return extractPriceFromText(text);
            }
        ];
        
        for (let strategy of strategies) {
            const price = strategy();
            if (price && price !== 'Rs.0') {
                return price;
            }
        }
        
        return 'Rs.2500';
    }
    
    function extractPriceFromText(text) {
        if (!text) return 'Rs.0';
        
        const patterns = [
            /Rs\.?\s*(\d+[\d,.]*)/i,
            /රු\.?\s*(\d+[\d,.]*)/i,
            /LKR\s*(\d+[\d,.]*)/i,
            /(\d+[\d,.]*)\s*(Rs|රු|LKR)/i,
            /(\d+[\d,.]*)/
        ];
        
        for (let pattern of patterns) {
            const match = text.match(pattern);
            if (match) {
                let priceNum = match[1] || match[0];
                priceNum = priceNum.replace(/,/g, '');
                const num = parseFloat(priceNum);
                if (!isNaN(num)) {
                    return `Rs.${num.toFixed(2)}`;
                }
            }
        }
        
        return 'Rs.0';
    }
    
    if (addToCartButtons && cartCountElement && cartIcon) {
        addToCartButtons.forEach((button, index) => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                
                const productBox = this.closest('.product-box');
                if (!productBox) {
                    showNotification('Error: Product not found');
                    return;
                }
                
                const productNameElement = productBox.querySelector('.product-text-title');
                const productName = productNameElement ? productNameElement.textContent.trim() : `Product ${index + 1}`;
                
                const productPrice = extractProductPrice(productBox);
                const productImage = getProductImageFromBox(productBox);
                
                cartCount++;
                cartCountElement.textContent = cartCount;
                
                localStorage.setItem('cartCount', cartCount);
                
                cartIcon.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartIcon.style.transform = 'scale(1)';
                }, 300);
                
                saveProductToCart(productName, productPrice, productImage);
                
                showCartNotification(`${productName} added to cart!`);
            });
        });
    }
    
    function saveProductToCart(name, price, image) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        const existingItemIndex = cartItems.findIndex(item => item.name === name);
        
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += 1;
        } else {
            cartItems.push({
                name: name,
                price: price,
                quantity: 1,
                image: image
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    
    function showCartNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div style="display: flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 -960 960 960" fill="#27ae60" style="margin-right: 10px;">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
                <span>${message}</span>
            </div>
            <button class="view-cart-btn" style="margin-left: 20px; color: #f74b65; font-weight: 500; background: none; border: none; cursor: pointer;">
                View Cart
            </button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            color: #333;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            border-left: 4px solid #27ae60;
        `;
        
        document.body.appendChild(notification);
        
        const viewCartBtn = notification.querySelector('.view-cart-btn');
        if (viewCartBtn) {
            viewCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showCartSidebar();
                removeNotification(notification);
            });
        }
        
        setTimeout(() => {
            removeNotification(notification);
        }, 4000);
    }
    
    function removeNotification(notification) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // ========== 13. WHATSAPP ORDER FORM ==========
    
    // WhatsApp Order Form
    function showWhatsAppOrderForm() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (cartItems.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        
        // Remove existing form if any
        const existingOverlay = document.querySelector('.whatsapp-form-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        const orderFormHTML = `
            <div class="whatsapp-form-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 1100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
                <div class="whatsapp-form" style="background: white; padding: 30px; border-radius: 15px; width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: fadeIn 0.3s ease;">
                    <!-- Header with Close Button (Top Right) -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; position: relative;">
                        <h3 style="margin: 0; color: #25D366; display: flex; align-items: center; gap: 10px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.447h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                            </svg>
                            Complete Your Order
                        </h3>
                        <button class="whatsapp-close-btn" style="background: none; border: none; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.3s ease; color: #666;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div id="orderDetailsForm">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Full Name *</label>
                            <input type="text" class="whatsapp-input" id="whatsappName" placeholder="John Smith" required style="width: 100%; padding: 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; transition: all 0.3s;">
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Phone Number *</label>
                            <input type="tel" class="whatsapp-input" id="whatsappPhone" placeholder="071 234 5678" required style="width: 100%; padding: 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; transition: all 0.3s;">
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Delivery Address *</label>
                            <textarea class="whatsapp-input" id="whatsappAddress" placeholder="No. 123, Main Street, Colombo 05" required rows="3" style="width: 100%; padding: 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; resize: vertical; transition: all 0.3s;"></textarea>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Special Instructions (Optional)</label>
                            <textarea class="whatsapp-input" id="whatsappInstructions" placeholder="Delivery instructions, gift message, etc." rows="2" style="width: 100%; padding: 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; resize: vertical; transition: all 0.3s;"></textarea>
                        </div>
                        
                        <!-- Order Summary -->
                        <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                            <h4 style="margin-top: 0; margin-bottom: 15px; color: #333;">Order Summary</h4>
                            ${generateOrderSummaryHTML(cartItems)}
                        </div>
                        
                        <!-- Action Buttons -->
                        <div style="display: flex; gap: 15px; margin-top: 30px;">
                            <button type="button" class="whatsapp-submit-btn" style="flex: 1; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: white; padding: 16px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px; transition: all 0.3s; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" style="margin-right: 8px; vertical-align: middle;">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.447h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                            </svg>
                            Send to WhatsApp
                        </button>
                        
                        <button type="button" class="whatsapp-cancel-btn" style="flex: 1; background: #f8f9fa; color: #333; padding: 16px; border: 2px solid #ddd; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px; transition: all 0.3s;">
                            Cancel
                        </button>
                    </div>
                </div>
                    
                    <div style="margin-top: 25px; padding: 20px; background: #f0f8ff; border-radius: 10px; border-left: 4px solid #4dabf7;">
                        <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">
                            <strong>📱 What happens next?</strong><br>
                            1. Your order will be sent to our WhatsApp<br>
                            2. We'll confirm availability within 30 minutes<br>
                            3. Payment options: Cash on Delivery / Bank Transfer<br>
                            4. Delivery within Colombo: 2-3 hours<br>
                            5. Delivery Fee: Rs.500 (Fixed)
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', orderFormHTML);
        
        // Add event listeners to buttons
        addWhatsAppFormEventListeners();
    }
    
    function addWhatsAppFormEventListeners() {
        // Close button (top right)
        const closeBtn = document.querySelector('.whatsapp-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeWhatsAppForm);
            
            closeBtn.addEventListener('mouseenter', function() {
                this.style.background = '#f8f9fa';
                this.style.color = '#333';
                this.style.transform = 'rotate(90deg)';
            });
            
            closeBtn.addEventListener('mouseleave', function() {
                this.style.background = 'none';
                this.style.color = '#666';
                this.style.transform = 'rotate(0deg)';
            });
        }
        
        // Cancel button (bottom left)
        const cancelBtn = document.querySelector('.whatsapp-cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeWhatsAppForm);
            
            cancelBtn.addEventListener('mouseenter', function() {
                this.style.background = '#e9ecef';
                this.style.borderColor = '#999';
                this.style.transform = 'translateY(-2px)';
            });
            
            cancelBtn.addEventListener('mouseleave', function() {
                this.style.background = '#f8f9fa';
                this.style.borderColor = '#ddd';
                this.style.transform = 'translateY(0)';
            });
        }
        
        // Submit button (bottom right)
        const submitBtn = document.querySelector('.whatsapp-submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', processWhatsAppOrder);
            
            submitBtn.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(135deg, #128C7E 0%, #0d6e5a 100%)';
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
            });
            
            submitBtn.addEventListener('mouseleave', function() {
                this.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
            });
        }
        
        // Form inputs focus effects
        const inputs = document.querySelectorAll('.whatsapp-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#25D366';
                this.style.boxShadow = '0 0 0 2px rgba(37, 211, 102, 0.1)';
            });
            input.addEventListener('blur', function() {
                this.style.borderColor = '#e0e0e0';
                this.style.boxShadow = 'none';
            });
        });
        
        // Close when clicking on overlay (outside the form)
        const overlay = document.querySelector('.whatsapp-form-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeWhatsAppForm();
                }
            });
        }
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeWhatsAppForm();
            }
        });
    }
    
    function generateOrderSummaryHTML(cartItems) {
        let subtotal = 0;
        let html = '';
        
        cartItems.forEach((item, index) => {
            const price = parseFloat(item.price.replace('Rs.', '').trim());
            const itemTotal = price * item.quantity;
            subtotal += itemTotal;
            
            html += `
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee;">
                    <div>
                        <div style="font-weight: 500;">${item.name}</div>
                        <div style="font-size: 12px; color: #666;">${item.price} × ${item.quantity}</div>
                    </div>
                    <div style="font-weight: 600;">Rs.${itemTotal.toFixed(2)}</div>
                </div>
            `;
        });
        
        // CHANGED: Always Rs.500 delivery fee, no free delivery
        const deliveryFee = DELIVERY_FEE; // Rs.500
        const total = subtotal + deliveryFee;
        
        html += `
            <div style="margin-top: 15px; padding-top: 15px; border-top: 2px dashed #ddd;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Subtotal</span>
                    <span>Rs.${subtotal.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Delivery Fee</span>
                    <span>Rs.${deliveryFee.toFixed(2)}</span> <!-- CHANGED: Always Rs.500 -->
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 18px; color: #f74b65; margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd;">
                    <span>Total</span>
                    <span>Rs.${total.toFixed(2)}</span>
                </div>
            </div>
        `;
        
        return html;
    }
    
    // Close WhatsApp form
    function closeWhatsAppForm() {
        const overlay = document.querySelector('.whatsapp-form-overlay');
        if (overlay) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    }
    
    // Process WhatsApp order
    function processWhatsAppOrder() {
        console.log('processWhatsAppOrder function called!');
        
        // Get form values
        const nameInput = document.getElementById('whatsappName');
        const phoneInput = document.getElementById('whatsappPhone');
        const addressInput = document.getElementById('whatsappAddress');
        const instructionsInput = document.getElementById('whatsappInstructions');
        
        console.log('Input elements found:', {
            nameInput: !!nameInput,
            phoneInput: !!phoneInput,
            addressInput: !!addressInput,
            instructionsInput: !!instructionsInput
        });
        
        if (!nameInput || !phoneInput || !addressInput) {
            showNotification('Form elements not found! Please refresh the page.');
            return;
        }
        
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const address = addressInput.value.trim();
        const instructions = instructionsInput ? instructionsInput.value.trim() : '';
        
        console.log('Form values:', { name, phone, address, instructions });
        
        // Validation
        if (!name || !phone || !address) {
            showNotification('Please fill all required fields');
            return;
        }
        
        if (phone.length < 9) {
            showNotification('Please enter a valid phone number');
            return;
        }
        
        // Get cart items
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        console.log('Cart items:', cartItems);
        
        if (cartItems.length === 0) {
            showNotification('Your cart is empty!');
            closeWhatsAppForm();
            return;
        }
        
        // Generate order ID
        const orderId = 'HB' + Date.now().toString().slice(-6);
        const orderDate = new Date().toLocaleDateString('en-LK', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Calculate totals
        let subtotal = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.price.replace('Rs.', '').trim());
            subtotal += price * item.quantity;
        });
        
        // CHANGED: Always Rs.500 delivery fee
        const deliveryFee = DELIVERY_FEE; // Rs.500
        const total = subtotal + deliveryFee;
        
        // Generate WhatsApp message
        let message = `*🌸 HONEY BLOOM - ORDER CONFIRMATION 🌸*\n\n`;
        message += `*Order ID:* ${orderId}\n`;
        message += `*Order Date:* ${orderDate}\n\n`;
        message += `*━━━━ CUSTOMER DETAILS ━━━━*\n`;
        message += `👤 *Name:* ${name}\n`;
        message += `📞 *Phone:* ${phone}\n`;
        message += `📍 *Address:* ${address}\n`;
        
        if (instructions) {
            message += `📝 *Instructions:* ${instructions}\n`;
        }
        
        message += `\n*━━━━ ORDER ITEMS ━━━━*\n\n`;
        
        cartItems.forEach((item, index) => {
            const price = parseFloat(item.price.replace('Rs.', '').trim());
            const itemTotal = price * item.quantity;
            
            message += `${index + 1}. *${item.name}*\n`;
            message += `   Quantity: ${item.quantity}\n`;
            message += `   Price: ${item.price} × ${item.quantity}\n`;
            message += `   Item Total: Rs.${itemTotal.toFixed(2)}\n\n`;
        });
        
        message += `*━━━━ PAYMENT SUMMARY ━━━━*\n`;
        message += `Subtotal: Rs.${subtotal.toFixed(2)}\n`;
        message += `Delivery Fee: Rs.${deliveryFee.toFixed(2)}\n`; // CHANGED: Always Rs.500
        message += `*Total Amount: Rs.${total.toFixed(2)}*\n\n`;
        
        message += `*💝 Thank you for your order!*\n`;
        message += `We'll contact you shortly to confirm availability and delivery time.\n\n`;
        message += `_Honey Bloom - The Trusted Choice of Loved Ones_`;
        
        console.log('WhatsApp message generated:', message);
        
        // Save order to localStorage
        const orderData = {
            orderId: orderId,
            customer: { name, phone, address, instructions },
            items: cartItems,
            subtotal: subtotal,
            delivery: deliveryFee,
            total: total,
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        saveOrderToLocal(orderData);
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        console.log('Opening WhatsApp with number:', WHATSAPP_NUMBER);
        
        // Open WhatsApp
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        
        // Close form
        closeWhatsAppForm();
        
        // Clear cart
        localStorage.removeItem('cartItems');
        localStorage.setItem('cartCount', '0');
        cartCount = 0;
        if (cartCountElement) cartCountElement.textContent = '0';
        
        // Close cart sidebar if open
        const cartSidebar = document.querySelector('.cart-sidebar');
        const cartOverlay = document.querySelector('.cart-overlay');
        if (cartSidebar) cartSidebar.style.right = '-400px';
        if (cartOverlay) cartOverlay.style.display = 'none';
        
        // Show confirmation
        showNotification('Order sent to WhatsApp! We\'ll contact you soon. 🌸');
    }
    
    // Save order to localStorage
    function saveOrderToLocal(order) {
        let allOrders = JSON.parse(localStorage.getItem('honeybloom_orders')) || [];
        allOrders.push(order);
        localStorage.setItem('honeybloom_orders', JSON.stringify(allOrders));
        console.log('Order saved to localStorage:', order);
    }
    
    // ========== 14. CART SIDEBAR ==========
    function showCartSidebar() {
        let cartSidebar = document.querySelector('.cart-sidebar');
        
        if (!cartSidebar) {
            cartSidebar = document.createElement('div');
            cartSidebar.className = 'cart-sidebar';
            cartSidebar.innerHTML = `
                <div class="cart-sidebar-header">
                    <h4>Shopping Cart (${cartCount})</h4>
                    <button class="close-cart-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </button>
                </div>
                <div class="cart-items-container"></div>
                <div class="cart-sidebar-footer">
                    <div class="cart-total">
                        <strong>Total:</strong>
                        <span class="total-price">Rs.0</span>
                    </div>
                    <button class="whatsapp-order-btn" style="width: 100%; padding: 16px; background: #25D366; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.447h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                        </svg>
                        Order via WhatsApp
                    </button>
                    <div class="cart-buttons">
                        <button class="view-cart-page-btn">Continue Shopping</button>
                    </div>
                </div>
            `;
            
            applyCartSidebarStyles(cartSidebar);
            document.body.appendChild(cartSidebar);
            
            createCartOverlay(cartSidebar);
            
            const whatsappBtn = cartSidebar.querySelector('.whatsapp-order-btn');
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('WhatsApp button clicked from cart sidebar');
                    showWhatsAppOrderForm();
                });
            }
        }
        
        loadCartItems();
        
        setTimeout(() => {
            cartSidebar.style.right = '0';
        }, 10);
        
        const overlay = document.querySelector('.cart-overlay');
        if (overlay) {
            overlay.style.display = 'block';
        }
    }
    
    function applyCartSidebarStyles(cartSidebar) {
        cartSidebar.style.cssText = `
            position: fixed;
            top: 0;
            right: -400px;
            width: 380px;
            height: 100%;
            background: white;
            box-shadow: -5px 0 25px rgba(0,0,0,0.15);
            z-index: 1001;
            transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            display: flex;
            flex-direction: column;
            font-family: 'Poppins', sans-serif;
        `;
        
        const header = cartSidebar.querySelector('.cart-sidebar-header');
        header.style.cssText = `
            padding: 25px 20px;
            background: linear-gradient(135deg, #f74b65 0%, #e63e58 100%);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        
        header.querySelector('h4').style.cssText = `
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: white;
        `;
        
        const closeBtn = cartSidebar.querySelector('.close-cart-btn');
        closeBtn.style.cssText = `
            background: rgba(255,255,255,0.2);
            border: none;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            padding: 0;
        `;
        
        closeBtn.querySelector('svg').style.cssText = `
            fill: white;
            width: 20px;
            height: 20px;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.3)';
            this.style.transform = 'rotate(90deg)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.2)';
            this.style.transform = 'rotate(0deg)';
        });
        
        closeBtn.addEventListener('click', function() {
            cartSidebar.style.right = '-400px';
            const overlay = document.querySelector('.cart-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
        
        const itemsContainer = cartSidebar.querySelector('.cart-items-container');
        itemsContainer.style.cssText = `
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f9f9f9;
        `;
        
        const footer = cartSidebar.querySelector('.cart-sidebar-footer');
        footer.style.cssText = `
            padding: 25px;
            border-top: 1px solid #e0e0e0;
            background: white;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
        `;
        
        const totalDiv = cartSidebar.querySelector('.cart-total');
        totalDiv.style.cssText = `
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            font-size: 20px;
            color: #333;
            padding-bottom: 15px;
            border-bottom: 2px dashed #eee;
        `;
        
        totalDiv.querySelector('.total-price').style.cssText = `
            font-weight: 700;
            color: #f74b65;
            font-size: 22px;
        `;
        
        const whatsappBtn = cartSidebar.querySelector('.whatsapp-order-btn');
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.3)';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        const buttonsDiv = cartSidebar.querySelector('.cart-buttons');
        buttonsDiv.style.cssText = `
            display: flex;
            gap: 15px;
        `;
        
        const viewCartBtn = cartSidebar.querySelector('.view-cart-page-btn');
        viewCartBtn.style.cssText = `
            flex: 1;
            padding: 16px 20px;
            background: white;
            color: #333;
            text-align: center;
            border-radius: 8px;
            font-weight: 600;
            border: 2px solid #f74b65;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 15px;
        `;
        
        viewCartBtn.addEventListener('mouseenter', function() {
            this.style.background = '#f74b65';
            this.style.color = 'white';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(247, 75, 101, 0.2)';
        });
        
        viewCartBtn.addEventListener('mouseleave', function() {
            this.style.background = 'white';
            this.style.color = '#333';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        viewCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.style.right = '-400px';
            const overlay = document.querySelector('.cart-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
    }
    
    function createCartOverlay(cartSidebar) {
        const overlay = document.createElement('div');
        overlay.className = 'cart-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 1000;
            display: none;
            backdrop-filter: blur(3px);
        `;
        
        overlay.addEventListener('click', function() {
            cartSidebar.style.right = '-400px';
            overlay.style.display = 'none';
        });
        
        document.body.appendChild(overlay);
    }
    
    function loadCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items-container');
        if (!cartItemsContainer) return;
        
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #888;">
                    <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#ddd" style="margin-bottom: 20px;">
                        <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                    </svg>
                    <h4 style="margin: 0 0 10px 0; font-weight: 500; color: #666;">Your cart is empty</h4>
                    <p style="margin: 0; font-size: 14px; color: #999;">Add some flowers to make someone smile! 🌸</p>
                    <button class="continue-shopping-btn" style="margin-top: 20px; padding: 12px 30px; background: #f74b65; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">
                        Continue Shopping
                    </button>
                </div>
            `;
            
            updateTotalPrice(0);
            updateCartHeader();
            
            const continueBtn = cartItemsContainer.querySelector('.continue-shopping-btn');
            if (continueBtn) {
                continueBtn.addEventListener('click', function() {
                    const cartSidebar = document.querySelector('.cart-sidebar');
                    const overlay = document.querySelector('.cart-overlay');
                    if (cartSidebar) cartSidebar.style.right = '-400px';
                    if (overlay) overlay.style.display = 'none';
                });
            }
            return;
        }
        
        let cartHTML = '';
        let total = 0;
        
        cartItems.forEach((item, index) => {
            let priceValue = parsePrice(item.price);
            const itemTotal = priceValue * item.quantity;
            total += itemTotal;
            
            const itemImage = item.image || 'images/default-product.png';
            
            cartHTML += `
                <div class="cart-item" style="display: flex; margin-bottom: 20px; padding: 15px; background: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: transform 0.3s ease;">
                    <div class="cart-item-image" style="width: 80px; height: 80px; margin-right: 15px; background: #f8f8f8; border-radius: 8px; overflow: hidden; flex-shrink: 0;">
                        <img src="${itemImage}" alt="${item.name}" 
                             style="width: 100%; height: 100%; object-fit: cover;"
                             onerror="this.src='images/default-product.png'; this.onerror=null;">
                    </div>
                    <div class="cart-item-details" style="flex: 1; display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                            <strong style="font-size: 14px; color: #333; line-height: 1.4;">${item.name}</strong>
                            <button class="remove-item-btn" data-index="${index}" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 12px; font-weight: 500; padding: 4px 8px; border-radius: 4px; transition: all 0.2s ease;">
                                Remove
                            </button>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; color: #666;">
                            <span>${item.price} × ${item.quantity}</span>
                            <strong style="color: #f74b65; font-size: 16px;">Rs.${itemTotal.toFixed(2)}</strong>
                        </div>
                        <div class="quantity-controls" style="display: flex; align-items: center; gap: 10px;">
                            <button class="decrease-qty" data-index="${index}" style="width: 32px; height: 32px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: all 0.2s ease;">-</button>
                            <span style="min-width: 30px; text-align: center; font-weight: 600; color: #333;">${item.quantity}</span>
                            <button class="increase-qty" data-index="${index}" style="width: 32px; height: 32px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: all 0.2s ease;">+</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // Add delivery fee to total
        total += DELIVERY_FEE; // CHANGED: Add Rs.500 delivery fee
        
        cartItemsContainer.innerHTML = cartHTML;
        updateTotalPrice(total);
        updateCartHeader();
        
        // Add delivery fee info
        const deliveryInfo = document.createElement('div');
        deliveryInfo.style.cssText = `
            background: #fff8e1;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 4px solid #ffb300;
            font-size: 14px;
            color: #333;
        `;
        deliveryInfo.innerHTML = `
            <div style="display: flex; justify-content: space-between;">
                <span>Delivery Fee:</span>
                <strong>Rs.${DELIVERY_FEE.toFixed(2)}</strong>
            </div>
            <div style="font-size: 12px; color: #666; margin-top: 5px;">
                <i>Delivery fee will be added to your order total</i>
            </div>
        `;
        
        cartItemsContainer.appendChild(deliveryInfo);
        
        addCartItemEventListeners();
    }
    
    function parsePrice(priceStr) {
        if (!priceStr) return 0;
        const cleanStr = priceStr.replace(/Rs\.|රු\./g, '').trim();
        const num = parseFloat(cleanStr.replace(/,/g, ''));
        return isNaN(num) ? 0 : num;
    }
    
    function updateTotalPrice(total) {
        const totalPriceElement = document.querySelector('.total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `Rs.${total.toFixed(2)}`;
        }
    }
    
    function updateCartHeader() {
        const cartHeader = document.querySelector('.cart-sidebar-header h4');
        if (cartHeader) {
            cartHeader.textContent = `Shopping Cart (${cartCount})`;
        }
    }
    
    function addCartItemEventListeners() {
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
            
            btn.addEventListener('mouseenter', function() {
                this.style.background = '#ffefef';
                this.style.color = '#ff3b3b';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'none';
                this.style.color = '#ff6b6b';
            });
        });
        
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                updateQuantity(index, -1);
            });
            
            btn.addEventListener('mouseenter', function() {
                this.style.background = '#f8f8f8';
                this.style.borderColor = '#ccc';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'white';
                this.style.borderColor = '#ddd';
            });
        });
        
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                updateQuantity(index, 1);
            });
            
            btn.addEventListener('mouseenter', function() {
                this.style.background = '#f8f8f8';
                this.style.borderColor = '#ccc';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'white';
                this.style.borderColor = '#ddd';
            });
        });
    }
    
    function removeFromCart(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (index >= 0 && index < cartItems.length) {
            const removedItem = cartItems.splice(index, 1)[0];
            
            cartCount -= removedItem.quantity;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
            localStorage.setItem('cartCount', cartCount);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            loadCartItems();
            showCartNotification('Item removed from cart');
        }
    }
    
    function updateQuantity(index, change) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (index >= 0 && index < cartItems.length) {
            cartItems[index].quantity += change;
            
            if (cartItems[index].quantity <= 0) {
                removeFromCart(index);
                return;
            }
            
            cartCount += change;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
            localStorage.setItem('cartCount', cartCount);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            loadCartItems();
        }
    }
    
    // ========== 15. CART ICON CLICK ==========
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            showCartSidebar();
        });
    }
    
    // ========== 16. WINDOW RESIZE HANDLER ==========
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 850 && menuCheckbox) {
                menuCheckbox.checked = false;
            }
        }, 250);
    });
    
    // ========== 17. PAGE LOAD ANIMATION ==========
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Initialize search functionality after page loads
        setTimeout(() => {
            initializeSearch();
        }, 500);
    });
    
    // ========== 18. ADD CSS ANIMATIONS ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(10px); }
        }
        @keyframes highlightSearch {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(247, 75, 101, 0.7);
                background-color: transparent;
            }
            50% {
                transform: scale(1.02);
                box-shadow: 0 0 25px 15px rgba(247, 75, 101, 0.4);
                background-color: #fff9c4;
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(247, 75, 101, 0.7);
                background-color: transparent;
            }
        }
        @keyframes highlightBorder {
            0%, 100% { border: 3px solid transparent; }
            50% { border: 3px solid #f74b65; }
        }
        .nav-cart {
            transition: transform 0.3s ease;
        }
        .cart-item-image img {
            transition: transform 0.3s ease;
        }
        .cart-item-image img:hover {
            transform: scale(1.1);
        }
        .cart-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);
});