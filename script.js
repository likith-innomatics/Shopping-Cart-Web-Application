// Sample product data
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        price: 129900,
        category: "mobiles",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896"
    },
    {
        id: 2,
        name: "MacBook Pro 16\"",
        price: 199900,
        category: "laptops",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229"
    },
    {
        id: 3,
        name: "Samsung Galaxy S23 Ultra",
        price: 124999,
        category: "mobiles",
        image: "https://images.samsung.com/in/smartphones/galaxy-s23-ultra/images/galaxy-s23-ultra-highlights-kv.jpg"
    },
    {
        id: 4,
        name: "Dell XPS 15",
        price: 149990,
        category: "laptops",
        image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9520/media-gallery/black/laptop-xps-9520-t-black-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3635&hei=2548&qlt=100,1&resMode=sharp2&size=3635,2548"
    },
    {
        id: 5,
        name: "AirPods Pro (2nd Gen)",
        price: 26900,
        category: "accessories",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361"
    },
    {
        id: 6,
        name: "iPad Pro 12.9\" M2",
        price: 89900,
        category: "accessories",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1664411207213"
    },
    {
        id: 7,
        name: "Samsung Galaxy Watch 5 Pro",
        price: 44999,
        category: "accessories",
        image: "https://images.samsung.com/in/galaxy-watch5-pro/feature/galaxy-watch5-pro-exploration-mo-sequence_end.jpg"
    },
    {
        id: 8,
        name: "Microsoft Surface Laptop 5",
        price: 106999,
        category: "laptops",
        image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWBrzy?ver=85d4"
    },
    {
        id: 9,
        name: "Google Pixel 7 Pro",
        price: 84999,
        category: "mobiles",
        image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/t/u/m/-original-imaggsuehy3nyj3b.jpeg?q=90&crop=false"
    },
    {
        id: 10,
        name: "Sony WH-1000XM5",
        price: 34990,
        category: "accessories",
        image: "https://www.sony.co.in/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF"
    },
    {
        id: 11,
        name: "OnePlus 11 5G",
        price: 61999,
        category: "mobiles",
        image: "https://oasis.opstatics.com/content/dam/oasis/page/2023/na/oneplus-11/specs/black-img.png"
    },
    {
        id: 12,
        name: "Asus ROG Zephyrus G14",
        price: 149990,
        category: "laptops",
        image: "https://in.store.asus.com/media/catalog/product/g/a/ga403uv_eclps_gry_backlit_1_zone_rgb_1__1.jpg?width=439&height=439&store=en_IN&image-type=image"
    },
    {
        id: 13,
        name: "Samsung Galaxy Buds2 Pro",
        price: 17999,
        category: "accessories",
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2407/gallery/in-galaxy-buds3-pro-r630-sm-r630nzaainu-542134792?$684_547_JPG$"
    },
    {
        id: 14,
        name: "Nothing Phone (1)",
        price: 32999,
        category: "mobiles",
        image: "https://m.media-amazon.com/images/I/71SgrNQOEqL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 15,
        name: "Apple Watch Ultra",
        price: 89900,
        category: "accessories",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQDY3ref_VW_34FR+watch-49-titanium-ultra_VW_34FR_WF_CO+watch-face-49-alpine-ultra_VW_34FR_WF_CO?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1683224241054"
    },
    {
        id: 16,
        name: "Lenovo ThinkPad X1 Carbon",
        price: 129990,
        category: "laptops",
        image: "https://p3-ofp.static.pub//fes/cms/2024/07/05/05dhzg0lrtq4i0d3wxqyjjakwmbmzr331426.png"
    }
];

class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.bindEvents();
        this.renderProducts();
        this.renderCart();
        this.updateCartCount();
    }

    bindEvents() {
        document.querySelector('.cart-icon').addEventListener('click', () => this.toggleCart());
        document.querySelector('.close-cart').addEventListener('click', () => this.toggleCart());
        document.querySelector('#cartOverlay').addEventListener('click', () => this.toggleCart());
        document.querySelector('#emptyCart').addEventListener('click', () => this.emptyCart());
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterProducts(e.target.dataset.category);
            });
        });
    }

    toggleCart() {
        document.querySelector('.cart-panel').classList.toggle('active');
        document.querySelector('.cart-overlay').classList.toggle('active');
    }

    renderProducts(category = 'all') {
        const container = document.getElementById('productsContainer');
        container.innerHTML = '';

        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);

        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <div class="img-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
                </div>
                <div class="button-container">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;

            productElement.querySelector('.add-to-cart').addEventListener('click', () => {
                this.addToCart(product);
            });

            container.appendChild(productElement);
        });
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.updateCart();
        this.showSuccessMessage(product.name);
    }

    showSuccessMessage(productName) {
        // Remove any existing success message
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create and show new success message
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart!</span>
        `;
        document.body.appendChild(message);

        // Remove the message after animation
        setTimeout(() => {
            message.remove();
        }, 2300); // Slightly longer than the animation duration
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.cart = this.cart.filter(item => item.id !== productId);
            }
            this.updateCart();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCart();
    }

    emptyCart() {
        this.cart = [];
        this.updateCart();
    }

    updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.renderCart();
        this.updateCartCount();
    }

    renderCart() {
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';

        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div>₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-btn" data-id="${item.id}">&times;</button>
                </div>
            `;

            cartItem.querySelector('.minus').addEventListener('click', () => 
                this.updateQuantity(item.id, -1));
            cartItem.querySelector('.plus').addEventListener('click', () => 
                this.updateQuantity(item.id, 1));
            cartItem.querySelector('.remove-btn').addEventListener('click', () => 
                this.removeFromCart(item.id));

            cartItems.appendChild(cartItem);
        });

        // Update cart total with ₹ symbol
        const total = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('cartTotal').textContent = total.toLocaleString('en-IN');
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }

    filterProducts(category) {
        this.renderProducts(category);
    }
}

// Initialize the shopping cart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
}); 