// --- COOKIE HELPER FUNCTIONS ---

// Function to set a session cookie (No expiry date = deleted when browser closes)
function setCookie(name, value) {
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};path=/`;
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            try {
                return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
            } catch (e) {
                return null;
            }
        }
    }
    return null;
}

// --- CORE FUNCTIONALITY ---

document.addEventListener("DOMContentLoaded", () => {

    // 1. CAR DETAILS PAGE: Handle Add To Cart Form Submission
    const supportForm = document.getElementById("supportform");
    const carColorInput = document.getElementById("carColor");
    const carColorCartText = document.getElementById("carColorCart");
    const carQuantityInput = document.getElementById("carQuantity");
    const totalPriceElement = document.querySelector("#totalPrice span");

    const BASE_PRICE = 105000;

    // Sync color picker with text input
    if (carColorInput && carColorCartText) {
        carColorInput.addEventListener("input", (e) => {
            carColorCartText.value = e.target.value;
        });
    }

    // Dynamic price calculation on details page
    if (carQuantityInput && totalPriceElement) {
        carQuantityInput.addEventListener("input", (e) => {
            const qty = parseInt(e.target.value) || 1;
            totalPriceElement.textContent = (qty * BASE_PRICE).toLocaleString() + "$";
        });
    }

    if (supportForm) {
        supportForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const newItem = {
                id: Date.now(), // Unique ID to easily remove individual items later
                series: document.getElementById("carSeries").value,
                quantity: parseInt(carQuantityInput.value) || 1,
                color: carColorCartText.value,
                deliveryPort: document.getElementById("deliveryPort").value,
                address: document.getElementById("addressLocation").value,
                pricePerUnit: BASE_PRICE
            };

            // Retrieve existing cart array, or initialize an empty array if none exists
            let currentCart = getCookie("aurora_cart");
            if (!Array.isArray(currentCart)) {
                currentCart = [];
            }

            // Check if the exact same car series and color already exist in the cart
            const existingItemIndex = currentCart.findIndex(item =>
                item.series === newItem.series && item.color === newItem.color
            );

            if (existingItemIndex > -1) {
                // If it exists, simply aggregate the quantity
                currentCart[existingItemIndex].quantity += newItem.quantity;
            } else {
                // Otherwise, add it as a separate line item
                currentCart.push(newItem);
            }

            // Save the updated array back to the session cookie
            setCookie("aurora_cart", currentCart);

            alert("Vehicle added to cart successfully!");
            window.location.href = "card.html";
        });
    }

    // 2. CART PAGE: Read Array from Cookie and Dynamically Render Items
    const cartItemsContainer = document.querySelector(".cart-items-container .track-card");
    const subtotalEl = document.querySelector(".order-summary .summary-line:nth-child(1) span:nth-child(2)");
    const taxEl = document.querySelector(".order-summary .summary-line:nth-child(2) span:nth-child(2)");
    const totalEl = document.querySelector(".order-summary .summary-line.total span:nth-child(2)");

    if (cartItemsContainer && window.location.pathname.includes("card.html")) {
        const cartList = getCookie("aurora_cart");

        // Verify we have a non-empty array of items
        if (Array.isArray(cartList) && cartList.length > 0) {
            let htmlContent = `<h3>Shopping Cart</h3>`;
            let aggregateSubtotal = 0;

            // Loop through each item in the array and generate the HTML layout dynamically
            cartList.forEach((item) => {
                const itemSubtotal = item.pricePerUnit * item.quantity;
                aggregateSubtotal += itemSubtotal;

                // Format the displayed title for UI clarity
                const displayTitle = item.series.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

                htmlContent += `
                    <div class="cart-item" style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
                        <img src="content-car-images/auroraX.png" alt="Aurora X">
                        <div class="item-details">
                            <h4>${displayTitle}</h4>
                            <p class="type">SUV | High-Performance Electric</p>
                            <p class="color">Color: <span class="color-preview" style="background-color: ${item.color}; border: 1px solid #ccc; display: inline-block; width: 12px; height: 12px; border-radius: 50%; vertical-align: middle;"></span> ${item.color}</p>
                            <p class="color">Port: ${item.deliveryPort}</p>
                            <div class="item-actions">
                                <span class="quantity">Qty: ${item.quantity}</span>
                                <button class="remove-btn data-remove-id" data-id="${item.id}"><i class='bx bx-trash'></i> Remove</button>
                            </div>
                        </div>
                        <div class="item-price">
                            $${itemSubtotal.toLocaleString()}
                        </div>
                    </div>
                `;
            });

            cartItemsContainer.innerHTML = htmlContent;

            // Compute financial summaries across all items
            const taxAndFees = aggregateSubtotal * 0.05;
            const finalTotal = aggregateSubtotal + taxAndFees;

            if (subtotalEl) subtotalEl.textContent = `$${aggregateSubtotal.toLocaleString()}`;
            if (taxEl) taxEl.textContent = `$${taxAndFees.toLocaleString()}`;
            if (totalEl) totalEl.textContent = `$${finalTotal.toLocaleString()}`;

            // Add Event Listeners to each unique "Remove" button
            document.querySelectorAll(".data-remove-id").forEach(button => {
                button.addEventListener("click", function () {
                    const targetId = parseInt(this.getAttribute("data-id"));

                    // Filter out the selected item using its unique timestamp ID
                    const updatedCart = cartList.filter(item => item.id !== targetId);

                    setCookie("aurora_cart", updatedCart);
                    alert("Item removed from cart.");
                    window.location.reload();
                });
            });

        } else {
            // Render Fallback if no cookie arrays match
            cartItemsContainer.innerHTML = `
                <h3>Shopping Cart</h3>
                <p style="padding: 20px; text-align: center; color: #888;">Your cart is currently empty.</p>
            `;
            if (subtotalEl) subtotalEl.textContent = "$0";
            if (taxEl) taxEl.textContent = "$0";
            if (totalEl) totalEl.textContent = "$0";
        }
    }
});