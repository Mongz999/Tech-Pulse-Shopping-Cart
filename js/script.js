








const products = [
    { name: "PS5 Slim w/ Controller", price: 30000, id: 1, quantity: 1, image: "img/ps5-w-controller.jpg" },
    { name: "PS5 Controller", price: 1000, id: 2, quantity: 1, image: "img/ps5-controller.jpg" },
    { name: "Logitech G Pro X Superlight", price: 7500, id: 3, quantity: 1, image: "img/mouse.jpg" },
    { name: "Wooting 60HE+", price: 12000, id: 4, quantity: 1, image: "img/keyboard.jpg" },
    { name: "GeForce RTX 4090", price: 100000, id: 5, quantity: 1, image: "img/graphics-card.jpg" },
    { name: "FIFINE AmpliGame AM8", price: 3000, id: 6, quantity: 1, image: "img/microphone.jpg" },
    { name: "ROG Strix G15", price: 75000, id: 7, quantity: 1, image: "img/laptop.jpg" },
    { name: "Iphone 16 Pro Max 1TB", price: 120000, id: 8, quantity: 1, image: "img/smartphone.jpg" },
    { name: "Steelseries Arctis 1", price: 4000, id: 9, quantity: 1, image: "img/headphones.jpg" },
    { name: "GoPro HERO13 Black ", price: 25000, id: 10, quantity: 1, image: "img/gopro.jpg" },
    { name: "KRK RP5G5 ROKIT 5", price: 15000, id: 11, quantity: 1, image: "img/speaker.jpg" },
    { name: "Artisan 0 Mousepad", price: 4000, id: 12, quantity: 1, image: "img/mousepad.jpg" },
    { name: "VENGEANCE RGB RT 256GB", price: 4370, id: 13, quantity: 1, image: "img/pcram.jpg" },
    { name: "Samsung 990 Pro 1TB NVME M.2", price: 7195, id: 14, quantity: 1, image: "img/pcssd.jpg" },
    { name: "Intel Core i9-13900K", price: 349999, id: 15, quantity: 1, image: "img/pcprocessor.jpg" },
];

let cart = [];

const productsHTML = products.map(
    (product) => `<div class="product-card">
        <img src="${product.image}" alt="${product.name}">

        <h2 class="product-name">${product.name}</h2>

        <strong>₱${product.price}</strong><br>

        <br><button class="product-btn" id=${product.id}>Add to Cart</button>
    </div>`
);
const result = document.querySelector(".result");
result.innerHTML = productsHTML.join("");

function updateCart() {
    const cartHTML = cart.map(
        (item) => `<div class="cart-item">
            <h3>${item.name}</h3>
            <div class="quantity-controls">
                <button class="decrease-btn" id=${item.id}>-</button>
                <span>${item.quantity}</span>
                <button class="increase-btn" id=${item.id}>+</button>
            </div>
            <p>₱${item.price} x ${item.quantity}</p>
            <button class="delete-btn" id=${item.id}>Delete</button>
        </div>`
    ).join('');

    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = cartHTML;
    document.querySelector(".noOfItems").innerText = `${cart.length} items`;
    document.querySelector(".total").innerText = `₱${cart.reduce((total, item) => total + item.price * item.quantity, 0)}`;

    // Add event listeners to increase and decrease buttons
    const increaseButtons = document.querySelectorAll(".increase-btn");
    increaseButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            incrItem(parseInt(e.target.id));
        });
    });

    const decreaseButtons = document.querySelectorAll(".decrease-btn");
    decreaseButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            decrItem(parseInt(e.target.id));
        });
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            deleteItem(parseInt(e.target.id));
        });
    });
}

let num = document.querySelectorAll(".product-btn").length;
for (let i = 0; i < num; i++) {
    document.querySelectorAll(".product-btn")[i].addEventListener("click", function (e) {
        addToCart(products, parseInt(e.target.id));
    });
}

function addToCart(products, id) {
    const product = products.find((product) => product.id === id);
    const cartProduct = cart.find((product) => product.id === id);
    if (cartProduct != undefined && product.id == cartProduct.id) {
        incrItem(id);
    } else {
        cart.unshift(product);
    }
    updateCart();
}

function incrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id == id) {
            cart[i].quantity += 1;
        }
    }
    updateCart();
}

function decrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id == id) {
            if (cart[i].quantity > 1) {
                cart[i].quantity -= 1;
            } else {
                deleteItem(id);
            }
        }
    }
    updateCart();
}

function deleteItem(id) {
    const confirmDelete = confirm("Do you want to remove this from your cart?");
    if (confirmDelete) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }
}

document.getElementById('buyBtn').onclick = function() {
    document.getElementById('paymentModal').style.display = 'block';
}

document.getElementById('closeModal').onclick = function() {
    document.getElementById('paymentModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('paymentModal')) {
        document.getElementById('paymentModal').style.display = 'none';
    }
}

document.getElementById('paymentForm').onsubmit = function(event) {
    event.preventDefault();
    

    const receiptContent = cart.map(item => {
        return `<p>${item.name} - ₱${item.price} x ${item.quantity} = ₱${item.price * item.quantity}</p>`;
    }).join('');
    

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    

    const paymentMethod = "<p><strong>Payment Method:</strong> Credit Card</p>";
    

    document.querySelector('.receipt-content').innerHTML = paymentMethod + receiptContent;
    document.querySelector('.total-amount').innerText = `₱${totalAmount}`;
    document.querySelector('.receipt').style.display = 'block';

    document.querySelector(".cart").style.display = 'none';

    document.getElementById('showCartBtn').style.display = 'block';
    
    alert("Payment submitted successfully!");
    cart = [];
    updateCart();
    document.getElementById('paymentModal').style.display = 'none';
}

document.getElementById('showCartBtn').onclick = function() {

    document.querySelector(".cart").style.display = 'block'; // Show the cart form
    

    document.querySelector('.receipt').style.display = 'none';
    

    document.getElementById('showCartBtn').style.display = 'none';
}