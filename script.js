function showNotification(message) {
    let notif = document.getElementById("notification");
    notif.innerText = message;

    notif.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    notif.style.opacity = '1';
    notif.style.transform = 'translate(-50%, -50%) scale(1.2)';

    setTimeout(() => {
        notif.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);  // bounce faster

    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }, 1000);
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ itemName: name, itemPrice: price });
    localStorage.setItem("cart", JSON.stringify(cart));

    showNotification(name + " added to cart!");
}

if (document.title.includes("Your Cart")) {
    loadCart();
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let total = 0;

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.itemPrice;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.itemName} - ₹${item.itemPrice}</span>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.itemPrice;
    });

    // Simulate API call for purely frontend behavior
    setTimeout(() => {
        showNotification("Your order has been placed!");
        localStorage.removeItem("cart");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }, 500);
}

// Menu Filtering and Searching Logic
function filterCategory(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter items
    const items = document.querySelectorAll('.item-card');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // Clear search input when category is clicked
    const searchInput = document.getElementById('searchInput');
    if(searchInput) searchInput.value = '';
}

function filterMenu() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.item-card');

    // Reset category buttons when searching
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    const allBtn = document.querySelector('.category-btn[onclick="filterCategory(\'all\')"]');
    if(allBtn) allBtn.classList.add('active');

    items.forEach(item => {
        const itemName = item.querySelector('h3').innerText.toLowerCase();
        if (itemName.includes(input)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

