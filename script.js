let cart = [];

/* =========================
   LOAD CART
========================= */

function loadCart() {

    const savedCart = localStorage.getItem("bloomoraCart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "bloomoraCart",
        JSON.stringify(cart)
    );
}


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    saveCart();

    showNotification(
        name + " added to cart 🌸"
    );
}


/* =========================
   NOTIFICATION
========================= */

function showNotification(message) {

    const oldNotification =
        document.querySelector(".cart-notification");

    if (oldNotification) {
        oldNotification.remove();
    }

    const notification =
        document.createElement("div");

    notification.className =
        "cart-notification";

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    }, 50);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 400);

    }, 2500);
}


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    const cartContainer =
        document.getElementById("cartItems");

    if (!cartContainer) {
        return;
    }

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🌸
                </div>

                <h2>Your Cart is Empty</h2>

                <p>
                    Your perfect bouquet is waiting for you.
                </p>

                <a href="flowers.html"
                   class="cart-shop-button">
                    Explore Flowers
                </a>

            </div>
        `;

        updateCartSummary();

        return;
    }


    cartContainer.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">
                🌸
            </div>

            <div class="cart-item-details">

                <span>
                    BLOOMORA
                </span>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>

            </div>


            <div class="quantity-control">

                <button
                    onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </strong>

                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

        `;


        cartContainer.appendChild(cartItem);

    });


    updateCartSummary();
}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(index, change) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();
}


/* =========================
   REMOVE ITEM
========================= */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }

    const removedName =
        cart[index].name;

    cart.splice(index, 1);

    saveCart();

    displayCart();

    showNotification(
        removedName + " removed from cart"
    );
}


/* =========================
   CART SUMMARY
========================= */

function updateCartSummary() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                item.price *
                item.quantity,
            0
        );


    const totalItemsElement =
        document.getElementById("totalItems");

    const subtotalElement =
        document.getElementById("subtotal");

    const totalElement =
        document.getElementById("cartTotal");


    if (totalItemsElement) {

        totalItemsElement.textContent =
            totalItems;

    }


    if (subtotalElement) {

        subtotalElement.textContent =
            "₹" +
            subtotal.toLocaleString("en-IN");

    }


    if (totalElement) {

        totalElement.textContent =
            "₹" +
            subtotal.toLocaleString("en-IN");

    }
}


/* =========================
   GO TO CHECKOUT
========================= */

function checkout() {

    if (cart.length === 0) {

        showNotification(
            "Your cart is empty 🌸"
        );

        return;
    }

    window.location.href =
        "checkout.html";
}


/* =========================
   DISPLAY CHECKOUT
========================= */

function displayCheckout() {

    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );

    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );


    if (!checkoutItems) {
        return;
    }


    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <h3>
                    Your cart is empty.
                </h3>

                <a href="flowers.html">
                    Continue Shopping
                </a>

            </div>

        `;

        if (checkoutTotal) {
            checkoutTotal.textContent = "₹0";
        }

        return;
    }


    checkoutItems.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;

        total += itemTotal;


        const div =
            document.createElement("div");

        div.className =
            "checkout-item";


        div.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <small>
                    Qty: ${item.quantity}
                </small>

            </div>

            <strong>
                ₹${itemTotal.toLocaleString("en-IN")}
            </strong>

        `;


        checkoutItems.appendChild(div);

    });


    if (checkoutTotal) {

        checkoutTotal.textContent =
            "₹" +
            total.toLocaleString("en-IN");

    }
}


/* =========================
   PLACE ORDER
========================= */

function placeOrder() {

    const name =
        document.getElementById(
            "customerName"
        )?.value.trim();


    const email =
        document.getElementById(
            "customerEmail"
        )?.value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        )?.value.trim();


    const address =
        document.getElementById(
            "customerAddress"
        )?.value.trim();


    const payment =
        document.getElementById(
            "paymentMethod"
        )?.value;


    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !payment
    ) {

        showNotification(
            "Please fill all details 🌸"
        );

        return;
    }


    if (cart.length === 0) {

        showNotification(
            "Your cart is empty"
        );

        return;
    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    const order = {

        name: name,

        email: email,

        phone: phone,

        address: address,

        payment: payment,

        items: cart,

        total: total,

        date: new Date().toLocaleString(
            "en-IN"
        )

    };


    localStorage.setItem(
        "bloomoraOrder",
        JSON.stringify(order)
    );


    localStorage.removeItem(
        "bloomoraCart"
    );


    cart = [];


    window.location.href =
        "order-confirmation.html";
}


/* =========================
   CONTACT
========================= */

function contactBloomora() {

    showNotification(
        "Thank you for contacting Bloomora 🌸"
    );
}


/* =========================
   SMOOTH SCROLL
========================= */

document.addEventListener(
    "click",
    function(event) {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );

        if (!link) {
            return;
        }


        const targetId =
            link.getAttribute("href");


        if (
            targetId === "#" ||
            !targetId
        ) {
            return;
        }


        const target =
            document.querySelector(
                targetId
            );


        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    }
);


/* =========================
   PAGE START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadCart();

        displayCart();

        displayCheckout();

    }
);